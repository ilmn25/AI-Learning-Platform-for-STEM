"use client";

import { useEffect, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
};

type ToastProps = {
  toast: Toast;
  onDismiss: (id: string) => void;
};

export default function ToastComponent({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleDismiss]);

  const typeStyles = {
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      border: "border-emerald-200 dark:border-emerald-800",
      icon: "text-emerald-500",
      title: "text-emerald-800 dark:text-emerald-200",
      message: "text-emerald-700 dark:text-emerald-300",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/30",
      border: "border-red-200 dark:border-red-800",
      icon: "text-red-500",
      title: "text-red-800 dark:text-red-200",
      message: "text-red-700 dark:text-red-300",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/30",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-500",
      title: "text-blue-800 dark:text-blue-200",
      message: "text-blue-700 dark:text-blue-300",
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-900/30",
      border: "border-amber-200 dark:border-amber-800",
      icon: "text-amber-500",
      title: "text-amber-800 dark:text-amber-200",
      message: "text-amber-700 dark:text-amber-300",
    },
  };

  const styles = typeStyles[toast.type];

  const icons = {
    success: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  };

  return (
    <div
      className={`pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      } ${isExiting ? "translate-x-full opacity-0" : ""} ${styles.bg} ${styles.border}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={`shrink-0 ${styles.icon}`}>{icons[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${styles.title}`}>{toast.title}</p>
          {toast.message && <p className={`mt-1 text-sm ${styles.message}`}>{toast.message}</p>}
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
