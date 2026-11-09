import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PensarioLogo.module.scss';

interface PensarioLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  theme?: 'light' | 'dark'; // 'light' is for dark navbar (white/cream text),
  // 'dark' is for light page (dark green text)
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  className?: string;
  onClick?: () => void;
}

export const PensarioLogo: React.FC<PensarioLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  to = '/',
  className = '',
  onClick,
}) => {
  const isLight = theme === 'light';

  const icon = (
    <svg
      className={`${styles.icon} ${styles[size]}`}
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Radiant Sun in Warm Gold */}
      <g fill="#E7AA32">
        {/* Sun rays radiating upwards */}
        <rect x="47.5" y="2" width="5" height="11" rx="2.5" />
        <rect
          x="47.5"
          y="2"
          width="5"
          height="10"
          rx="2.5"
          transform="rotate(-25 50 42)"
        />
        <rect
          x="47.5"
          y="2"
          width="5"
          height="10"
          rx="2.5"
          transform="rotate(25 50 42)"
        />
        <rect
          x="47.5"
          y="3"
          width="5"
          height="9"
          rx="2.5"
          transform="rotate(-50 50 42)"
        />
        <rect
          x="47.5"
          y="3"
          width="5"
          height="9"
          rx="2.5"
          transform="rotate(50 50 42)"
        />
        <rect
          x="47.5"
          y="4"
          width="5"
          height="8"
          rx="2.5"
          transform="rotate(-75 50 42)"
        />
        <rect
          x="47.5"
          y="4"
          width="5"
          height="8"
          rx="2.5"
          transform="rotate(75 50 42)"
        />
        {/* Sun half-circle */}
        <path d="M 33 42 A 17 17 0 0 1 67 42 Z" />
      </g>

      {/* Stylized Open Book */}
      <g fill={isLight ? '#FFF8EA' : '#1D3B30'}>
        {/* Left Page */}
        <path d="M 47 45 C 33 43 20 48 11 55 C 11 50 25 44 47 44 Z" />
        <path d="M 48 48 C 32 46 18 52 10 60 C 19 55 35 51 48 53 Z" />
        <path d="M 48 46 C 34 44 19 49 11 57 C 10 59 12 60 14 59 C 23 54 36 50 48 52 Z" />
        {/* Right Page */}
        <path d="M 53 45 C 67 43 80 48 89 55 C 89 50 75 44 53 44 Z" />
        <path d="M 52 48 C 68 46 82 52 90 60 C 81 55 65 51 52 53 Z" />
        <path d="M 52 46 C 66 44 81 49 89 57 C 90 59 88 60 86 59 C 77 54 64 50 52 52 Z" />
      </g>
    </svg>
  );

  const content = (
    <div
      className={`
        ${styles.container} ${styles[variant]}
        ${styles[theme]} ${styles[size]} ${className}`}
    >
      {icon}
      {variant !== 'icon-only' && <span className={styles.text}>Pensário</span>}
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={styles.link}
        aria-label="Pensário - Início"
      >
        {content}
      </Link>
    );
  }

  return content;
};
