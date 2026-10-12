import axios from "axios";

export interface DrawingInput {
  title: string;
  width: number;
  height: number;
  pixels: (string | null)[];
  isFavorite?: boolean;
}

export interface Drawing extends DrawingInput {
  id: string;
  userId: string;
  isFavorite: boolean;
}

export async function saveDrawing(input: DrawingInput, id: string | null): Promise<Drawing> {
  const options = {
    withCredentials: true,
    headers: { "X-CSRF-Token": localStorage.getItem("csrfToken") },
  };

  try {
    const response = id
      ? await axios.put<Drawing>(`/api/drawings/${id}`, input, options)
      : await axios.post<Drawing>("/api/drawings", input, options);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw error;
      }
      if (error.response?.status === 400) {
        throw new Error("Revisa los datos del dibujo e inténtalo nuevamente.", { cause: error });
      }
      if (!error.response) {
        throw new Error("No pudimos conectar con el servidor. Tu dibujo sigue en el editor.", { cause: error });
      }
    }

    throw new Error("No pudimos guardar tu dibujo. Inténtalo nuevamente.", { cause: error });
  }
}

export async function listDrawings(signal: AbortSignal): Promise<Drawing[]> {
  try {
    const response = await axios.get<Drawing[]>("/api/drawings", { withCredentials: true, signal });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw error;
    }

    throw new Error("No pudimos cargar tus dibujos. Inténtalo nuevamente.", { cause: error });
  }
}

export async function getDrawing(id: string, signal: AbortSignal): Promise<Drawing> {
  try {
    const response = await axios.get<Drawing>(`/api/drawings/${id}`, { withCredentials: true, signal });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) throw error;
      if (error.response?.status === 404) {
        throw new Error("Este dibujo no existe o no tienes acceso a él.", { cause: error });
      }
    }

    throw new Error("No pudimos abrir tu dibujo. Inténtalo nuevamente.", { cause: error });
  }
}
