"use client";

import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, hint, leftIcon, rightIcon, disabled, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-slate-400">{leftIcon}</span>
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`
              w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all
              placeholder:text-slate-400
              disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400
              ${
                hasError
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200/50 dark:border-red-700 dark:focus:border-red-500 dark:focus:ring-red-900/50"
                  : "border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200/50 dark:border-slate-700 dark:focus:border-slate-500 dark:focus:ring-slate-700/50 dark:bg-slate-800 dark:text-white"
              }
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-slate-400">{rightIcon}</span>
            </div>
          )}
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

Input.displayName = "Input";

export default Input;
