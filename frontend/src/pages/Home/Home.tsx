import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { Button, Toast } from "@/components";
import { useAuth } from "@/hooks";
import { DrawingCard, type DrawingCardData, EmptyGallery } from "@/pages/components";
import { listDrawings } from "@/services/drawings";

import { Filter } from "./components";
import styles from "./Home.module.css";

export function Home() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allDrawings, setAllDrawings] = useState<DrawingCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { clearSession } = useAuth();
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();

  useEffect(() => {
    const controller = new AbortController();

    async function loadDrawings() {
      try {
        const drawings = await listDrawings(controller.signal);
        if (controller.signal.aborted) return;

        setAllDrawings(drawings);
      } catch (error: unknown) {
        if (controller.signal.aborted) return;

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearSession();
          return;
        }

        const message = error instanceof Error ? error.message : "No pudimos cargar tus dibujos.";
        setError(message);
        setToast(<Toast type="error" title="No se pudieron cargar los dibujos" message={message} />);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadDrawings();
    return () => controller.abort();
  }, [clearSession, setToast, retryCount]);

  function retry() {
    setError(null);
    setToast(null);
    setIsLoading(true);
    setRetryCount((count) => count + 1);
  }

  const drawings = selectedFilter === "favorites" ? allDrawings.filter((drawing) => drawing.isFavorite) : allDrawings;
  const favoritesCount = allDrawings.filter((drawing) => drawing.isFavorite).length;

  return (
    <div className={styles["page"]}>
      <div className={styles["filter-container"]}>
        <Filter
          groupName="filter"
          keyFilter="all"
          text="Todos"
          counter={allDrawings.length}
          onChange={setSelectedFilter}
          selectedValue={selectedFilter}
        />
        <Filter
          groupName="filter"
          keyFilter="favorites"
          text="Favoritos"
          counter={favoritesCount}
          onChange={setSelectedFilter}
          selectedValue={selectedFilter}
        />
      </div>
      <div className={styles["gallery"]}>
        {isLoading ? (
          <p role="status">Cargando dibujos…</p>
        ) : error ? (
          <div role="alert">
            <p>{error}</p>
            <Button text="Reintentar" onClick={retry} />
          </div>
        ) : drawings.length > 0 ? (
          <div className={styles["cards"]}>
            {drawings.map((drawing) => (
              <DrawingCard key={drawing.id} drawing={drawing} />
            ))}
          </div>
        ) : (
          <EmptyGallery />
        )}
      </div>
    </div>
  );
}
