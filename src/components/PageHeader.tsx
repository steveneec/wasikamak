import { actionHeaderType } from "@/types";
import styles from "../styles/components/pageheader.module.css";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import OptionAction from "./ActionButton";

export default function PageHeader(props: props) {
  return (
    <div className={styles.pageheader}>
      <p className={styles.title}>{props.title}</p>
      <p>{props.description}</p>
      <div className={styles.actions}>
        {props.options.map((action, key) => (
          <OptionAction action={action} key={key} />
        ))}
      </div>
      {props.search && (
        <div className={styles.search}>
          <div className={styles.searchInput}>
            <AiOutlineSearch size={24} />
            <input
              placeholder={props.placeholder}
              value={props.searchValue}
              onChange={({ target }) => {
                if (props.onsearchChange) {
                  props.onsearchChange(target.value);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface props {
  title: string;
  description: string;
  options: Array<actionHeaderType>;
  search?: boolean;
  placeholder?: string;
  searchValue?: string;
  onsearchChange?: Function;
}
