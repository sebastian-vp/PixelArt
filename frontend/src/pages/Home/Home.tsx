import { useState } from "react";

import { DrawingCard, type DrawingCardData, EmptyGallery } from "@/pages/components";

import { Filter } from "./components";
import styles from "./Home.module.css";

export function Home() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allDrawings] = useState<DrawingCardData[]>([]);

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
        {drawings.length > 0 ? (
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
