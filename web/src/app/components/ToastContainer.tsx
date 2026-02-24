"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import ToastComponent, { type Toast, type ToastType } from "./Toast";

type ToastContextType = {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message?: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = { id, type, title, message, duration };
    setToasts((prev) => [...prev, toast]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, title: string, message?: string, duration?: number) => {
      addToast(type, title, message, duration);
    },
    [addToast],
  );

  const success = useCallback(
    (title: string, message?: string) => addToast("success", title, message),
    [addToast],
  );

  const error = useCallback(
    (title: string, message?: string) => addToast("error", title, message),
    [addToast],
  );

  const info = useCallback(
    (title: string, message?: string) => addToast("info", title, message),
    [addToast],
  );

  const warning = useCallback(
    (title: string, message?: string) => addToast("warning", title, message),
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
