import { ToastContext } from "@/context/ToastProvider";
import { useContext } from "react";

/**
 * Hook useHook para acceder a los metodos y propiedades
 * del Toast
 * @returns object
 */
export const useToast = () => {
  const { initToast, showToast, title, caption, type, show } =
    useContext(ToastContext);

  return { initToast, showToast, title, caption, type, show };
};
