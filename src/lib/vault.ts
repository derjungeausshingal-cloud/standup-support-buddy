import {
  INCIDENTS_KEY,
  LEGACY_INCIDENTS_KEY,
  PREFERENCES_KEY,
  VAULT_KEY,
  deleteAppData,
} from "./local-data.ts";

export const VAULT_ITERATIONS = 600_000;
export const AUTO_LOCK_MS = 5 * 60_000;
const plainKeys = [INCIDENTS_KEY, LEGACY_INCIDENTS_KEY, PREFERENCES_KEY];
const context = new TextEncoder().encode("StandUp local vault v1");
type Records = Record<string, string>;
type Envelope = { v: 1; iterations: number; salt: string; iv: string; ciphertext: string };
type StorageAccess = () => Pick<Storage, "getItem" | "setItem" | "removeItem">;
type Exclusive = <T>(task: () => Promise<T>) => Promise<T>;
export class VaultError extends Error {
  code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}
const encode = (bytes: Uint8Array) => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};
function decode(value: string): Uint8Array<ArrayBuffer> {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}
function parseEnvelope(raw: string): Envelope {
  if (raw.length > 12_000_000) throw new VaultError("invalid");
  const e = JSON.parse(raw) as Envelope;
  if (
    !e ||
    e.v !== 1 ||
    e.iterations !== VAULT_ITERATIONS ||
    typeof e.salt !== "string" ||
    typeof e.iv !== "string" ||
    typeof e.ciphertext !== "string" ||
    decode(e.salt).length !== 16 ||
    decode(e.iv).length !== 12 ||
    decode(e.ciphertext).length < 16
  )
    throw new VaultError("invalid");
  return e;
}
async function derive(password: string, salt: Uint8Array<ArrayBuffer>) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: VAULT_ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}
async function seal(records: Records, key: CryptoKey, salt: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(JSON.stringify(records));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: context },
    key,
    data,
  );
  const raw = JSON.stringify({
    v: 1,
    iterations: VAULT_ITERATIONS,
    salt,
    iv: encode(iv),
    ciphertext: encode(new Uint8Array(ciphertext)),
  });
  if (raw.length > 12_000_000) throw new VaultError("save");
  return raw;
}
async function unseal(envelope: Envelope, key: CryptoKey): Promise<Records> {
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: decode(envelope.iv), additionalData: context },
    key,
    decode(envelope.ciphertext),
  );
  const records: unknown = JSON.parse(new TextDecoder().decode(plain));
  if (!records || typeof records !== "object" || Array.isArray(records))
    throw new VaultError("invalid");
  for (const [k, v] of Object.entries(records)) {
    if (!plainKeys.includes(k) || typeof v !== "string") throw new VaultError("invalid");
    JSON.parse(v);
  }
  return records as Records;
}

/** Encryption happens before storage. A locked instance retains no key or decrypted records. */
export class Vault {
  private access: StorageAccess;
  private exclusive: Exclusive;
  private key: CryptoKey | null = null;
  private records: Records | null = null;
  private raw: string | null = null;
  private salt = "";
  private epoch = 0;
  constructor(access: StorageAccess, exclusive: Exclusive) {
    this.access = access;
    this.exclusive = exclusive;
  }
  exists() {
    return this.access().getItem(VAULT_KEY) !== null;
  }
  lock() {
    this.epoch++;
    this.key = null;
    this.records = null;
    this.raw = null;
    this.salt = "";
  }
  private check(epoch: number) {
    if (this.epoch !== epoch) throw new VaultError("locked");
  }
  get(keys: readonly string[]) {
    if (!this.records) throw new VaultError("locked");
    return keys.map((key) => this.records![key]).find((raw) => raw !== undefined) ?? null;
  }
  /** Leftover plaintext is removed only if it is identical to what the vault contains. */
  private cleanPlaintext(records: Records) {
    const storage = this.access();
    for (const key of plainKeys) {
      const raw = storage.getItem(key);
      if (raw !== null && raw !== records[key]) throw new VaultError("migration");
    }
    for (const key of plainKeys) {
      storage.removeItem(key);
      if (storage.getItem(key) !== null) throw new VaultError("migration");
    }
  }
  async create(password: string) {
    if (password.length < 12 || password.length > 1024) throw new VaultError("password");
    const epoch = this.epoch;
    const salt = encode(crypto.getRandomValues(new Uint8Array(16)));
    const key = await derive(password, decode(salt));
    await this.exclusive(async () => {
      this.check(epoch);
      const storage = this.access();
      if (storage.getItem(VAULT_KEY) !== null) throw new VaultError("conflict");
      const records: Records = {};
      for (const name of plainKeys) {
        const raw = storage.getItem(name);
        if (raw !== null) {
          const parsed: unknown = JSON.parse(raw);
          if (
            name === PREFERENCES_KEY
              ? !parsed || typeof parsed !== "object" || Array.isArray(parsed)
              : !Array.isArray(parsed)
          )
            throw new VaultError("migration");
          records[name] = raw;
        }
      }
      const raw = await seal(records, key, salt);
      await unseal(parseEnvelope(raw), key);
      this.check(epoch);
      if (
        storage.getItem(VAULT_KEY) !== null ||
        plainKeys.some((name) => storage.getItem(name) !== (records[name] ?? null))
      )
        throw new VaultError("conflict");
      storage.setItem(VAULT_KEY, raw);
      if (storage.getItem(VAULT_KEY) !== raw) throw new VaultError("save");
      this.cleanPlaintext(records);
      this.key = key;
      this.records = records;
      this.raw = raw;
      this.salt = salt;
    });
  }
  async unlock(password: string) {
    if (password.length === 0 || password.length > 1024) throw new VaultError("password");
    const epoch = this.epoch;
    const raw = this.access().getItem(VAULT_KEY);
    if (raw === null) throw new VaultError("missing");
    const e = parseEnvelope(raw);
    const key = await derive(password, decode(e.salt));
    const records = await unseal(e, key);
    await this.exclusive(async () => {
      this.check(epoch);
      if (this.access().getItem(VAULT_KEY) !== raw) throw new VaultError("conflict");
      this.cleanPlaintext(records);
      this.key = key;
      this.records = records;
      this.raw = raw;
      this.salt = e.salt;
    });
  }
  async write(name: string, value: string, expected: string | null) {
    const epoch = this.epoch;
    await this.exclusive(async () => {
      if (!this.key || !this.records || !plainKeys.includes(name)) throw new VaultError("locked");
      this.check(epoch);
      if ((this.records[name] ?? null) !== expected) throw new VaultError("conflict");
      const records = { ...this.records, [name]: value };
      // Once incidents are updated, a migrated v1 copy must not retain deleted entries.
      if (name === INCIDENTS_KEY) delete records[LEGACY_INCIDENTS_KEY];
      const raw = await seal(records, this.key, this.salt);
      this.check(epoch);
      const storage = this.access();
      if (storage.getItem(VAULT_KEY) !== this.raw) {
        this.lock();
        throw new VaultError("conflict");
      }
      storage.setItem(VAULT_KEY, raw);
      if (storage.getItem(VAULT_KEY) !== raw) throw new VaultError("save");
      this.records = records;
      this.raw = raw;
    });
  }
  async clear() {
    this.lock();
    return this.exclusive(async () => deleteAppData(this.access));
  }
}
