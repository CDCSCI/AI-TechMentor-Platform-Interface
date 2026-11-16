import type { InterviewSession, SessionScore } from '../types/career';
import { interviewQuestions } from '../data/interviewQuestions';

export type PaceVerdict = 'Too short' | 'Good length' | 'Long';

export function paceVerdict(seconds: number): PaceVerdict {
  if (seconds < 20) return 'Too short';
  if (seconds > 120) return 'Long';
  return 'Good length';
}

export function sessionScore(s: InterviewSession): SessionScore {
  if (!s.completed) return 'Partial';
  const good = s.durations.filter((d) => paceVerdict(d) === 'Good length').length / s.durations.length;
  if (good >= 0.8) return 'Strong';
  if (good >= 0.4) return 'Good';
  return 'Needs work';
}

export function sessionTips(s: InterviewSession): string[] {
  const verdicts = s.durations.map(paceVerdict);
  const tips: string[] = [];
  if (verdicts.includes('Too short')) {
    tips.push('Some answers were very short. Use STAR (situation, task, action, result) and aim for one to two minutes.');
  }
  if (verdicts.includes('Long')) {
    tips.push('Some answers ran over two minutes. Lead with the result, then add only the detail that supports it.');
  }
  if (!s.completed) {
    tips.push('You ended early. Finish all five questions to get a full read on your pacing.');
  }
  if (!tips.length) {
    tips.push('Your pacing was steady throughout. Next, try a different interview type to stretch yourself.');
  }
  return tips;
}

/** Personalizes the opening question when the candidate has a target role. */
export function personalizedQuestions(type: string, role: string): string[] {
  const base = interviewQuestions[type] ?? interviewQuestions.Behavioral;
  const target = role.trim();
  if (!target) return base;
  return [`Tell me a little about yourself and what draws you to ${target} roles.`, ...base.slice(1)];
}

export function formatDuration(total: number): string {
  const m = Math.floor(total / 60);
  const s = Math.round(total % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}