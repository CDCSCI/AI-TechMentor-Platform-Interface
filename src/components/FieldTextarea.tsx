import React, { useId } from 'react';

interface FieldTextareaProps {
  label: string;
  hint?: string;
  placeholder: string;
  max: number;
  rows?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FieldTextarea({
  label,
  hint,
  placeholder,
  max,
  rows = 4,
  value,
  onChange,
  error
}: FieldTextareaProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {hint && <span className="ml-1.5 font-normal text-ink-faint">{hint}</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        maxLength={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`block w-full resize-y rounded-lg border bg-surface px-3.5 py-3 text-sm text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-150 ease-out focus:outline-none focus:ring-2 ${
        error ?
        'border-red-400 focus:border-red-500 focus:ring-red-100' :
        'border-line focus:border-forest-500 focus:ring-forest-100'}`
        } />
      
      <div className="mt-1 flex items-start justify-between gap-4 text-xs">
        <span id={`${id}-error`} className="text-red-600">
          {error}
        </span>
        <span className="tabular-nums text-ink-faint">
          {value.length}/{max}
        </span>
      </div>
    </div>);

}