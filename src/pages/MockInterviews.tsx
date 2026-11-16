import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronRightIcon, CodeIcon, MicIcon, UserIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { FieldSelect } from '../components/FieldSelect';
import { Button } from '../components/Button';
import { SuccessNote } from '../components/SuccessNote';
import { InterviewRoom } from '../components/interview/InterviewRoom';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { pastSessions, type PastSession } from '../data/pastSessions';
import { interviewer } from '../data/interviewQuestions';

const interviewTypes = ['Behavioral', 'Technical', 'Case study', 'Career growth'];

export function MockInterviews() {
  const [type, setType] = useState('Behavioral');
  const [sessions, setSessions] = useState<PastSession[]>(pastSessions);
  const [savedNote, setSavedNote] = useState('');
  const { status, run, reset } = useFakeRequest(900);

  const handleEnd = ({ answered, completed }: {answered: number;seconds: number;completed: boolean;}) => {
    reset();
    if (answered === 0) {
      setSavedNote('');
      return;
    }
    setSessions((prev) => [
    {
      id: `s-${Date.now()}`,
      title: `${type} – Practice`,
      date: format(new Date(), 'MMM d, yyyy · h:mm a'),
      kind: type === 'Technical' ? 'technical' : 'behavioral',
      score: completed ? 'Good' : 'Partial'
    },
    ...prev]
    );
    setSavedNote(`Session saved · ${answered} question${answered === 1 ? '' : 's'} answered`);
  };

  return (
    <div>
      <PageHeader
        title="Mock Interviews"
        description="Practice out loud with an AI interviewer, get feedback on content and delivery, and build your confidence." />
      

      <section className="max-w-4xl">
        {status === 'success' ?
        <InterviewRoom type={type} onEnd={handleEnd} /> :

        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="grid md:grid-cols-[minmax(0,1fr)_280px]">
              <div className="p-6">
                <h2 className="text-base font-semibold text-ink">Set up your interview</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {interviewer.name} asks five questions and adapts follow-ups to your profile.
                </p>
                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <FieldSelect label="Interview type" options={interviewTypes} value={type} onChange={setType} />
                  </div>
                  <Button
                  onClick={() => {
                    setSavedNote('');
                    run();
                  }}
                  loading={status === 'loading'}
                  icon={<MicIcon className="h-4 w-4" />}
                  showArrow={false}>
                  
                    {status === 'loading' ? 'Connecting…' : 'Start interview'}
                  </Button>
                </div>
                {savedNote && <div className="mt-4"><SuccessNote>{savedNote}</SuccessNote></div>}
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

      <section className="mt-10 max-w-4xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Past sessions</h2>
          <button type="button" className="text-sm font-medium text-forest-700 hover:text-forest-900">
            View all
          </button>
        </div>
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {sessions.map((s) =>
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