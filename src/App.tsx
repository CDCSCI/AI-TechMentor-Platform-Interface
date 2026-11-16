import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LogoProvider } from './contexts/LogoContext';
import { CareerProvider } from './contexts/CareerContext';
import { DemoSettingsProvider } from './contexts/DemoSettingsContext';
import { AppShell } from './components/AppShell';
import { LogoOptions } from './pages/LogoOptions';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Resume } from './pages/Resume';
import { SkillLab } from './pages/SkillLab';
import { ActionPlan } from './pages/ActionPlan';
import { MockInterviews } from './pages/MockInterviews';
import { Relocate } from './pages/Relocate';
import { SystemDesignDoc } from './pages/SystemDesignDoc';
import { ScheduleDocument } from './pages/ScheduleDocument';

interface AppProps {
  experience?: 'product' | 'projectSchedule' | 'designDocument';
  logoVariant?: 'sprout' | 'summit' | 'guide' | 'steps';
  simulateAiErrors?: boolean;
}

export function App({ experience = 'product', logoVariant = 'sprout', simulateAiErrors = false }: AppProps) {
  if (experience === 'designDocument') {
    return <SystemDesignDoc />;
  }

  if (experience === 'projectSchedule') {
    return <ScheduleDocument />;
  }

  return (
    <DemoSettingsProvider simulateAiErrors={simulateAiErrors}>
      <CareerProvider>
        <LogoProvider initialVariant={logoVariant}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/app" replace />} />
              <Route path="/logos" element={<LogoOptions />} />
              <Route path="/app" element={<AppShell />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="resume" element={<Resume />} />
                <Route path="skills" element={<SkillLab />} />
                <Route path="plan" element={<ActionPlan />} />
                <Route path="interviews" element={<MockInterviews />} />
                <Route path="relocate" element={<Relocate />} />
              </Route>
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </BrowserRouter>
        </LogoProvider>
      </CareerProvider>
    </DemoSettingsProvider>);

}