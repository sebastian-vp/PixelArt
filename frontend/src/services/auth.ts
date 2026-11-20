import axios from "axios";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export async function login(input: LoginInput) {
  try {
    const response = await axios.post<AuthUser>("/api/auth/login", input, { withCredentials: true });

    return { user: response.data, csrfToken: response.headers["x-csrf-token"] as string };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Verifica tu email y contraseña.", { cause: error });
      }
      if (error.response?.status === 400) {
        throw new Error("Revisa tu email y contraseña e inténtalo nuevamente.", { cause: error });
      }
      if (!error.response) {
        throw new Error("No pudimos conectar con el servidor. Inténtalo nuevamente.", { cause: error });
      }
    }

    throw new Error("No pudimos iniciar sesión. Inténtalo nuevamente más tarde.", { cause: error });
  }
}

export async function getSession() {
  try {
    const response = await axios.get<AuthUser>("/api/auth/me", { withCredentials: true });

    return { user: response.data, csrfToken: response.headers["x-csrf-token"] as string };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw new Error("No pudimos recuperar tu sesión. Inténtalo nuevamente.", { cause: error });
  }
}

export async function logout(): Promise<void> {
  try {
    await axios.post("/api/auth/logout", undefined, {
      withCredentials: true,
      headers: { "X-CSRF-Token": localStorage.getItem("csrfToken") },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return;
    }

    throw new Error("No pudimos cerrar tu sesión. Inténtalo nuevamente.", { cause: error });
  }
}
