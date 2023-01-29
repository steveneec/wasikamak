import { InputHTMLAttributes } from "react";
import styles from "../styles/components/input.module.css";

export default function Input(props: props) {
  return (
    <div
      className={`${styles.input} ${props.containerClass}`}
      style={props.containerStyle}
    >
      {props.label && (
        <label htmlFor={props.id}>
          {props.label}
          {props.required ? <small>*</small> : ""}
        </label>
      )}
      <input {...props} />
      {props.helptext && <small>{props.helptext}</small>}
    </div>
  );
}

interface props extends InputHTMLAttributes<HTMLInputElement> {
  helptext?: string;
  label?: string;
  containerClass?: string;
  containerStyle?: React.CSSProperties;
  required?: boolean;
}
