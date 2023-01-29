import { contactoType } from "@/types";
import { CiCircleRemove } from "react-icons/ci";
import styles from "../styles/components/contactrow.module.css";

export default function ContactRow(props: props) {
  return (
    <div className={styles.row}>
      <div>
        <p>
          {props.contacto.nombres} {props.contacto.apellidos}
        </p>
        <small>{props.contacto.celular}</small>
      </div>
      {props.onremove && (
        <CiCircleRemove
          className={styles.remove}
          size={24}
          onClick={() => {
            if (props.onremove) props.onremove();
          }}
        />
      )}
    </div>
  );
}

interface props {
  onremove?: Function;
  contacto: contactoType;
}
