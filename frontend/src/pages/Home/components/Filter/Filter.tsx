import styles from "./Filter.module.css";

interface Props {
  groupName: string;
  keyFilter: string;
  text: string;
  counter: number;
  selectedValue: string;
  onChange: (value: string) => void;
}

export function Filter({ groupName, keyFilter, text, counter, selectedValue, onChange }: Props) {
  return (
    <label className={styles["filter"]}>
      <span className={styles["filter-text"]}>{text}</span>
      <input name={groupName} type="radio" onChange={() => onChange(keyFilter)} checked={keyFilter === selectedValue} />
      <span className={styles["filter-counter"]}>{counter}</span>
    </label>
  );
}
