import styles from "./Button.module.css";

interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  customStyles?: React.CSSProperties;
}

export function Button({ text, onClick, customStyles, disabled = false }: Props) {
  return (
    <button disabled={disabled} onClick={onClick} className={styles["button"]} style={customStyles}>
      {text}
    </button>
  );
}
