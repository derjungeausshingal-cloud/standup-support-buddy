import assert from "node:assert/strict";
import { test } from "node:test";
import { Vault, VAULT_ITERATIONS } from "../src/lib/vault.ts";
import {
  APP_DATA_KEYS,
  INCIDENTS_KEY,
  LEGACY_INCIDENTS_KEY,
  PREFERENCES_KEY,
  VAULT_KEY,
} from "../src/lib/local-data.ts";
const password = "fictional test password only";
function fixture(initial = {}) {
  const values = new Map(Object.entries(initial));
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, raw) => {
      values.set(key, raw);
    },
    removeItem: (key) => {
      values.delete(key);
    },
  };
  let pending = Promise.resolve();
  const exclusive = (task) => {
    const next = pending.then(task);
    pending = next.catch(() => {});
    return next;
  };
  const fresh = () => new Vault(() => storage, exclusive);
  return { values, storage, fresh, vault: fresh() };
}
test("only ciphertext reaches storage and the correct password restores data", async () => {
  const f = fixture();
  await f.vault.create(password);
  await f.vault.write(
    INCIDENTS_KEY,
    JSON.stringify([{ description: "SENSITIVE FICTIONAL CASE" }]),
    null,
  );
  await f.vault.write(
    PREFERENCES_KEY,
    JSON.stringify({ trustedContact: { name: "PRIVATE FICTIONAL NAME" } }),
    null,
  );
  const raw = f.values.get(VAULT_KEY);
  assert.equal(raw.includes("SENSITIVE FICTIONAL CASE"), false);
  assert.equal(raw.includes("PRIVATE FICTIONAL NAME"), false);
  assert.equal(raw.includes(password), false);
  assert.deepEqual([...f.values.keys()], [VAULT_KEY]);
  f.vault.lock();
  assert.throws(() => f.vault.get([INCIDENTS_KEY]));
  await assert.rejects(f.vault.unlock("incorrect password"));
  assert.equal(f.values.get(VAULT_KEY), raw);
  await f.vault.unlock(password);
  assert.equal(JSON.parse(f.vault.get([INCIDENTS_KEY]))[0].description, "SENSITIVE FICTIONAL CASE");
});
test("fresh IV per write and fresh salt per vault", async () => {
  const f = fixture();
  await f.vault.create(password);
  const first = JSON.parse(f.values.get(VAULT_KEY));
  await f.vault.write(INCIDENTS_KEY, "[]", null);
  const second = JSON.parse(f.values.get(VAULT_KEY));
  assert.notEqual(first.iv, second.iv);
  assert.equal(first.salt, second.salt);
  const g = fixture();
  await g.vault.create(password);
  assert.notEqual(first.salt, JSON.parse(g.values.get(VAULT_KEY)).salt);
  assert.equal(second.iterations, VAULT_ITERATIONS);
});
test("ciphertext tampering and modified parameters never unlock", async () => {
  const f = fixture();
  await f.vault.create(password);
  const raw = f.values.get(VAULT_KEY);
  const e = JSON.parse(raw);
  const bytes = Buffer.from(e.ciphertext, "base64");
  bytes[0] ^= 1;
  f.values.set(VAULT_KEY, JSON.stringify({ ...e, ciphertext: bytes.toString("base64") }));
  await assert.rejects(f.fresh().unlock(password));
  f.values.set(VAULT_KEY, JSON.stringify({ ...e, iterations: 1 }));
  await assert.rejects(f.fresh().unlock(password));
});
test("all legacy keys migrate and are removed only after verified encrypted storage", async () => {
  const records = {
    [INCIDENTS_KEY]: '[{"description":"fictional"}]',
    [LEGACY_INCIDENTS_KEY]: "[]",
    [PREFERENCES_KEY]: '{"language":"en"}',
  };
  const f = fixture(records);
  await f.vault.create(password);
  for (const key of Object.keys(records)) {
    assert.equal(f.values.has(key), false);
    assert.equal(f.vault.get([key]), records[key]);
  }
  f.vault.lock();
  await f.vault.unlock(password);
  assert.equal(f.vault.get([PREFERENCES_KEY]), records[PREFERENCES_KEY]);
});
test("malformed legacy data is preserved without writing a vault", async () => {
  for (const raw of ["{broken", "null", "{}"]) {
    const f = fixture({ [INCIDENTS_KEY]: raw });
    await assert.rejects(f.vault.create(password));
    assert.equal(f.values.get(INCIDENTS_KEY), raw);
    assert.equal(f.values.has(VAULT_KEY), false);
  }
});
test("quota failure keeps legacy data and never reports successful setup", async () => {
  const f = fixture({ [LEGACY_INCIDENTS_KEY]: "[]" });
  f.storage.setItem = () => {
    throw Error("quota");
  };
  await assert.rejects(f.vault.create(password));
  assert.equal(f.values.get(LEGACY_INCIDENTS_KEY), "[]");
  assert.equal(f.values.has(VAULT_KEY), false);
});
test("partially failed migration can be resumed with the same password", async () => {
  const f = fixture({ [INCIDENTS_KEY]: "[]", [PREFERENCES_KEY]: '{"language":"en"}' });
  const remove = f.storage.removeItem;
  f.storage.removeItem = (key) => {
    if (key === PREFERENCES_KEY) throw Error("blocked");
    remove(key);
  };
  await assert.rejects(f.vault.create(password));
  assert.equal(f.vault.exists(), true);
  assert.equal(f.values.has(PREFERENCES_KEY), true);
  assert.throws(() => f.vault.get([PREFERENCES_KEY]));
  f.storage.removeItem = remove;
  await f.vault.unlock(password);
  assert.equal(f.values.has(PREFERENCES_KEY), false);
  assert.equal(f.vault.get([PREFERENCES_KEY]), '{"language":"en"}');
});
test("new plaintext left by an old tab is never silently discarded", async () => {
  const f = fixture();
  await f.vault.create(password);
  f.vault.lock();
  f.values.set(INCIDENTS_KEY, '[{"description":"new external case"}]');
  await assert.rejects(f.vault.unlock(password));
  assert.equal(f.values.has(INCIDENTS_KEY), true);
});
test("failed write leaves existing cipher and in-memory records unchanged, retry works", async () => {
  const f = fixture();
  await f.vault.create(password);
  const raw = f.values.get(VAULT_KEY);
  const set = f.storage.setItem;
  f.storage.setItem = () => {
    throw Error("quota");
  };
  await assert.rejects(f.vault.write(INCIDENTS_KEY, "[]", null));
  assert.equal(f.values.get(VAULT_KEY), raw);
  assert.equal(f.vault.get([INCIDENTS_KEY]), null);
  f.storage.setItem = set;
  await f.vault.write(INCIDENTS_KEY, "[]", null);
  assert.equal(f.vault.get([INCIDENTS_KEY]), "[]");
});
test("locking during an in-flight write prevents a late commit", async () => {
  const f = fixture();
  await f.vault.create(password);
  const raw = f.values.get(VAULT_KEY);
  const pending = f.vault.write(INCIDENTS_KEY, "[]", null);
  f.vault.lock();
  await assert.rejects(pending);
  assert.equal(f.values.get(VAULT_KEY), raw);
  assert.throws(() => f.vault.get([INCIDENTS_KEY]));
});
test("stale writers cannot overwrite another tab's encrypted changes", async () => {
  const f = fixture();
  await f.vault.create(password);
  const second = f.fresh();
  await second.unlock(password);
  await f.vault.write(INCIDENTS_KEY, '[{"description":"new"}]', null);
  await assert.rejects(second.write(INCIDENTS_KEY, "[]", null));
  const fresh = f.fresh();
  await fresh.unlock(password);
  assert.match(fresh.get([INCIDENTS_KEY]), /new/);
});
test("deleting removes vault and legacy keys without touching other applications", async () => {
  const f = fixture();
  await f.vault.create(password);
  for (const key of APP_DATA_KEYS) {
    if (key !== VAULT_KEY) f.values.set(key, "[]");
  }
  f.values.set("other-app", "keep");
  assert.equal(await f.vault.clear(), true);
  assert.deepEqual([...f.values], [["other-app", "keep"]]);
  assert.throws(() => f.vault.get([INCIDENTS_KEY]));
});
test("failed deletion is reported, clears keys from memory and can be retried", async () => {
  const f = fixture();
  await f.vault.create(password);
  const remove = f.storage.removeItem;
  f.storage.removeItem = (key) => {
    if (key === VAULT_KEY) throw Error("blocked");
    remove(key);
  };
  assert.equal(await f.vault.clear(), false);
  assert.throws(() => f.vault.get([INCIDENTS_KEY]));
  f.storage.removeItem = remove;
  assert.equal(await f.vault.clear(), true);
});
test("no fallback when storage is blocked or writes are silently ignored", async () => {
  const vault = new Vault(
    () => {
      throw Error("SecurityError");
    },
    (task) => task(),
  );
  await assert.rejects(vault.create(password));
  const f = fixture({ [LEGACY_INCIDENTS_KEY]: "[]" });
  f.storage.setItem = () => {};
  await assert.rejects(f.vault.create(password));
  assert.equal(f.values.get(LEGACY_INCIDENTS_KEY), "[]");
});
test("updating incidents also drops the encrypted legacy copy of deleted entries", async () => {
  const previous = '[{"description":"fictional entry to delete"}]';
  const f = fixture({ [INCIDENTS_KEY]: previous, [LEGACY_INCIDENTS_KEY]: previous });
  await f.vault.create(password);
  await f.vault.write(INCIDENTS_KEY, "[]", previous);
  assert.equal(f.vault.get([LEGACY_INCIDENTS_KEY]), null);
  f.vault.lock();
  await f.vault.unlock(password);
  assert.equal(f.vault.get([INCIDENTS_KEY]), "[]");
  assert.equal(f.vault.get([LEGACY_INCIDENTS_KEY]), null);
});

test("short passwords cannot create a vault", async () => {
  const f = fixture();
  await assert.rejects(f.vault.create("1234"));
  assert.equal(f.values.size, 0);
});
