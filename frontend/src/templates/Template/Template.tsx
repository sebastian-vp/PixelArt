import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

import styles from "./Template.module.css";

export function Template() {
  return (
    <div className={styles["container"]}>
      <Sidebar />
      <div className={styles["content"]}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
