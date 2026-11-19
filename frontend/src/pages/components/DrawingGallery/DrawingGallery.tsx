import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Button, Toast } from "@/components";
import { useAuth } from "@/hooks";
import { DrawingCard, type DrawingCardData, EmptyGallery } from "@/pages/components";
import { Filter } from "@/pages/Home/components";
import { deleteDrawing, listDrawings, setFavorite } from "@/services/drawings";
import { Stack } from "react-bootstrap";

import { StaticModal } from "@/components/StaticModal";

import styles from "./DrawingGallery.module.css";

interface Props {
  favoritesOnly?: boolean;
}

export function DrawingGallery({ favoritesOnly = false }: Props) {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allDrawings, setAllDrawings] = useState<DrawingCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const { clearSession } = useAuth();
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [drawingToDelete, setDrawingToDelete] = useState<DrawingCardData | null>(null);

  const handleCloseModal = () => setShowDeleteModal(false);
  const handleShowModal = () => setShowDeleteModal(true);

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

  const handleClickDelete = (drawing: DrawingCardData) => {
    setDrawingToDelete(drawing);
    handleShowModal();
  };

  async function onDelete(drawing: DrawingCardData) {
    if (pendingIds.includes(drawing.id)) return;

    setPendingIds((ids) => [...ids, drawing.id]);
    setToast(null);

    try {
      await deleteDrawing(drawing.id);
      setAllDrawings((drawings) => drawings.filter((item) => item.id !== drawing.id));
      setToast(<Toast type="success" title="Dibujo eliminado" message="Tu dibujo se eliminó correctamente." />);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearSession();
        return;
      }

      const message = error instanceof Error ? error.message : "No pudimos eliminar tu dibujo.";
      setToast(<Toast type="error" title="No se pudo eliminar el dibujo" message={message} />);
    } finally {
      setPendingIds((ids) => ids.filter((id) => id !== drawing.id));
    }
  }

  async function onToggleFavorite(drawing: DrawingCardData) {
    if (pendingIds.includes(drawing.id)) return;

    setPendingIds((ids) => [...ids, drawing.id]);
    setToast(null);

    try {
      const updated = await setFavorite(drawing.id, !drawing.isFavorite);
      setAllDrawings((drawings) => drawings.map((item) => (item.id === updated.id ? updated : item)));
      setToast(
        <Toast
          type="success"
          title="Favorito actualizado"
          message={updated.isFavorite ? "Dibujo agregado a favoritos." : "Dibujo quitado de favoritos."}
        />,
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearSession();
        return;
      }

      const message = error instanceof Error ? error.message : "No pudimos actualizar el favorito.";
      setToast(<Toast type="error" title="No se pudo actualizar el favorito" message={message} />);
    } finally {
      setPendingIds((ids) => ids.filter((id) => id !== drawing.id));
    }
  }

  const drawings = favoritesOnly || selectedFilter === "favorites" ? allDrawings.filter((drawing) => drawing.isFavorite) : allDrawings;
  const favoritesCount = allDrawings.filter((drawing) => drawing.isFavorite).length;

  return (
    <div className={styles["page"]}>
      <StaticModal
        title="Eliminar dibujo"
        show={showDeleteModal}
        handleClose={handleCloseModal}
        footer={
          <Stack direction="horizontal" gap={3} className="justify-content-end">
            <Button
              text="Cancelar"
              onClick={handleCloseModal}
              customStyles={{ backgroundColor: "var(--secondary-color)", color: "var(--text-color)" }}
            />
            <Button
              text="Eliminar"
              onClick={() => {
                if (drawingToDelete) {
                  void onDelete(drawingToDelete);
                  setDrawingToDelete(null);
                  handleCloseModal();
                }
              }}
              customStyles={{ backgroundColor: "var(--error-color)", color: "var(--text-color)" }}
            />
          </Stack>
        }
      >
        <p>
          ¿Estás seguro de que quieres eliminar el dibujo <strong>"{drawingToDelete?.title}"</strong>?
        </p>
      </StaticModal>
      {!favoritesOnly && (
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
      )}
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
              <DrawingCard
                key={drawing.id}
                drawing={drawing}
                onOpen={(drawing) => navigate(`/editor/${drawing.id}`)}
                onDelete={handleClickDelete}
                onToggleFavorite={onToggleFavorite}
                isPending={pendingIds.includes(drawing.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyGallery favoritesOnly={favoritesOnly} />
        )}
      </div>
    </div>
  );
}
