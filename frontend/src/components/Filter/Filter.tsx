import styles from "./Filter.module.css";

interface Props {
  keyFilter: string;
  text: string;
  counter: number;
  selectedValue: string;
  onClick: (value: string) => void;
}

export function Filter({ keyFilter, text, counter, selectedValue, onClick }: Props) {
  return (
    <label className={styles["filter"]}>
      <span className={styles["filter-text"]}>{text}</span>
      <input name="filter" type="radio" onChange={() => onClick(keyFilter)} checked={keyFilter === selectedValue} />
      <span className={styles["filter-counter"]}>{counter}</span>
    </label>
  );
}
