import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { FieldTextarea } from '../components/FieldTextarea';
import { Button } from '../components/Button';
import { SuccessNote } from '../components/SuccessNote';
import { ErrorNote } from '../components/ErrorNote';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { useCareer } from '../contexts/CareerContext';
import { profileCompletion } from '../utils/profile';
import type { CandidateProfile } from '../types/career';

export function Profile() {
  const { profile, saveProfile } = useCareer();
  const [draft, setDraft] = useState<CandidateProfile>(profile);
  const [error, setError] = useState('');
  const { status, run, reset } = useFakeRequest(900);
  const draftRef = useRef(draft);
  draftRef.current = draft;

  useEffect(() => {
    if (status === 'success') saveProfile(draftRef.current);
  }, [status, saveProfile]);

  const completion = profileCompletion(draft);
  const unsaved = JSON.stringify(draft) !== JSON.stringify(profile);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.resume.trim()) {
      setError('Add your resume text so we can tailor feedback.');
      return;
    }
    setError('');
    run();
  };

  const edit = (key: keyof CandidateProfile) => (value: string) => {
    setDraft((d) => ({ ...d, [key]: value }));
    if (key === 'resume' && error) setError('');
    if (status === 'success' || status === 'error') reset();
  };

  return (
    <div>
      <PageHeader
        title="Profile & Experiences"
        description="Share your background, skills, and goals. Resume, Action Plan, and Mock Interviews all use what you save here." />
      

      <div className="mb-8 max-w-3xl">
        <div className="flex justify-between text-sm">
          <span className="text-ink-muted">Profile complete</span>
          <span className="font-semibold tabular-nums text-ink">{completion}%</span>
        </div>
        <div
          className="mt-2 h-1.5 rounded-full bg-line"
          role="progressbar"
          aria-label="Profile completion"
          aria-valuenow={completion}
          aria-valuemin={0}
          aria-valuemax={100}>
          
          <div className="h-full rounded-full bg-forest-900 transition-[width] duration-300 ease-out" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <form onSubmit={save} className="flex max-w-3xl flex-col gap-6" noValidate>
        <FieldTextarea
          label="Resume text"
          placeholder={'Paste your resume, one experience per line…\nHelped with IT tickets at the campus help desk'}
          rows={6}
          value={draft.resume}
          onChange={edit('resume')}
          error={error} />
        
        <FieldTextarea
          label="Classwork, projects, or experience not on your resume"
          placeholder="e.g. Capstone project analyzing traffic data in Python…"
          value={draft.classwork}
          onChange={edit('classwork')} />
        
        <FieldTextarea
          label="Target role or industry"
          placeholder="e.g. Help Desk Technician, SOC Analyst, Data Analyst…"
          rows={2}
          value={draft.role}
          onChange={edit('role')} />
        
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" loading={status === 'loading'} disabled={!unsaved && status !== 'error'}>
            {status === 'loading' ? 'Saving…' : 'Save profile'}
          </Button>
          {status === 'success' && <SuccessNote>Profile saved</SuccessNote>}
          {status === 'idle' && unsaved && <span className="text-sm text-ink-muted">Unsaved changes</span>}
        </div>
        {status === 'error' && <ErrorNote message="Your profile didn’t save. Your changes are still here." onRetry={run} />}
        {status === 'success' &&
        <Link to="/app/resume" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
            Next: tailor your resume to a job
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </Link>
        }
      </form>
    </div>);

}