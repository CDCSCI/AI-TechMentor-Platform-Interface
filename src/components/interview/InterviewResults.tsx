import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, RotateCcwIcon } from 'lucide-react';
import type { InterviewSession } from '../../types/career';
import { formatDuration, paceVerdict, sessionScore, sessionTips } from '../../utils/interviewFeedback';

interface InterviewResultsProps {
  session: InterviewSession;
  isNew: boolean;
  onPracticeAgain: () => void;
  onBack: () => void;
}

export function InterviewResults({ session, isNew, onPracticeAgain, onBack }: InterviewResultsProps) {
  const score = sessionScore(session);
  const total = session.durations.reduce((a, b) => a + b, 0);
  const avg = session.durations.length ? total / session.durations.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="rounded-2xl border border-line bg-surface p-6 md:p-8"
      aria-live="polite">
      
      <p className="text-sm text-ink-muted">
        {isNew ? 'Session saved' : 'Past session'} · {session.type} · {session.date}
      </p>
      <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-serif text-4xl font-semibold text-ink">{score}</h2>
        <dl className="grid grid-cols-3 gap-8 text-sm">
          <Stat label="Answered" value={`${session.durations.length} of ${session.questions.length}`} />
          <Stat label="Total time" value={formatDuration(total)} />
          <Stat label="Avg. answer" value={formatDuration(avg)} />
        </dl>
      </div>

      <h3 className="mt-8 text-sm font-semibold text-ink">Pacing by question</h3>
      <p className="mt-0.5 text-xs text-ink-muted">Aim for 20 seconds to 2 minutes per answer.</p>
      <ol className="mt-3 divide-y divide-line border-y border-line">
        {session.questions.map((q, i) => {
          const d = session.durations[i];
          const verdict = d === undefined ? null : paceVerdict(d);
          return (
            <li key={q} className="grid grid-cols-[1.5rem_1fr_auto] items-baseline gap-3 py-3 text-sm">
              <span className="tabular-nums text-ink-faint">{i + 1}</span>
              <span className={d === undefined ? 'text-ink-faint' : 'text-ink'}>{q}</span>
              <span className="whitespace-nowrap text-right tabular-nums">
                {verdict ?
                <>
                    <span className="text-ink-muted">{formatDuration(d)}</span>
                    <span className={`ml-2 font-medium ${verdict === 'Good length' ? 'text-ink' : 'text-signal'}`}>{verdict}</span>
                  </> :

                <span className="text-ink-faint">Skipped</span>
                }
              </span>
            </li>);

        })}
      </ol>

      <h3 className="mt-8 text-sm font-semibold text-ink">What to work on</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-muted marker:text-ink-faint">
        {sessionTips(session).map((t) =>
        <li key={t}>{t}</li>
        )}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onPracticeAgain}
          className="inline-flex items-center gap-2 rounded-lg bg-forest-800 px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-forest-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2">
          
          <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
          Practice {session.type.toLowerCase()} again
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 ease-out hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500">
          
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Back to setup
        </button>
      </div>
    </motion.div>);

}

function Stat({ label, value }: {label: string;value: string;}) {
  return (
    <div>
      <dt className="text-ink-muted">{label}</dt>
      <dd className="mt-0.5 font-semibold tabular-nums text-ink">{value}</dd>
    </div>);

}