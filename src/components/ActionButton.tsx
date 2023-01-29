import React from "react";
import { actionHeaderType } from "@/types";
import styles from "../styles/components/action.module.css";

const OptionAction = React.memo(({ action }: { action: actionHeaderType }) => {
  return (
    <div className={styles.action} onClick={() => action.action()}>
      {action.icon}
      <p>{action.label}</p>
    </div>
  );
});

export default OptionAction;
