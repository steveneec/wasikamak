import styles from "../styles/components/selectoption.module.css";

export default function SelectOption(props: props) {
  return (
    <div className={styles.select}>
      {props.label && (
        <label htmlFor={props.id}>
          {props.label}
          {props.required ? <small>*</small> : ""}
        </label>
      )}
      <select
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={({ target }) => {
          props.onchange(target.value);
        }}
      >
        {props.options.map((option, key) => (
          <option value={option.value} key={key}>
            {option.text}
          </option>
        ))}
      </select>
      {props.helptext && <small>{props.helptext}</small>}
    </div>
  );
}

interface props {
  label?: string;
  id?: string;
  name?: string;
  helptext?: string;
  onchange: Function;
  value: string;
  options: {
    value: string;
    text: string;
  }[];
  required?: boolean;
}
