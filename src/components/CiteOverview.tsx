import { citeType } from "@/types";
import { AiOutlineUser } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import styles from "../styles/components/citeoverview.module.css";

export default function CiteOverView(props: props) {
  return (
    <div>
      <div className={styles.cite}>
        <p className={styles.date}>{props.cite.fecha.toDateString()}</p>
        <div className={styles.items}>
          <div className={styles.item}>
            <BiTimeFive size={22} />
            <p>{props.cite.fecha.toLocaleTimeString()}</p>
          </div>
          <div className={styles.item}>
            <AiOutlineUser size={22} />
            <p>{props.cite.paciente}</p>
          </div>
          <div className={styles.item}>
            <CiLocationOn size={22} />
            <p>{props.cite.direccion}</p>
          </div>
        </div>
        <div>
          <p className={styles.drname}>Dr {props.cite.doctor}</p>
          <p className={styles.especialidad}>{props.cite.terapia}</p>
        </div>
      </div>
      <div className={styles.options}>
        <p>Administrar cita</p>
      </div>
    </div>
  );
}

type props = {
  cite: citeType;
};
