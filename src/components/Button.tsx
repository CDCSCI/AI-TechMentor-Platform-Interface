import React from 'react';
import { ArrowRightIcon, LoaderCircleIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: React.ReactNode;
  showArrow?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({
  loading = false,
  icon,
  showArrow = true,
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const styles =
  variant === 'primary' ?
  'bg-forest-800 text-white hover:bg-forest-700' :
  'bg-surface text-forest-900 border border-line hover:border-forest-200 hover:bg-forest-50';

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${styles} ${className}`}>
      
      {loading ? <LoaderCircleIcon className="h-4 w-4 animate-spin" /> : icon}
      {children}
      {!loading && showArrow && <ArrowRightIcon className="h-4 w-4" />}
    </button>);

}