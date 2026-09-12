import styles from "./Header.module.css";

interface Props {
  title: string
  subtitle: string
}

export function Header({ title, subtitle }: Props) {
  return (
    <div className={styles["header"]}>
      <h1 className={styles["title"]}>{title}</h1>
      <p className={styles["subtitle"]}>{subtitle}</p>
    </div>
  )
}