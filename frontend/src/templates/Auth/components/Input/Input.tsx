import styles from "./Input.module.css";

interface Props {
  label: string;
  placeholder: string
  type?: "text" | "password";
}

export function Input({ label, placeholder, type = "text" }: Props) {
  return (
    <label className={styles["label"]}>
      {label}
      <input type={type} className={styles["input"]} placeholder={placeholder} />
    </label>
  );
}
