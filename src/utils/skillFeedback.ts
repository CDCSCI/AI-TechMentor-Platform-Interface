import type { RubricItem } from '../data/skillCategories';
import { escapeRegExp, wordCount } from './text';

/** Short keywords (ip, du, pm) must match whole words; longer ones match as word prefixes. */
function keywordPattern(keyword: string): RegExp {
  const startsWithLetter = /^[a-z0-9]/i.test(keyword);
  const prefix = startsWithLetter ? '\\b' : '';
  const suffix = keyword.length <= 3 ? '\\b' : '';
  return new RegExp(`${prefix}${escapeRegExp(keyword)}${suffix}`, 'i');
}

export interface SkillFeedback {
  score: number;
  rating: 'Strong' | 'Good' | 'Needs work';
  covered: string[];
  missed: {label: string;tip: string;}[];
  notes: string[];
}

export const MIN_ANSWER_WORDS = 15;

export function evaluateSkillAnswer(rubric: RubricItem[], answer: string): SkillFeedback {
  const text = answer.toLowerCase();
  const words = wordCount(answer);
  const hits = rubric.filter((r) => r.keywords.some((k) => keywordPattern(k).test(text)));
  const coverage = hits.length / rubric.length;
  const structured =
  /\b(first|second|third|then|next|after that|finally|lastly)\b/.test(text) || /^\s*(\d+[.)]|[-•*])\s/m.test(answer);

  const score = Math.round(coverage * 65 + Math.min(words / 80, 1) * 20 + (structured ? 15 : 0));
  const rating = score >= 75 ? 'Strong' : score >= 50 ? 'Good' : 'Needs work';

  const notes: string[] = [];
  if (!structured) notes.push('Number your steps or use “first, then, finally” so a reviewer can follow your order.');
  if (words < 40) notes.push('Add more detail. Explain why you would take each step, not just what it is.');

  return {
    score,
    rating,
    covered: hits.map((r) => r.label),
    missed: rubric.filter((r) => !hits.includes(r)).map((r) => ({ label: r.label, tip: r.tip })),
    notes
  };
}