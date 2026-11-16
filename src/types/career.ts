export interface CandidateProfile {
  resume: string;
  classwork: string;
  role: string;
}

export interface InterviewSession {
  id: string;
  type: string;
  date: string;
  questions: string[];
  /** Seconds spent on each answered question, in order */
  durations: number[];
  completed: boolean;
}

export type SessionScore = 'Strong' | 'Good' | 'Needs work' | 'Partial';