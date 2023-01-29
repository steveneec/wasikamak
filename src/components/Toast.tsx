import styles from "../styles/components/toast.module.css";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";

export default function Toast(props: props) {
  return (
    <div
      className={
        !props.show
          ? `${styles.toast} ${styles[props.type]}`
          : `${styles.toast} ${styles[props.type]} ${styles.toastShow}`
      }
    >
      <div className={styles.title}>
        {props.type === "success" && (
          <AiOutlineCheckCircle size={24} color="#43a047" />
        )}
        {props.type === "warning" && (
          <AiOutlineWarning size={24} color="#ffb300" />
        )}
        {props.type === "error" && <MdErrorOutline size={24} color="#e53935" />}
        <p>{props.title}</p>
      </div>
      <small>{props.caption}</small>
    </div>
  );
}

interface props {
  type: "success" | "warning" | "error";
  title: string;
  caption: string;
  show: boolean;
}
