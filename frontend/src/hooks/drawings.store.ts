import axios from "axios";
import { create } from "zustand";

import type { Drawing, DrawingInput } from "@/services/drawings";
import * as drawingsService from "@/services/drawings";

import { useSessionStore } from "./session.store";

interface DrawingsState {
  drawings: Drawing[];
  hasLoaded: boolean;
  pendingIds: string[];
  loadDrawings: (signal: AbortSignal) => Promise<void>;
  getDrawing: (id: string, signal: AbortSignal) => Promise<Drawing | null>;
  saveDrawing: (input: DrawingInput, id: string | null) => Promise<Drawing | null>;
  setFavorite: (id: string, isFavorite: boolean) => Promise<Drawing | null>;
  deleteDrawing: (id: string) => Promise<boolean>;
  reset: () => void;
}

export const useDrawingsStore = create<DrawingsState>((set, get) => {
  async function runRequest<T>(request: () => Promise<T>, onSuccess?: (result: T) => void, pendingId?: string | null) {
    const session = useSessionStore.getState();
    if (!session.user || (pendingId && get().pendingIds.includes(pendingId))) {
      return null;
    }
    if (pendingId) {
      set((state) => ({ pendingIds: [...state.pendingIds, pendingId] }));
    }

    try {
      const result = await request();
      if (session !== useSessionStore.getState()) {
        return null;
      }
      onSuccess?.(result);
      return result;
    } catch (error: unknown) {
      if (session !== useSessionStore.getState()) {
        return null;
      }
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        session.clearSession();
        return null;
      }
      throw error;
    } finally {
      if (pendingId && session === useSessionStore.getState()) {
        set((state) => ({ pendingIds: state.pendingIds.filter((id) => id !== pendingId) }));
      }
    }
  }

  function updateDrawing(drawing: Drawing) {
    set(({ drawings }) => ({
      drawings: drawings.some((item) => item.id === drawing.id)
        ? drawings.map((item) => (item.id === drawing.id ? drawing : item))
        : [...drawings, drawing],
    }));
  }

  return {
    drawings: [],
    hasLoaded: false,
    pendingIds: [],

    async loadDrawings(signal) {
      while (!signal.aborted) {
        const previousDrawings = get().drawings;
        const drawings = await runRequest(() => drawingsService.listDrawings(signal));
        if (!drawings || signal.aborted) {
          return;
        }
        if (get().drawings === previousDrawings) {
          set({ drawings, hasLoaded: true });
          return;
        }
      }
    },

    getDrawing: (id, signal) => runRequest(() => drawingsService.getDrawing(id, signal)),
    saveDrawing: (input, id) => runRequest(() => drawingsService.saveDrawing(input, id), updateDrawing, id),
    setFavorite: (id, isFavorite) => runRequest(() => drawingsService.setFavorite(id, isFavorite), updateDrawing, id),

    async deleteDrawing(id) {
      const result = await runRequest(
        () => drawingsService.deleteDrawing(id),
        () => set(({ drawings }) => ({ drawings: drawings.filter((item) => item.id !== id) })),
        id,
      );
      return result !== null;
    },

    reset: () => set({ drawings: [], hasLoaded: false, pendingIds: [] }),
  };
});
