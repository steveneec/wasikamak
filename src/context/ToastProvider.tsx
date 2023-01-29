import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast";

//Interface Toast
interface toast {
  title: string;
  type: "success" | "warning" | "error";
  caption: string;
  show: boolean;
  showToast: Function;
  initToast: Function;
}

//Contexto para el Toast
export const ToastContext = React.createContext<toast>({
  title: "",
  type: "success",
  caption: "",
  show: false,
  showToast: () => {},
  initToast: () => {},
});

//Provider del Context
export function ToastContextProvider(props: any) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [type, setType] = useState<"success" | "warning" | "error">("success");
  const [show, setShow] = useState(false);

  function showToast() {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }

  function initToast(
    title: string,
    caption: string,
    type: "success" | "warning" | "error"
  ) {
    setTitle(title);
    setCaption(caption);
    setType(type);
  }

  //Renderizar
  return (
    <ToastContext.Provider
      value={{
        title,
        type,
        caption,
        show,
        showToast,
        initToast,
      }}
    >
      <>
        {props.children}
        <Toast type={type} title={title} caption={caption} show={show} />
      </>
    </ToastContext.Provider>
  );
}
