import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ChevronRightIcon, CodeIcon, MicIcon, UserIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { FieldSelect } from '../components/FieldSelect';
import { Button } from '../components/Button';
import { ErrorNote } from '../components/ErrorNote';
import { InterviewRoom } from '../components/interview/InterviewRoom';
import { InterviewResults } from '../components/interview/InterviewResults';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { useCareer } from '../contexts/CareerContext';
import { interviewer } from '../data/interviewQuestions';
import { personalizedQuestions, sessionScore } from '../utils/interviewFeedback';
import type { InterviewSession } from '../types/career';

const interviewTypes = ['Behavioral', 'Technical', 'Case study', 'Career growth'];
const PREVIEW_COUNT = 3;

type View = {mode: 'setup';} | {mode: 'room';} | {mode: 'results';session: InterviewSession;isNew: boolean;};

export function MockInterviews() {
  const { profile, sessions, addSession } = useCareer();
  const [type, setType] = useState('Behavioral');
  const [view, setView] = useState<View>({ mode: 'setup' });
  const [showAll, setShowAll] = useState(false);
  const { status, run, reset } = useFakeRequest(900);
  const role = profile.role.trim();
  const questions = useMemo(() => personalizedQuestions(type, role), [type, role]);

  useEffect(() => {
    if (status === 'success') {
      setView({ mode: 'room' });
      reset();
    }
  }, [status, reset]);

  const handleEnd = ({ durations, completed }: {durations: number[];completed: boolean;}) => {
    if (!durations.length) {
      setView({ mode: 'setup' });
      return;
    }
    const session: InterviewSession = {
      id: `s-${Date.now()}`,
      type,
      date: format(new Date(), 'MMM d, yyyy · h:mm a'),
      questions,
      durations,
      completed
    };
    addSession(session);
    setView({ mode: 'results', session, isNew: true });
  };

  const openSession = (session: InterviewSession) => {
    setView({ mode: 'results', session, isNew: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visible = showAll ? sessions : sessions.slice(0, PREVIEW_COUNT);

  return (
    <div>
      <PageHeader
        title="Mock Interviews"
        description="Practice out loud with an AI interviewer, then review your pacing question by question." />
      

      <section className="max-w-4xl">
        {view.mode === 'room' && <InterviewRoom questions={questions} onEnd={handleEnd} />}

        {view.mode === 'results' &&
        <InterviewResults
          session={view.session}
          isNew={view.isNew}
          onPracticeAgain={() => {
            setType(view.session.type);
            setView({ mode: 'setup' });
            run();
          }}
          onBack={() => setView({ mode: 'setup' })} />

        }

        {view.mode === 'setup' &&
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="grid md:grid-cols-[minmax(0,1fr)_280px]">
              <div className="p-6">
                <h2 className="text-base font-semibold text-ink">Set up your interview</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {role ?
                <>
                      {interviewer.name} asks five {type.toLowerCase()} questions, opening with why you want{' '}
                      {role} roles.
                    </> :

                <>
                      {interviewer.name} asks five questions.{' '}
                      <Link to="/app/profile" className="font-medium text-ink underline underline-offset-2">
                        Add a target role
                      </Link>{' '}
                      to personalize them.
                    </>
                }
                </p>
                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
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
                {status === 'error' &&
              <div className="mt-4">
                    <ErrorNote message={`We couldn’t connect you to ${interviewer.name}. Check your connection and try again.`} onRetry={run} />
                  </div>
              }
              </div>
              <div className="relative hidden bg-forest-900 md:block">
                <img
                src={interviewer.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[60%_center] grayscale" />
              
                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {interviewer.name} · {interviewer.role}
                </span>
              </div>
            </div>
          </div>
        }
      </section>

      {view.mode !== 'room' &&
      <section className="mt-10 max-w-4xl">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">
              Past sessions <span className="font-normal tabular-nums text-ink-faint">({sessions.length})</span>
            </h2>
            {sessions.length > PREVIEW_COUNT &&
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="rounded text-sm font-medium text-ink-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500">
            
                {showAll ? 'Show less' : 'View all'}
              </button>
          }
          </div>
          <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {visible.map((s) =>
          <li key={s.id}>
                <button
              type="button"
              onClick={() => openSession(s)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-150 ease-out hover:bg-forest-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest-500">
              
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-800">
                    {s.type === 'Technical' ? <CodeIcon className="h-5 w-5" /> : <UserIcon className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">{s.type} practice</span>
                    <span className="block text-xs text-ink-faint">{s.date}</span>
                  </span>
                  <span className="hidden text-sm text-ink-muted sm:inline">{sessionScore(s)}</span>
                  <span className="text-sm font-medium text-ink">Feedback</span>
                  <ChevronRightIcon className="h-4 w-4 text-ink-faint" />
                </button>
              </li>
          )}
          </ul>
        </section>
      }
    </div>);

}