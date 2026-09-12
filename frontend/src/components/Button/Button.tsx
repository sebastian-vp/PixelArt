import styles from "./Button.module.css";

interface Props {
  text: string;
  onClick: () => void;
  customStyles?: React.CSSProperties
}

export function Button({ text, onClick, customStyles }: Props) {
  return (
    <button onClick={onClick} className={styles["button"]} style={customStyles} >
      {text}
    </button>
  );
}
