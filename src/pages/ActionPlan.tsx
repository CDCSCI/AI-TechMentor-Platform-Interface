import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { FieldSelect } from '../components/FieldSelect';
import { FieldTextarea } from '../components/FieldTextarea';
import { Button } from '../components/Button';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { planMilestones } from '../data/planMilestones';

const goalCategories = ['Career', 'Education', 'Certification', 'Skill growth'];
const timeframes = ['0–6 months', '6–12 months', '1–3 years', '3–5 years'];

export function ActionPlan() {
  const [category, setCategory] = useState('Career');
  const [timeframe, setTimeframe] = useState('3–5 years');
  const [goals, setGoals] = useState('');
  const { status, run } = useFakeRequest(1300);

  return (
    <div>
      <PageHeader
        title="Your action plan"
        description="Tell us about your goals and timeline, and we’ll build a personalized roadmap with milestones." />
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
          max={500}
          value={goals}
          onChange={setGoals} />
        
        <div>
          <Button type="submit" loading={status === 'loading'}>
            {status === 'loading' ? 'Building your plan…' : 'Generate plan'}
          </Button>
        </div>
      </form>

      {status === 'success' &&
      <section className="mt-10 max-w-3xl border-t border-line pt-8" aria-live="polite">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {category} roadmap · {timeframe}
          </h2>
          <ol className="mt-6">
            {planMilestones.map((m, i) =>
          <motion.li
            key={m.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="relative grid grid-cols-[20px_1fr] gap-4 pb-7 last:pb-0">
            
                <span className="relative flex justify-center">
                  <span className="mt-1 h-3 w-3 rounded-full border-2 border-forest-600 bg-canvas" />
                  {i < planMilestones.length - 1 &&
              <span className="absolute top-5 bottom-[-28px] w-px bg-line" />
              }
                </span>
                <div>
                  <p className="text-xs font-medium text-forest-700">{m.period}</p>
                  <h3 className="mt-0.5 text-base font-semibold text-ink">{m.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{m.detail}</p>
                </div>
              </motion.li>
          )}
          </ol>
        </section>
      }
    </div>);

}