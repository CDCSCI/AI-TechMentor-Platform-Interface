import React, { createContext, useContext } from 'react';

interface DemoSettings {
  /** When on, every other AI request fails so the error and retry states can be reviewed */
  simulateAiErrors: boolean;
}

const DemoSettingsContext = createContext<DemoSettings>({ simulateAiErrors: false });

export function DemoSettingsProvider({
  simulateAiErrors,
  children



}: {simulateAiErrors: boolean;children: React.ReactNode;}) {
  return <DemoSettingsContext.Provider value={{ simulateAiErrors }}>{children}</DemoSettingsContext.Provider>;
}

export function useDemoSettings() {
  return useContext(DemoSettingsContext);
}