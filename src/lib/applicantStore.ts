import { useSyncExternalStore } from "react";

export type SectionKey = "personal" | "contact" | "academic" | "program";
export type Application = Record<SectionKey, Record<string, string>>;

export type State = {
  account: { name: string; email: string } | null;
  application: Application;
  documents: Record<string, string>;
  submittedAt: string | null;
  reference: string | null;
  decision: "pending" | "admitted";
  offerAccepted: boolean;
  enrollment: Record<string, boolean>;
};

const KEY = "student-portal-applicant";

export const initialState: State = {
  account: null,
  application: { personal: {}, contact: {}, academic: {}, program: {} },
  documents: {},
  submittedAt: null,
  reference: null,
  decision: "pending",
  offerAccepted: false,
  enrollment: {},
};

let cache: { raw: string | null; value: State } = {
  raw: null,
  value: initialState,
};
const listeners = new Set<() => void>();

function read(): State {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw !== cache.raw) {
      cache = {
        raw,
        value: raw ? { ...initialState, ...JSON.parse(raw) } : initialState,
      };
    }
  } catch {
    // storage unavailable: keep the last known state
  }
  return cache.value;
}

export function updateState(fn: (s: State) => State) {
  const next = fn(read());
  try {
    const raw = JSON.stringify(next);
    window.localStorage.setItem(KEY, raw);
    cache = { raw, value: next };
  } catch {
    cache = { raw: cache.raw, value: next };
  }
  listeners.forEach((l) => l());
}

export function resetState(account: { name: string; email: string }) {
  const [firstName = "", ...rest] = account.name.split(" ");
  updateState(() => ({
    ...initialState,
    account,
    application: {
      ...initialState.application,
      personal: { firstName, lastName: rest.join(" ") },
      contact: { email: account.email },
    },
  }));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useApplicant(): State {
  return useSyncExternalStore(subscribe, read, () => initialState);
}
