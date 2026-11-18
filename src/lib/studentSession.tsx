"use client";

// DEMO ONLY: this is NOT secure authentication. It stores a non-sensitive flag
// (the Student ID) in sessionStorage and checks it on the client. A real
// backend with server-verified sessions will replace it.
import { createContext, useCallback, useContext, useMemo } from "react";
import { DEMO_STUDENT } from "@/config/demo-credentials";
import { createSessionStore } from "./sessionStore";

const store = createSessionStore<{ studentId: string | null }>(
  "student-portal-session",
  { studentId: null },
);

type SessionValue = {
  ready: boolean;
  studentId: string | null;
  login: (studentId: string, password: string) => boolean;
  logout: () => void;
};

const SessionContext = createContext<SessionValue | null>(null);

export function StudentSessionProvider({ children }: { children: React.ReactNode }) {
  const { value, ready } = store.useStore();

  const login = useCallback((studentId: string, password: string) => {
    const ok =
      studentId.trim().toUpperCase() === DEMO_STUDENT.studentId &&
      password === DEMO_STUDENT.password;
    if (ok) store.update(() => ({ studentId: DEMO_STUDENT.studentId }));
    return ok;
  }, []);

  const logout = useCallback(() => store.update(() => ({ studentId: null })), []);

  const session = useMemo(
    () => ({ ready, studentId: value.studentId, login, logout }),
    [ready, value.studentId, login, logout],
  );

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useStudentSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useStudentSession must be used inside StudentSessionProvider");
  return ctx;
}
