import { Check, Info, OctagonAlert } from "lucide-react";

import styles from "./Toast.module.css";
import type { ToastType, ToastValue } from "./toast.types";

interface Props {
  type: ToastType;
  title: string;
  message: string;
}

const TOAST_CONFIG: Record<ToastType, ToastValue> = {
  error: { Icon: OctagonAlert, className: styles["error-toast"] },
  success: { Icon: Check, className: styles["success-toast"] },
  info: { Icon: Info, className: styles["info-toast"] },
};

export function Toast({ type, title, message }: Props) {
  const { Icon, className } = TOAST_CONFIG[type];

  return (
    <div className={`${styles["container"]} ${className}`}>
      <div className={styles["icon"]}>
        <Icon />
      </div>
      <div className={styles["toast-info"]}>
        <h4 className={styles["title"]}>{title}</h4>
        <p className={styles["message"]}>{message}</p>
      </div>
    </div>
  );
}
