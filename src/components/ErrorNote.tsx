import React from 'react';
import { AlertCircleIcon, RotateCwIcon } from 'lucide-react';

interface ErrorNoteProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorNote({
  message = 'We couldn’t reach the AI service. Your input is still here, so you can try again.',
  onRetry
}: ErrorNoteProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between">
      
      <span className="flex items-start gap-2.5">
        <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {message}
      </span>
      {onRetry &&
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-lg border border-red-300 bg-white px-3 py-1.5 font-semibold text-red-800 transition-colors duration-150 ease-out hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:self-auto">
        
          <RotateCwIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Try again
        </button>
      }
    </div>);

}