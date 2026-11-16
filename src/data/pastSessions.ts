import type { InterviewSession } from '../types/career';
import { interviewQuestions } from './interviewQuestions';

export const pastSessions: InterviewSession[] = [
{
  id: 's1',
  type: 'Behavioral',
  date: 'Sep 26, 2026 · 10:24 AM',
  questions: interviewQuestions.Behavioral,
  durations: [72, 95, 64, 110, 58],
  completed: true
},
{
  id: 's2',
  type: 'Technical',
  date: 'Sep 20, 2026 · 2:17 PM',
  questions: interviewQuestions.Technical,
  durations: [48, 12, 88, 140, 16],
  completed: true
},
{
  id: 's3',
  type: 'Career growth',
  date: 'Sep 14, 2026 · 11:03 AM',
  questions: interviewQuestions['Career growth'],
  durations: [30, 14, 22],
  completed: false
}];