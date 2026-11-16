import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { FieldSelect } from '../components/FieldSelect';
import { FieldTextarea } from '../components/FieldTextarea';
import { Button } from '../components/Button';
import { ErrorNote } from '../components/ErrorNote';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { useCareer } from '../contexts/CareerContext';
import { buildActionPlan } from '../utils/actionPlan';

const goalCategories = ['Career', 'Education', 'Certification', 'Skill growth'];
const timeframes = ['0–6 months', '6–12 months', '1–3 years', '3–5 years'];

export function ActionPlan() {
  const { profile } = useCareer();
  const [category, setCategory] = useState('Career');
  const [timeframe, setTimeframe] = useState('6–12 months');
  const [goals, setGoals] = useState('');
  const [submitted, setSubmitted] = useState({ category, timeframe, goals });
  const { status, run } = useFakeRequest(1300);

  const plan = useMemo(
    () => status === 'success' ? buildActionPlan({ ...submitted, profileRole: profile.role }) : null,
    [status, submitted, profile.role]
  );

  return (
    <div>
      <PageHeader
        title="Your action plan"
        description="Tell us about your goals and timeline, and we’ll build a personalized roadmap with milestones." />
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted({ category, timeframe, goals });
          run();
        }}
        className="flex max-w-3xl flex-col gap-6">
        
        <div className="grid gap-6 sm:grid-cols-2">
          <FieldSelect label="Goal category" options={goalCategories} value={category} onChange={setCategory} />
          <FieldSelect label="Timeframe" options={timeframes} value={timeframe} onChange={setTimeframe} />
        </div>
        <FieldTextarea
          label="What are your goals?"
          hint="(optional)"
          placeholder="e.g. Get a cybersecurity role in DC, build experience, then aim for a $150k salary…"
          value={goals}
          onChange={setGoals} />
        
        <p className="-mt-2 text-sm text-ink-muted">
          {profile.role.trim() ?
          <>
              Planning toward <span className="font-medium text-ink">{profile.role.trim()}</span> from your profile.
            </> :

          <>
              No target role yet.{' '}
              <Link to="/app/profile" className="font-medium text-ink underline underline-offset-2">
                Add one to your profile
              </Link>{' '}
              for a more specific plan.
            </>
          }
        </p>
        <div>
          <Button type="submit" loading={status === 'loading'}>
            {status === 'loading' ? 'Building your plan…' : 'Generate plan'}
          </Button>
        </div>
        {status === 'error' && <ErrorNote onRetry={run} />}
      </form>

      {plan &&
      <section className="mt-10 max-w-3xl border-t border-line pt-8" aria-live="polite">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {submitted.category} roadmap · {submitted.timeframe}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Toward {plan.role} roles, focused on {plan.focus}
            {submitted.category === 'Certification' ? `, with ${plan.cert} as the target` : ''}.
          </p>
          <ol className="mt-6">
            {plan.milestones.map((m, i) =>
          <motion.li
            key={m.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="relative grid grid-cols-[20px_1fr] gap-4 pb-7 last:pb-0">
            
                <span className="relative flex justify-center">
                  <span className="mt-1 h-3 w-3 rounded-full border-2 border-forest-800 bg-canvas" />
                  {i < plan.milestones.length - 1 && <span className="absolute bottom-[-28px] top-5 w-px bg-line" />}
                </span>
                <div>
                  <p className="text-xs font-medium text-ink-muted">{m.period}</p>
                  <h3 className="mt-0.5 text-base font-semibold text-ink">{m.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{m.detail}</p>
                  {m.tool &&
              <Link
                to={m.tool.path}
                className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                
                      {m.tool.label}
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                    </Link>
              }
                </div>
              </motion.li>
          )}
          </ol>
        </section>
      }
    </div>);

}