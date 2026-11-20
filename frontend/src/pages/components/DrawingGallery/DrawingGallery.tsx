import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Button, Toast } from "@/components";
import { StaticModal } from "@/components/StaticModal";
import { useDrawingsStore } from "@/hooks";
import { DrawingCard, type DrawingCardData, EmptyGallery } from "@/pages/components";
import { Filter } from "@/pages/Home/components";

import styles from "./DrawingGallery.module.css";

interface Props {
  favoritesOnly?: boolean;
}

export function DrawingGallery({ favoritesOnly = false }: Props) {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const allDrawings = useDrawingsStore((state) => state.drawings);
  const hasLoaded = useDrawingsStore((state) => state.hasLoaded);
  const pendingIds = useDrawingsStore((state) => state.pendingIds);
  const loadDrawings = useDrawingsStore((state) => state.loadDrawings);
  const deleteDrawing = useDrawingsStore((state) => state.deleteDrawing);
  const setFavorite = useDrawingsStore((state) => state.setFavorite);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [drawingToDelete, setDrawingToDelete] = useState<DrawingCardData | null>(null);

  const handleCloseModal = () => setShowDeleteModal(false);
  const handleShowModal = () => setShowDeleteModal(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGallery() {
      try {
        await loadDrawings(controller.signal);
      } catch (error: unknown) {
        if (controller.signal.aborted) {
          return;
        }

        const message = error instanceof Error ? error.message : "No pudimos cargar tus dibujos.";
        setError(message);
        setToast(<Toast type="error" title="No se pudieron cargar los dibujos" message={message} />);
      }
    }

    void loadGallery();
    return () => controller.abort();
  }, [loadDrawings, setToast, retryCount]);

  function retry() {
    setError(null);
    setToast(null);
    setRetryCount((count) => count + 1);
  }

  const handleClickDelete = (drawing: DrawingCardData) => {
    setDrawingToDelete(drawing);
    handleShowModal();
  };

  async function onDelete(drawing: DrawingCardData) {
    setToast(null);

    try {
      if (await deleteDrawing(drawing.id)) {
        setToast(<Toast type="success" title="Dibujo eliminado" message="Tu dibujo se eliminó correctamente." />);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "No pudimos eliminar tu dibujo.";
      setToast(<Toast type="error" title="No se pudo eliminar el dibujo" message={message} />);
    }
  }

  async function onToggleFavorite(drawing: DrawingCardData) {
    setToast(null);

    try {
      const updated = await setFavorite(drawing.id, !drawing.isFavorite);
      if (!updated) {
        return;
      }
      setToast(
        <Toast
          type="success"
          title="Favorito actualizado"
          message={updated.isFavorite ? "Dibujo agregado a favoritos." : "Dibujo quitado de favoritos."}
        />,
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "No pudimos actualizar el favorito.";
      setToast(<Toast type="error" title="No se pudo actualizar el favorito" message={message} />);
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
        {!hasLoaded && !error ? (
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
