import React from 'react';
import { LogoMark } from './LogoMark';
import { logoConcepts } from '../data/logoConcepts';
import type { LogoTone, LogoVariant } from '../types/logo';

interface LogoProps {
  variant: LogoVariant;
  tone?: LogoTone;
  size?: number;
  textClassName?: string;
}

export function Logo({ variant, tone = 'onDark', size = 26, textClassName = 'text-[15px]' }: LogoProps) {
  const concept = logoConcepts.find((c) => c.id === variant);
  const isSerif = concept?.wordmark === 'serif';
  const textColor = tone === 'onDark' ? 'text-white' : 'text-forest-900';
  const accentColor = tone === 'onDark' ? 'text-forest-300' : 'text-forest-500';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <LogoMark variant={variant} tone={tone} size={size} />
      <span
        className={`${textClassName} ${textColor} ${
        isSerif ? 'font-serif font-semibold' : 'font-sans font-semibold tracking-tight'}`
        }>
        
        <span className={accentColor}>AI</span> TechMentor
      </span>
    </span>);

}