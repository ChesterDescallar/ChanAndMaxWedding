type TravelIconProps = {
  variant: 'beach' | 'nature' | 'adventure' | 'wildlife' | 'water' | 'culture' | 'food' | 'road';
  className?: string;
};

/**
 * Small line-art glyphs for destination tags, drawn in the same
 * single-stroke style as Botanical so they read as part of the same hand,
 * not an icon-library import.
 */
export function TravelIcon({ variant, className }: TravelIconProps) {
  const common = {
    viewBox: '0 0 32 32',
    className,
    fill: 'none' as const,
    'aria-hidden': true as const,
  };

  switch (variant) {
    case 'beach':
      return (
        <svg {...common}>
          <path
            d="M4 24 C 9 21, 23 21, 28 24"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M16 22 C 16 17, 14 13, 9 10"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M16 20 C 16 16.5, 18 13.5, 22 12"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="24" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case 'nature':
      return (
        <svg {...common}>
          <path d="M16 27 C 16 20, 16 13, 16 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path
            d="M16 7 C 21 7, 25 10, 25 15 C 20 15, 16 12, 16 7 Z"
            stroke="currentColor"
            strokeWidth="1.1"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <path
            d="M16 12 C 11 12, 7 15, 7 20 C 12 20, 16 17, 16 12 Z"
            stroke="currentColor"
            strokeWidth="1.1"
            fill="currentColor"
            fillOpacity="0.12"
          />
        </svg>
      );
    case 'adventure':
      return (
        <svg {...common}>
          <path
            d="M6 25 L14 9 L18 17 L21 11 L27 25 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <circle cx="23" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case 'wildlife':
      return (
        <svg {...common}>
          <ellipse cx="16" cy="19" rx="7" ry="6" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.1" />
          <circle cx="12.5" cy="17" r="1.4" fill="currentColor" />
          <circle cx="19.5" cy="17" r="1.4" fill="currentColor" />
          <path d="M9 13 C 8 10, 9 8, 11 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M23 13 C 24 10, 23 8, 21 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'water':
      return (
        <svg {...common}>
          <path
            d="M16 6 C 12 12, 9 16, 9 20 C 9 24, 12 27, 16 27 C 20 27, 23 24, 23 20 C 23 16, 20 12, 16 6 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path d="M11 21 C 12 23, 14 24, 16 24" stroke="currentColor" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
        </svg>
      );
    case 'culture':
      return (
        <svg {...common}>
          <path d="M8 26 L24 26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M9 26 L9 15 M13.5 26 L13.5 15 M18.5 26 L18.5 15 M23 26 L23 15" stroke="currentColor" strokeWidth="1.1" />
          <path d="M6 15 L16 6 L26 15 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
        </svg>
      );
    case 'food':
      return (
        <svg {...common}>
          <path d="M11 6 L11 14 M9 6 L9 14 M13 6 L13 14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M11 14 L11 27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="M22 6 C 19 6, 19 12, 21 15 L21 27"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case 'road':
      return (
        <svg {...common}>
          <path d="M12 27 L15 5 M20 27 L17 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M16 9 L16 12 M16 15 L16 18 M16 21 L16 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
    default:
      return null;
  }
}
