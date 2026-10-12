import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LogoProvider } from './contexts/LogoContext';
import { AppShell } from './components/AppShell';
import { LogoOptions } from './pages/LogoOptions';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Resume } from './pages/Resume';
import { SkillLab } from './pages/SkillLab';
import { ActionPlan } from './pages/ActionPlan';
import { MockInterviews } from './pages/MockInterviews';

interface AppProps {
  logoVariant?: 'sprout' | 'summit' | 'guide' | 'steps';
}

export function App({ logoVariant = 'sprout' }: AppProps) {
  return (
    <LogoProvider initialVariant={logoVariant}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogoOptions />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="resume" element={<Resume />} />
            <Route path="skills" element={<SkillLab />} />
            <Route path="plan" element={<ActionPlan />} />
            <Route path="interviews" element={<MockInterviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LogoProvider>);

}