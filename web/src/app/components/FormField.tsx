"use client";

import { ReactNode } from "react";

type FormFieldProps = {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export default function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className = "",
}: FormFieldProps) {
  const hasError = !!error;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {children}
      {(hint || error) && (
        <p
          className={`text-xs ${
            hasError
              ? "text-red-600 dark:text-red-400"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {hasError ? error : hint}
        </p>
      )}
    </div>
  );
}
