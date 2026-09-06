import styles from "./Button.module.css";

interface Props {
  text: string;
  onClick: () => void;
}

export function Button({ text, onClick }: Props) {
  return (
    <button onClick={onClick} className={styles["button"]}>
      {text}
    </button>
  );
}
