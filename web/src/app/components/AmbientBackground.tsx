"use client";

type AmbientBackgroundProps = {
  className?: string;
};

export default function AmbientBackground({ className }: AmbientBackgroundProps) {
  return (
    <div className={`ambient-bg ${className ?? ""}`}>
      <div className="hero-grid" />
    </div>
  );
}
