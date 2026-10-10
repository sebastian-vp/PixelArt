import axios from "axios";

export interface DrawingInput {
  title: string;
  width: number;
  height: number;
  pixels: (string | null)[];
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
