import { create } from "zustand";

import { type AuthUser, getSession, login, type LoginInput, logout } from "@/services/auth";

interface SessionState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  recoverSession: () => Promise<void>;
  signIn: (input: LoginInput) => Promise<void>;
  signOut: () => Promise<void>;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,

  async recoverSession() {
    const currentSession = get();

    try {
      const session = await getSession();
      if (get() !== currentSession) {
        return;
      }
      if (!session) {
        currentSession.clearSession();
        return;
      }

      localStorage.setItem("csrfToken", session.csrfToken);
      set({ user: session.user, isLoading: false, error: null });
    } catch (error: unknown) {
      if (get() !== currentSession) {
        return;
      }

      localStorage.removeItem("csrfToken");
      set({ user: null, isLoading: false, error: error instanceof Error ? error.message : "No pudimos recuperar tu sesión." });
    }
  },

  async signIn(input) {
    const session = await login(input);

    localStorage.setItem("csrfToken", session.csrfToken);
    set({ user: session.user, isLoading: false, error: null });
  },

  async signOut() {
    const currentSession = get();
    await logout();

    if (get() === currentSession) {
      currentSession.clearSession();
    }
  },

  clearSession() {
    localStorage.removeItem("csrfToken");
    set({ user: null, isLoading: false, error: null });
  },
}));
