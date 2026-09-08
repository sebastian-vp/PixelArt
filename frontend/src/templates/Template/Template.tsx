import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "@/components";

import styles from "./Template.module.css";

export function Template() {
  return (
    <div className={styles["container"]}>
      <Sidebar />
      <div className={styles["content"]}>
        <Header />
        <main className={styles["main"]}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
