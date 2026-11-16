import React from 'react';
import type { ChangeType } from '../../types/project';

export function ChangeTag({ change }: {change?: ChangeType;}) {
  if (!change) return null;
  return (
    <span
      className={`ml-2 inline-block rounded px-1.5 py-px align-middle text-[10px] font-semibold ${
      change === 'new' ? 'bg-signal text-white' : 'border border-signal/60 text-signal'}`
      }>
      
      {change === 'new' ? 'New' : 'Revised'}
    </span>);

}