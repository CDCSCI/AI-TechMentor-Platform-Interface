import React, { createContext, useContext, useEffect, useState } from 'react';
import type { LogoVariant } from '../types/logo';

interface LogoContextValue {
  variant: LogoVariant;
  setVariant: (variant: LogoVariant) => void;
}

const LogoContext = createContext<LogoContextValue | null>(null);

export function LogoProvider({
  initialVariant,
  children



}: {initialVariant: LogoVariant;children: React.ReactNode;}) {
  const [variant, setVariant] = useState<LogoVariant>(initialVariant);

  useEffect(() => {
    setVariant(initialVariant);
  }, [initialVariant]);

  return <LogoContext.Provider value={{ variant, setVariant }}>{children}</LogoContext.Provider>;
}

export function useLogo() {
  const ctx = useContext(LogoContext);
  if (!ctx) throw new Error('useLogo must be used within LogoProvider');
  return ctx;
}