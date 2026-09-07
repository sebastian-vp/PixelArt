import { useState } from "react";

import { Filter } from "@/components/Filter";

import styles from "./Home.module.css";

export function Home() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className={styles["page"]}>
      <div className={styles["filter-container"]}>
        <Filter keyFilter="all" text="Todos" counter={0} onClick={setSelectedFilter} selectedValue={selectedFilter} />
        <Filter keyFilter="favorites" text="Favoritos" counter={0} onClick={setSelectedFilter} selectedValue={selectedFilter} />
      </div>
    </div>
  );
}
