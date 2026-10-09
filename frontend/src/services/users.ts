import axios from "axios";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export async function createUser(input: CreateUserInput): Promise<void> {
  try {
    await axios.post("/api/users", input);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        throw new Error("Ya existe una cuenta con este correo. Usa otro correo o entra a tu cuenta.", { cause: error });
      }

      if (error.response?.status === 400) {
        throw new Error("Revisa tu nombre, correo y contraseña e inténtalo nuevamente.", { cause: error });
      }

      if (!error.response) {
        throw new Error("No pudimos conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.", { cause: error });
      }
    }

    throw new Error("No pudimos crear tu cuenta. Inténtalo nuevamente más tarde.", { cause: error });
  }
}
