import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { FieldTextarea } from '../components/FieldTextarea';
import { Button } from '../components/Button';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { resumeSuggestions } from '../data/resumeSuggestions';

export function Resume() {
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');
  const { status, run } = useFakeRequest();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job.trim() && !skills.trim()) {
      setError('Add a job description or at least a few key skills.');
      return;
    }
    setError('');
    run();
  };

  return (
    <div>
      <PageHeader
        title="Revise your resume"
        description="Paste a job description or key details, and we’ll help you rewrite your resume to match. Keep it specific and authentic to your experience." />
      
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
          <FieldTextarea
            label="Job description"
            hint="(optional but recommended)"
            placeholder="Paste the job posting here…"
            max={2000}
            rows={6}
            value={job}
            onChange={setJob}
            error={error} />
          
          <FieldTextarea
            label="Key skills or role focus"
            placeholder="e.g. networking, system administration, Python, security…"
            max={500}
            rows={3}
            value={skills}
            onChange={setSkills} />
          
          <div>
            <Button type="submit" loading={status === 'loading'}>
              {status === 'loading' ? 'Tailoring…' : 'Get tailored suggestions'}
            </Button>
          </div>
        </form>

        <aside className="h-fit rounded-xl bg-forest-50 p-5">
          <LightbulbIcon className="h-5 w-5 text-forest-700" />
          <h2 className="mt-3 text-sm font-semibold text-forest-900">Tip</h2>
          <p className="mt-1 text-sm leading-relaxed text-forest-900/80">
            The more specific you are, the better the results. Include the job title, key responsibilities,
            and required skills.
          </p>
        </aside>
      </div>

      {status === 'success' &&
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="mt-10 border-t border-line pt-8"
        aria-live="polite">
        
          <h2 className="font-serif text-xl font-semibold text-ink">Suggested rewrites</h2>
          <ul className="mt-5 divide-y divide-line">
            {resumeSuggestions.map((s) =>
          <li key={s.before} className="grid gap-2 py-4 md:grid-cols-2 md:gap-8">
                <p className="text-sm text-ink-faint line-through decoration-ink-faint/50">{s.before}</p>
                <p className="text-sm font-medium text-ink">{s.after}</p>
              </li>
          )}
          </ul>
        </motion.section>
      }
    </div>);

}