import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, CircleDashedIcon } from 'lucide-react';
import type { SkillFeedback } from '../../utils/skillFeedback';

export function SkillFeedbackPanel({ feedback }: {feedback: SkillFeedback;}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      aria-live="polite"
      aria-label="Feedback on your answer"
      className="mt-6 border-t border-line pt-6">
      
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold text-ink">{feedback.rating}</h3>
        <p className="text-sm text-ink-muted">
          <span className="font-semibold tabular-nums text-ink">{feedback.score}</span>/100
        </p>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-line" role="progressbar" aria-valuenow={feedback.score} aria-valuemin={0} aria-valuemax={100} aria-label="Answer score">
        <div className="h-full rounded-full bg-forest-900" style={{ width: `${feedback.score}%` }} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-ink">What you covered</h4>
          {feedback.covered.length ?
          <ul className="mt-2 space-y-2 text-sm text-ink-muted">
              {feedback.covered.map((c) =>
            <li key={c} className="flex gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                  {c}
                </li>
            )}
            </ul> :

          <p className="mt-2 text-sm text-ink-muted">None of the key steps yet. Use the list on the right as a guide.</p>
          }
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">What to add</h4>
          {feedback.missed.length ?
          <ul className="mt-2 space-y-2.5 text-sm">
              {feedback.missed.map((m) =>
            <li key={m.label} className="flex gap-2">
                  <CircleDashedIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
                  <span>
                    <span className="font-medium text-ink">{m.label}.</span>{' '}
                    <span className="text-ink-muted">{m.tip}</span>
                  </span>
                </li>
            )}
            </ul> :

          <p className="mt-2 text-sm text-ink-muted">You hit every key step. Nice work.</p>
          }
        </div>
      </div>

      {feedback.notes.length > 0 &&
      <ul className="mt-6 space-y-1.5 rounded-xl bg-forest-50 px-4 py-3.5 text-sm text-ink">
          {feedback.notes.map((n) =>
        <li key={n}>{n}</li>
        )}
        </ul>
      }
    </motion.section>);

}