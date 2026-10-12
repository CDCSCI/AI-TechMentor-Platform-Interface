import React from 'react';
import type { LogoTone, LogoVariant } from '../types/logo';

interface LogoMarkProps {
  variant: LogoVariant;
  tone?: LogoTone;
  size?: number;
  className?: string;
}

export function LogoMark({ variant, tone = 'onDark', size = 28, className }: LogoMarkProps) {
  const main = tone === 'onDark' ? '#ffffff' : '#174a37';
  const accent = tone === 'onDark' ? '#8fd0aa' : '#2f7a5a';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}>
      
      {variant === 'sprout' &&
      <>
          <path d="M16 28V16" stroke={main} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 19.5C10.5 19.5 6.5 15.8 6.5 10c5.6 0 9.5 3.9 9.5 9.5Z" fill={accent} />
          <path d="M16 16.5c0-6.3 4-10.5 10-10.5 0 6.3-4 10.5-10 10.5Z" fill={main} />
        </>
      }
      {variant === 'summit' &&
      <>
          <path d="M2.5 26.5 12.5 12l5.2 7.4 3.6-4.9 8.2 12H2.5Z" fill={main} />
          <path d="M12.5 12V4" stroke={main} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12.5 4 19.5 6.7l-7 2.7V4Z" fill={accent} />
        </>
      }
      {variant === 'guide' &&
      <>
          <path
          d="M5 24a11 11 0 0 1 22 0"
          stroke={main}
          strokeWidth="3.2"
          strokeLinecap="round" />
        
          <circle cx="16" cy="20.5" r="4" fill={accent} />
          <path d="M9.5 28h13" stroke={main} strokeWidth="2.4" strokeLinecap="round" />
        </>
      }
      {variant === 'steps' &&
      <>
          <rect x="3.5" y="19" width="6.8" height="9.5" rx="1.8" fill={main} fillOpacity="0.5" />
          <rect x="12.6" y="13" width="6.8" height="15.5" rx="1.8" fill={main} fillOpacity="0.8" />
          <rect x="21.7" y="5.5" width="6.8" height="23" rx="1.8" fill={accent} />
        </>
      }
    </svg>);

}