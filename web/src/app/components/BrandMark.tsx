type BrandMarkProps = {
  className?: string;
  title?: string;
};

export default function BrandMark({ className = "h-5 w-5", title }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M5.5 7.5C5.5 6.672 6.172 6 7 6H17C17.828 6 18.5 6.672 18.5 7.5V16.5C18.5 17.328 17.828 18 17 18H7C6.172 18 5.5 17.328 5.5 16.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 9.5H15.5M8.5 12H13.5M8.5 14.5H12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M16.5 3.75L17.25 5.25L18.75 6L17.25 6.75L16.5 8.25L15.75 6.75L14.25 6L15.75 5.25L16.5 3.75Z"
        fill="currentColor"
      />
      <circle cx="16.5" cy="12.25" r="1.1" fill="currentColor" />
    </svg>
  );
}
