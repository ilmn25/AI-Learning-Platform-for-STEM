"use client";

import { forwardRef } from "react";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options: SelectOption[];
  error?: string;
  hint?: string;
  placeholder?: string;
  label?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", error, hint, placeholder, label, options, disabled, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={`
              w-full appearance-none rounded-xl border bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none transition-all
              disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400
              ${
                hasError
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200/50 dark:border-red-700 dark:focus:border-red-500 dark:focus:ring-red-900/50"
                  : "border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200/50 dark:border-slate-700 dark:focus:border-slate-500 dark:focus:ring-slate-700/50 dark:bg-slate-800 dark:text-white"
              }
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        {(hint || error) && (
          <p className={`mt-1.5 text-xs ${hasError ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}>
            {error || hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
