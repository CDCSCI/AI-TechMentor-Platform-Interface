import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { TailoringResult } from '../../utils/resumeTailoring';
import { resumeSuggestions } from '../../data/resumeSuggestions';

export function TailoringResults({ result }: {result: TailoringResult;}) {
  const rewrites = result.usedProfile ?
  result.rewrites :
  resumeSuggestions.map((s) => ({ before: s.before, after: s.after, reasons: [] as string[] }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="mt-10 border-t border-line pt-8"
      aria-live="polite">
      
      {!result.usedProfile &&
      <p className="mb-8 rounded-xl bg-forest-50 px-4 py-3.5 text-sm text-ink">
          Your profile has no resume yet, so the rewrites below are examples.{' '}
          <Link to="/app/profile" className="font-semibold underline underline-offset-2">
            Add your resume
          </Link>{' '}
          to get rewrites of your own experience.
        </p>
      }

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <div>
          <h2 className="text-sm font-medium text-ink-muted">Keyword match</h2>
          <p className="mt-1 font-serif text-5xl font-semibold tabular-nums text-ink">
            {result.target.length ? `${result.coverage}%` : '—'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {result.target.length ?
            `${result.matched.length} of ${result.target.length} skills in this posting appear in your profile.` :
            'We couldn’t find specific skills in this posting. Add a few under Key skills for a sharper match.'}
          </p>
        </div>

        {result.target.length > 0 &&
        <div className="grid gap-6 sm:grid-cols-2">
            <SkillGroup title="Already in your experience" skills={result.matched} empty="None yet." strong />
            <div>
              <SkillGroup title="Missing from your profile" skills={result.missing} empty="Nothing missing. Great fit." />
              {result.missing.length > 0 &&
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                  Only add these if you’ve really used them. If you have,{' '}
                  <Link to="/app/profile" className="font-medium text-ink underline underline-offset-2">
                    add the details to your profile
                  </Link>{' '}
                  first.
                </p>
            }
            </div>
          </div>
        }
      </div>

      <h2 className="mt-12 font-serif text-xl font-semibold text-ink">Suggested rewrites</h2>
      {rewrites.length ?
      <ul className="mt-5 divide-y divide-line">
          {rewrites.map((s) =>
        <li key={s.before} className="grid gap-2 py-4 md:grid-cols-2 md:gap-8">
              <p className="text-sm text-ink-faint line-through decoration-ink-faint/50">{s.before}</p>
              <div>
                <p className="text-sm font-medium text-ink">{s.after}</p>
                {s.reasons.length > 0 && <p className="mt-1.5 text-xs text-ink-muted">{s.reasons.join(' · ')}</p>}
              </div>
            </li>
        )}
        </ul> :

      <p className="mt-3 text-sm text-ink-muted">
          We couldn’t find full sentences in your resume to rewrite. Put each experience on its own line in your profile.
        </p>
      }
    </motion.section>);

}

function SkillGroup({ title, skills, empty, strong = false }: {title: string;skills: string[];empty: string;strong?: boolean;}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {skills.length ?
      <ul className="mt-3 flex flex-wrap gap-2">
          {skills.map((s) =>
        <li
          key={s}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
          strong ? 'bg-forest-900 text-white' : 'border border-dashed border-forest-500 text-ink'}`
          }>
          
              {s}
            </li>
        )}
        </ul> :

      <p className="mt-3 text-sm text-ink-muted">{empty}</p>
      }
    </div>);

}