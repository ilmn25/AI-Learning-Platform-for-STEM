"use client";

import { useState, useEffect } from "react";

type TourStep = {
  target: string;
  title: string;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
};

type OnboardingTourProps = {
  steps: TourStep[];
  onComplete?: () => void;
  storageKey?: string;
};

export default function OnboardingTour({
  steps,
  onComplete,
  storageKey = "onboarding-tour-completed",
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(storageKey);
  });

  useEffect(() => {
    if (!isVisible || !steps[currentStep]) return;

    const updatePosition = () => {
      const target = document.querySelector(steps[currentStep].target);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect(rect);
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isVisible, currentStep, steps]);

  const completeTour = () => {
    localStorage.setItem(storageKey, "true");
    onComplete?.();
  };

  const skipTour = () => {
    completeTour();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isVisible || !targetRect || !steps[currentStep]) return null;

  const step = steps[currentStep];
  const position = step.position ?? "bottom";

  const tooltipStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 60,
  };

  const getPositionStyle = () => {
    const padding = 12;
    switch (position) {
      case "top":
        return {
          ...tooltipStyle,
          left: targetRect.left + targetRect.width / 2,
          top: targetRect.top - padding,
          transform: "translate(-50%, -100%)",
        };
      case "bottom":
        return {
          ...tooltipStyle,
          left: targetRect.left + targetRect.width / 2,
          top: targetRect.bottom + padding,
          transform: "translate(-50%, 0)",
        };
      case "left":
        return {
          ...tooltipStyle,
          left: targetRect.left - padding,
          top: targetRect.top + targetRect.height / 2,
          transform: "translate(-100%, -50%)",
        };
      case "right":
        return {
          ...tooltipStyle,
          left: targetRect.right + padding,
          top: targetRect.top + targetRect.height / 2,
          transform: "translate(0, -50%)",
        };
    }
  };

  const arrowPosition = () => {
    switch (position) {
      case "top":
        return { left: "50%", top: "100%", transform: "translate(-50%, -50%) rotate(45deg)" };
      case "bottom":
        return { left: "50%", bottom: "100%", transform: "translate(-50%, 50%) rotate(45deg)" };
      case "left":
        return { left: "100%", top: "50%", transform: "translate(-50%, -50%) rotate(45deg)" };
      case "right":
        return { right: "100%", top: "50%", transform: "translate(50%, -50%) rotate(45deg)" };
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/50" onClick={skipTour} />

      {/* Spotlight effect */}
      <div
        className="fixed z-40 rounded-lg border-2 border-sky-500 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] transition-all duration-300"
        style={{
          left: targetRect.left - 4,
          top: targetRect.top - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
        }}
      />

      {/* Tooltip */}
      <div
        className="w-72 rounded-xl bg-white p-4 shadow-2xl dark:bg-slate-800"
        style={getPositionStyle()}
      >
        <div
          className="absolute h-4 w-4 bg-white dark:bg-slate-800"
          style={arrowPosition()}
        />
        <div className="mb-3">
          <p className="text-xs font-medium uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Step {currentStep + 1} of {steps.length}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {step.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{step.content}</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={skipTour}
            className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Skip
          </button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Back
              </button>
            )}
            <button
              onClick={nextStep}
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-700"
            >
              {currentStep === steps.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
