import React from "react";
import { navOptionType } from "@/types";
import styles from "../styles/components/leftnavigation.module.css";
import { IoHeartCircleSharp } from "react-icons/io5";
import { NextRouter, useRouter } from "next/router";

export default function LeftNavigation(props: props) {
  const router = useRouter();

  return (
    <div className={styles.leftNav}>
      <div className={styles.logo}>
        <IoHeartCircleSharp size={32} color="#54e694" />
        <h2>wasi-kamak</h2>
      </div>
      <div>
        {props.options.map((opt, key) => (
          <NavOption
            option={opt}
            key={key}
            pathname={router.pathname}
            router={router}
          />
        ))}
      </div>
    </div>
  );
}

const NavOption = React.memo(
  ({
    option,
    pathname,
    router,
  }: {
    option: navOptionType;
    pathname: string;
    router: NextRouter;
  }) => {
    return (
      <div
        className={
          pathname !== option.route
            ? styles.navOption
            : `${styles.navOption} ${styles.navOptionActive}`
        }
        onClick={() => router.push(option.route)}
      >
        <p style={{ color: pathname === option.route ? "#4274ea" : "" }}>
          {option.icon}
        </p>
        <p>{option.label}</p>
      </div>
    );
  }
);

type props = {
  options: Array<navOptionType>;
};
