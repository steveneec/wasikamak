import { navOptionType } from "@/types";
import LeftNavigation from "./LeftNavigation";
import styles from "../styles/components/layout.module.css";
import {
  AiOutlineUser,
  AiOutlineMedicineBox,
  AiOutlineCalendar,
  AiOutlineSetting,
} from "react-icons/ai";
import { PropsWithChildren } from "react";
import { BiStats } from "react-icons/bi";

export default function Layout(props: PropsWithChildren) {
  const navOptions: Array<navOptionType> = [
    /*{
      label: "Resúmen",
      icon: <BiStats size={24} />,
      route: "/",
    },*/

    {
      label: "Citas",
      icon: <AiOutlineCalendar size={24} />,
      route: "/citas",
    },

    {
      label: "Pacientes",
      icon: <AiOutlineUser size={24} />,
      route: "/pacientes",
    },

    {
      label: "Doctores",
      icon: <AiOutlineMedicineBox size={24} />,
      route: "/doctores",
    },

    /*{
      label: "Ajustes",
      icon: <AiOutlineSetting size={24} />,
      route: "/ajustes",
    },*/
  ];

  return (
    <div className={styles.layout}>
      <LeftNavigation options={navOptions} />
      <div className={styles.content}>
        <div className={styles.wrapper}>{props.children}</div>
      </div>
    </div>
  );
}
