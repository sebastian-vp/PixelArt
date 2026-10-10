import { Outlet } from "react-router-dom";

import { useToast } from "@/hooks";

import styles from "./ToastLayout.module.css";

export function ToastLayout() {
  const [toast, setToast] = useToast();

  return (
    <>
      {toast && (
        <div className={styles["container-toast"]} role="status">
          {toast}
        </div>
      )}
      <Outlet context={setToast} />
    </>
  );
}
