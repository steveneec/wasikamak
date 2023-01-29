import React, { PropsWithChildren } from "react";
import styles from "../styles/components/modal.module.css";

export default function Modal(props: PropsWithChildren) {
  return <div className={styles.modal}>{props.children}</div>;
}
