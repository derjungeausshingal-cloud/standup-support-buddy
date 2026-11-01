import assert from "node:assert/strict";
import { test } from "node:test";
import {
  APP_DATA_KEYS,
  INCIDENTS_KEY,
  LEGACY_INCIDENTS_KEY,
  LocalDataStore,
  deleteAppData,
} from "../src/lib/local-data.ts";

function fixture(initial = {}) {
  const values = new Map(Object.entries(initial));
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
    removeItem: (key) => {
      values.delete(key);
    },
  };
  const decode = (raw) => {
    if (!Array.isArray(raw)) throw Error("Invalid data");
    return raw;
  };
  return {
    values,
    storage,
    store: new LocalDataStore(() => storage, [INCIDENTS_KEY, LEGACY_INCIDENTS_KEY], [], decode),
  };
}

test("loading does not write or migrate legacy data until an explicit successful save", () => {
  const f = fixture({ [LEGACY_INCIDENTS_KEY]: '["old"]' });
  assert.deepEqual(f.store.read(), { value: ["old"], problem: null });
  assert.equal(f.values.has(INCIDENTS_KEY), false);
  assert.equal(f.store.write(["new", "old"]), null);
  assert.deepEqual(f.store.read().value, ["new", "old"]);
});

for (const broken of ["{broken", "null", "{}"]) {
  test("preserves unreadable data: " + broken, () => {
    const f = fixture({ [INCIDENTS_KEY]: broken, [LEGACY_INCIDENTS_KEY]: '["legacy"]' });
    assert.equal(f.store.read().problem, "load");
    assert.equal(f.store.write(["replacement"]), "load");
    assert.equal(f.values.get(INCIDENTS_KEY), broken);
    assert.equal(f.values.get(LEGACY_INCIDENTS_KEY), '["legacy"]');
  });
}

test("quota failure never returns success and allows a later retry", () => {
  const f = fixture({ [INCIDENTS_KEY]: '["old"]' });
  f.store.read();
  const set = f.storage.setItem;
  f.storage.setItem = () => {
    throw Error("quota");
  };
  assert.equal(f.store.write(["new"]), "save");
  assert.equal(f.values.get(INCIDENTS_KEY), '["old"]');
  f.storage.setItem = set;
  assert.equal(f.store.write(["new"]), null);
});

test("blocked browser storage does not throw or report successful save or deletion", () => {
  const inaccessible = () => {
    throw Error("SecurityError");
  };
  const store = new LocalDataStore(inaccessible, [INCIDENTS_KEY], [], (v) => v);
  assert.equal(store.read().problem, "load");
  assert.equal(store.write(["new"]), "load");
  assert.equal(deleteAppData(inaccessible), false);
});

test("detects an intervening write from another tab", () => {
  const f = fixture();
  f.store.read();
  f.storage.setItem(INCIDENTS_KEY, '["other tab"]');
  assert.equal(f.store.write(["stale"]), "conflict");
  assert.deepEqual(f.store.read().value, ["other tab"]);
});

test("all known app keys are deleted and unrelated website data stays intact", () => {
  const f = fixture(
    Object.fromEntries([...APP_DATA_KEYS.map((key) => [key, "private"]), ["other-app", "keep"]]),
  );
  assert.equal(
    deleteAppData(() => f.storage),
    true,
  );
  for (const key of APP_DATA_KEYS) assert.equal(f.values.has(key), false);
  assert.equal(f.values.get("other-app"), "keep");
  assert.deepEqual(f.store.read().value, []);
  assert.equal(f.values.has(LEGACY_INCIDENTS_KEY), false);
});

test("partial deletion failure still attempts every other key and can be retried", () => {
  const f = fixture(Object.fromEntries(APP_DATA_KEYS.map((key) => [key, "private"])));
  const remove = f.storage.removeItem;
  f.storage.removeItem = (key) => {
    if (key === INCIDENTS_KEY) throw Error("blocked");
    remove(key);
  };
  assert.equal(
    deleteAppData(() => f.storage),
    false,
  );
  assert.deepEqual([...f.values.keys()], [INCIDENTS_KEY]);
  f.storage.removeItem = remove;
  assert.equal(
    deleteAppData(() => f.storage),
    true,
  );
});

test("write verification catches a storage implementation that silently ignores writes", () => {
  const f = fixture();
  f.store.read();
  f.storage.setItem = () => {};
  assert.equal(f.store.write(["new"]), "save");
});
