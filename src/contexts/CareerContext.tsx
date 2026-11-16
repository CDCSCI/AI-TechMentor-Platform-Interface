import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { CandidateProfile, InterviewSession } from '../types/career';
import { pastSessions } from '../data/pastSessions';
import { emptyProfile, missingProfileFields, profileCompletion } from '../utils/profile';

const PROFILE_KEY = 'aitm.profile.v1';
const SESSIONS_KEY = 'aitm.sessions.v1';

interface CareerContextValue {
  profile: CandidateProfile;
  saveProfile: (profile: CandidateProfile) => void;
  completion: number;
  missing: string[];
  sessions: InterviewSession[];
  addSession: (session: InterviewSession) => void;
  resetDemo: () => void;
}

const CareerContext = createContext<CareerContextValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function persist(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {

    // Storage unavailable (private mode); keep working in memory.
  }}

export function CareerProvider({ children }: {children: React.ReactNode;}) {
  const [profile, setProfile] = useState<CandidateProfile>(() => load(PROFILE_KEY, emptyProfile));
  const [sessions, setSessions] = useState<InterviewSession[]>(() => load(SESSIONS_KEY, pastSessions));

  useEffect(() => persist(PROFILE_KEY, profile), [profile]);
  useEffect(() => persist(SESSIONS_KEY, sessions), [sessions]);

  const addSession = useCallback((s: InterviewSession) => setSessions((prev) => [s, ...prev]), []);
  const resetDemo = useCallback(() => {
    setProfile(emptyProfile);
    setSessions(pastSessions);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      saveProfile: setProfile,
      completion: profileCompletion(profile),
      missing: missingProfileFields(profile),
      sessions,
      addSession,
      resetDemo
    }),
    [profile, sessions, addSession, resetDemo]
  );

  return <CareerContext.Provider value={value}>{children}</CareerContext.Provider>;
}

export function useCareer() {
  const ctx = useContext(CareerContext);
  if (!ctx) throw new Error('useCareer must be used inside CareerProvider');
  return ctx;
}