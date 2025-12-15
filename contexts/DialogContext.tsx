"use client";

import { GlobalDialog } from "@/components/GlobalDialog";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type DialogVariant = "success" | "error" | "info" | "warning";

interface DialogContextType {
  showDialog: (message: string, variant?: DialogVariant, time?: number) => void;
  isVisible: boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialog must be used within DialogProvider");
  return context;
};

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<DialogVariant>("info");
  const [time, setTime] = useState(1);

  const showDialog = useCallback((msg: string, v: DialogVariant = "info", t: number = 1) => {
    setMessage(msg);
    setVariant(v);
    setTime(t);
    setVisible(true);

    setTimeout(() => setVisible(false), t * 1000);
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog, isVisible: visible }}>
      {children}
      <GlobalDialog message={message} visible={visible} variant={variant} time={time} />
    </DialogContext.Provider>
  );
};
