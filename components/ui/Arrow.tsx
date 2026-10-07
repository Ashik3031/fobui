interface ArrowProps {
  className?: string;
  diagonal?: boolean;
}

export function Arrow({ className = '', diagonal = false }: ArrowProps) {
  if (diagonal) {
    return (
      <svg
        className={`w-4 h-4 inline-block transition-transform duration-300 ${className}`}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`w-4 h-4 inline-block transition-transform duration-300 ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 8H13.5M13.5 8L8.5 3M13.5 8L8.5 13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
