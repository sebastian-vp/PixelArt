import { useEffect, useState } from "react";

import { getSession, login, logout } from "@/services/auth";

import { AuthContext } from "./auth.context";
import type { AuthUser, LoginInput } from "./auth.types";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function recoverSession() {
      try {
        const session = await getSession(controller.signal);
        if (controller.signal.aborted) return;

        setUser(session?.user ?? null);
        if (session) {
          localStorage.setItem("csrfToken", session.csrfToken);
        } else {
          localStorage.removeItem("csrfToken");
        }
      } catch (error: unknown) {
        if (controller.signal.aborted) return;

        localStorage.removeItem("csrfToken");
        setError(error instanceof Error ? error.message : "No pudimos recuperar tu sesión.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void recoverSession();

    return () => controller.abort();
  }, []);

  async function signIn(input: LoginInput) {
    const session = await login(input);

    localStorage.setItem("csrfToken", session.csrfToken);
    setUser(session.user);
    setError(null);
  }

  async function signOut() {
    await logout();

    localStorage.removeItem("csrfToken");
    setUser(null);
    setError(null);
  }

  return <AuthContext value={{ user, isLoading, error, signIn, signOut }}>{children}</AuthContext>;
}
