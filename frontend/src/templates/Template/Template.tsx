import { Outlet, useOutletContext } from "react-router-dom";

import { Header, Sidebar } from "./components";
import styles from "./Template.module.css";

export function Template() {
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();
  return (
    <div className={styles["container"]}>
      <Sidebar />
      <div className={styles["content"]}>
        <Header />
        <main className={styles["main"]}>
          <Outlet context={setToast} />
        </main>
      </div>
    </div>
  );
}
