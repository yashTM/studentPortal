import { useSyncExternalStore } from "react";

type Snapshot<T> = { value: T; ready: boolean };

/**
 * Small sessionStorage-backed store for demo state. `ready` is false on the
 * server and during hydration, so callers can avoid flashing wrong content.
 * Never put secrets (passwords, tokens) in here.
 */
export function createSessionStore<T extends object>(key: string, initial: T) {
  const serverSnapshot: Snapshot<T> = { value: initial, ready: false };
  let cache: { raw: string | null; snapshot: Snapshot<T> } | null = null;
  let storageBroken = false;
  const listeners = new Set<() => void>();

  function read(): Snapshot<T> {
    if (storageBroken && cache) return cache.snapshot;
    let raw: string | null = null;
    try {
      raw = window.sessionStorage.getItem(key);
    } catch {
      storageBroken = true;
    }
    if (!cache || (!storageBroken && cache.raw !== raw)) {
      let value = initial;
      try {
        if (raw) value = { ...initial, ...JSON.parse(raw) };
      } catch {
        // corrupted entry: fall back to the initial value
      }
      cache = { raw, snapshot: { value, ready: true } };
    }
    return cache.snapshot;
  }

  function update(fn: (value: T) => T) {
    const next = fn(read().value);
    let raw: string | null = null;
    try {
      raw = JSON.stringify(next);
      window.sessionStorage.setItem(key, raw);
    } catch {
      storageBroken = true;
    }
    cache = { raw, snapshot: { value: next, ready: true } };
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function useStore(): Snapshot<T> {
    return useSyncExternalStore(subscribe, read, () => serverSnapshot);
  }

  return { useStore, update };
}
