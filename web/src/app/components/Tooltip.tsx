"use client";

import { useState, useRef, useEffect } from "react";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
};

export default function Tooltip({
  content,
  children,
  position = "top",
  delay = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-slate-700 ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
          <div
            className={`absolute h-2 w-2 rotate-45 bg-slate-900 dark:bg-slate-700 ${
              position === "top"
                ? "top-full left-1/2 -translate-x-1/2 -mt-1"
                : position === "bottom"
                  ? "bottom-full left-1/2 -translate-x-1/2 -mb-1"
                  : position === "left"
                    ? "left-full top-1/2 -translate-y-1/2 -ml-1"
                    : "right-full top-1/2 -translate-y-1/2 -mr-1"
            }`}
          />
        </div>
      )}
    </div>
  );
}
