export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  signIn: (input: LoginInput) => Promise<void>;
  signOut: () => Promise<void>;
  clearSession: () => void;
}
