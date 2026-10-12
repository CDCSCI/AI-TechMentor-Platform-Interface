import React, { useId } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface FieldSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function FieldSelect({ label, options, value, onChange }: FieldSelectProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none rounded-lg border border-line bg-surface py-2.5 pl-3.5 pr-10 text-sm text-ink transition-[border-color,box-shadow] duration-150 ease-out focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-100">
          
          {options.map((o) =>
          <option key={o}>{o}</option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      </div>
    </div>);

}