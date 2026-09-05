import { Sidebar } from "@/components/Sidebar";

import styles from "./Template.module.css";

type Props = {
  children: React.ReactNode;
};

export function Template({ children }: Props) {
  return (
    <div className={styles["container"]}>
      <Sidebar />
      <div className={styles["content"]}>{children}</div>
    </div>
  );
}
