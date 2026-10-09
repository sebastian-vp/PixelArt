import styles from "./Input.module.css";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  type?: "text" | "password" | "email";
}

export function Input({ label, placeholder, value, setValue, type = "text" }: Props) {
  return (
    <label className={styles["label"]}>
      {label}
      <input type={type} className={styles["input"]} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
    </label>
  );
}
