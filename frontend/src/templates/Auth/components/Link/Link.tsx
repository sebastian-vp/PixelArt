import { NavLink } from "react-router-dom";

import styles from "./Link.module.css";

interface Props {
  text: string;
  link: string;
  textLink: string;
}

export function Link({ text, link, textLink }: Props) {
  return (
    <div className={styles["link-container"]}>
      <span>{text}</span>
      <NavLink to={link} className={styles["link"]}>{textLink}</NavLink>
    </div>
  );
}
