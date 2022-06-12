import { createContext, useState } from "react";

type VariantType = "success" | "error" | "warning" | "info";

export type ToastContextType = {
  showToast: (message: string, variant: VariantType) => any;
  hideToast: () => any;
  toast: {
    message: string;
    variant: VariantType | string;
  };
  show: any;
  setShow: any;
};

const ToastContext = createContext({} as ToastContextType);

export const ToastProvider = ({ children }: any) => {
  const [toast, setToast] = useState({ message: "", variant: "success" });
  const [show, setShow] = useState(false);

  const showToast = (message: string, variant: VariantType) => {
    setToast({ message, variant });
    setShow(true);
    setTimeout(() => {
      hideToast();
    }, 2000);
  };

  const hideToast = () => {
    setShow(false);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
        show,
        setShow,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
