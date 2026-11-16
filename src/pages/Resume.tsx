import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LightbulbIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { FieldTextarea } from '../components/FieldTextarea';
import { Button } from '../components/Button';
import { ErrorNote } from '../components/ErrorNote';
import { TailoringResults } from '../components/resume/TailoringResults';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { useCareer } from '../contexts/CareerContext';
import { tailorResume } from '../utils/resumeTailoring';

export function Resume() {
  const { profile } = useCareer();
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState('');
  const [submitted, setSubmitted] = useState({ job: '', skills: '' });
  const [error, setError] = useState('');
  const { status, run } = useFakeRequest();

  const result = useMemo(
    () => status === 'success' ? tailorResume({ job: submitted.job, skillsText: submitted.skills, profile }) : null,
    [status, submitted, profile]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job.trim() && !skills.trim()) {
      setError('Add a job description or at least a few key skills.');
      return;
    }
    setError('');
    setSubmitted({ job, skills });
    run();
  };

  return (
    <div>
      <PageHeader
        title="Revise your resume"
        description="Paste a job description or key details, and we’ll compare it with your profile and rewrite your experience to match. Keep it specific and authentic." />
      
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
          <FieldTextarea
            label="Job description"
            hint="(optional but recommended)"
            placeholder="Paste the job posting here…"
            rows={6}
            value={job}
            onChange={setJob}
            error={error} />
          
          <FieldTextarea
            label="Key skills or role focus"
            placeholder="e.g. networking, Linux, Python, security…"
            rows={3}
            value={skills}
            onChange={setSkills} />
          
          <div>
            <Button type="submit" loading={status === 'loading'}>
              {status === 'loading' ? 'Tailoring…' : 'Get tailored suggestions'}
            </Button>
          </div>
          {status === 'error' && <ErrorNote onRetry={run} />}
        </form>

        <aside className="h-fit rounded-xl bg-forest-50 p-5">
          <LightbulbIcon className="h-5 w-5 text-forest-800" aria-hidden="true" />
          {profile.resume.trim() ?
          <>
              <h2 className="mt-3 text-sm font-semibold text-ink">Using your profile</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                Rewrites come from the resume in your profile
                {profile.role.trim() ? `, aimed at ${profile.role.trim()} roles` : ''}. Paste the full posting for the
                most accurate match.
              </p>
            </> :

          <>
              <h2 className="mt-3 text-sm font-semibold text-ink">Add your resume first</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                Rewrites are based on your own experience. Without a resume in your profile, you’ll only see examples.
              </p>
              <Link
              to="/app/profile"
              className="mt-3 inline-block text-sm font-semibold text-ink underline underline-offset-2">
              
                Go to profile
              </Link>
            </>
          }
        </aside>
      </div>

      {result && <TailoringResults result={result} />}
    </div>);

}