import { useState } from "react";

import { Filter } from "./components";
import styles from "./Home.module.css";

export function Home() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className={styles["page"]}>
      <div className={styles["filter-container"]}>
        <Filter groupName="filter" keyFilter="all" text="Todos" counter={0} onChange={setSelectedFilter} selectedValue={selectedFilter} />
        <Filter groupName="filter" keyFilter="favorites" text="Favoritos" counter={0} onChange={setSelectedFilter} selectedValue={selectedFilter} />
      </div>
    </div>
  );
}
