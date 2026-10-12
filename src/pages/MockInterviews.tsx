import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, CodeIcon, MicIcon, SquareIcon, UserIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { FieldSelect } from '../components/FieldSelect';
import { Button } from '../components/Button';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { pastSessions } from '../data/pastSessions';

const interviewTypes = ['Behavioral', 'Technical', 'Case study', 'Career growth'];

export function MockInterviews() {
  const [type, setType] = useState('Behavioral');
  const { status, run, reset } = useFakeRequest(800);

  return (
    <div>
      <PageHeader
        title="Mock Interviews"
        description="Practice with realistic interview questions, get AI feedback, and build your confidence." />
      

      <section className="max-w-3xl rounded-2xl border border-line bg-surface p-6">
        {status === 'success' ?
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          aria-live="polite">
          
            <p className="inline-flex items-center gap-2 text-sm font-medium text-forest-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              {type} interview in progress
            </p>
            <p className="mt-3 font-serif text-xl leading-relaxed text-ink">
              “Tell me about a time you had to learn a new tool quickly to solve a problem.”
            </p>
            <p className="mt-2 text-sm text-ink-muted">Answer out loud. We’re listening.</p>
            <Button variant="secondary" showArrow={false} className="mt-6" onClick={reset} icon={<SquareIcon className="h-3.5 w-3.5" />}>
              End interview
            </Button>
          </motion.div> :

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <FieldSelect label="Interview type" options={interviewTypes} value={type} onChange={setType} />
            </div>
            <Button
            onClick={run}
            loading={status === 'loading'}
            icon={<MicIcon className="h-4 w-4" />}
            showArrow={false}>
            
              {status === 'loading' ? 'Connecting…' : 'Start interview'}
            </Button>
          </div>
        }
      </section>

      <section className="mt-10 max-w-3xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Past sessions</h2>
          <button type="button" className="text-sm font-medium text-forest-700 hover:text-forest-900">
            View all
          </button>
        </div>
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {pastSessions.map((s) =>
          <li key={s.id}>
              <button
              type="button"
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-150 ease-out hover:bg-forest-50/60">
              
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-800">
                  {s.kind === 'technical' ? <CodeIcon className="h-5 w-5" /> : <UserIcon className="h-5 w-5" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{s.title}</span>
                  <span className="block text-xs text-ink-faint">{s.date}</span>
                </span>
                <span className="hidden text-sm text-ink-muted sm:inline">{s.score}</span>
                <span className="text-sm font-medium text-forest-700">Feedback</span>
                <ChevronRightIcon className="h-4 w-4 text-ink-faint" />
              </button>
            </li>
          )}
        </ul>
      </section>
    </div>);

}