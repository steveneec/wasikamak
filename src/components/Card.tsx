import { PropsWithChildren } from "react";
import styles from "../styles/components/card.module.css";

export default function Card(props: props) {
  return (
    <div className={styles.card}>
      {props.title && (
        <div className={styles.header}>
          <h3>{props.title}</h3>
        </div>
      )}
      <div>{props.children}</div>
    </div>
  );
}

interface props extends PropsWithChildren {
  title?: string;
}
