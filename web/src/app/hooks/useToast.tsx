"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import ToastComponent, { type Toast, type ToastType } from "@/app/components/Toast";

export type { Toast, ToastType };

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const isHydrated = useHydrated();

  const addToast = useCallback((type: ToastType, title: string, message?: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = { id, type, title, message, duration };
    setToasts((prev) => [...prev, toast]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

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

  const ToastContainer = useCallback(() => {
    if (!isHydrated) return null;
    return createPortal(
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>,
      document.body,
    );
  }, [toasts, isHydrated, dismissToast]);

  return {
    toasts,
    success,
    error,
    info,
    warning,
    dismissToast,
    ToastContainer,
  };
}
