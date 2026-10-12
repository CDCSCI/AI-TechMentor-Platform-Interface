import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { FieldTextarea } from '../components/FieldTextarea';
import { Button } from '../components/Button';
import { SuccessNote } from '../components/SuccessNote';
import { useFakeRequest } from '../hooks/useFakeRequest';

export function Profile() {
  const [resume, setResume] = useState('');
  const [classwork, setClasswork] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { status, run, reset } = useFakeRequest(900);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim()) {
      setError('Add your resume text so we can tailor feedback.');
      return;
    }
    setError('');
    run();
  };

  const edit = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    if (status === 'success') reset();
  };

  return (
    <div>
      <PageHeader
        title="Profile & Experiences"
        description="Share your background, skills, and goals so we can tailor your experience and feedback." />
      
      <form onSubmit={save} className="flex max-w-3xl flex-col gap-6" noValidate>
        <FieldTextarea
          label="Resume text"
          placeholder="Paste your resume text here…"
          max={4000}
          rows={6}
          value={resume}
          onChange={edit(setResume)}
          error={error} />
        
        <FieldTextarea
          label="Classwork, projects, or experience not on your resume"
          placeholder="e.g. Capstone project analyzing traffic data in Python…"
          max={1000}
          value={classwork}
          onChange={edit(setClasswork)} />
        
        <FieldTextarea
          label="Target role or industry"
          placeholder="e.g. Data Analyst, Product Marketing…"
          max={200}
          rows={2}
          value={role}
          onChange={edit(setRole)} />
        
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" loading={status === 'loading'}>
            {status === 'loading' ? 'Saving…' : 'Save profile'}
          </Button>
          {status === 'success' && <SuccessNote>Profile saved</SuccessNote>}
        </div>
      </form>
    </div>);

}