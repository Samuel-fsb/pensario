import React, { InputHTMLAttributes, useState, useId } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  isPassword = false,
  leftIcon,
  id: customId,
  type = 'text',
  className = '',
  disabled,
  ...rest
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const [showPassword, setShowPassword] = useState(false);

  const effectiveType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  return (
    <div
      className={`${styles.inputGroup} ${error ? styles.hasError : ''} ${className}`}
    >
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        <input
          id={inputId}
          type={effectiveType}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`${styles.input} ${leftIcon ? styles.withLeftIcon : ''} ${
            isPassword ? styles.withPasswordToggle : ''
          }`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
            aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
            tabIndex={0}
          >
            {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error ? (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      ) : helperText ? (
        <span id={helperId} className={styles.helperText}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
};
