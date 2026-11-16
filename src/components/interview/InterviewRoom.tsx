import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MicIcon, MicOffIcon, PhoneOffIcon, SkipForwardIcon } from 'lucide-react';
import { interviewer, interviewQuestions } from '../../data/interviewQuestions';
import { currentUser } from '../../data/user';

interface InterviewRoomProps {
  type: string;
  onEnd: (summary: {answered: number;seconds: number;completed: boolean;}) => void;
}

export function InterviewRoom({ type, onEnd }: InterviewRoomProps) {
  const questions = interviewQuestions[type] ?? interviewQuestions.Behavioral;
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const reduceMotion = useReducedMotion();
  const isLast = index === questions.length - 1;

  useEffect(() => {
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    setSpeaking(true);
    const t = window.setTimeout(() => setSpeaking(false), 3200);
    return () => window.clearTimeout(t);
  }, [index]);

  const next = () => {
    if (isLast) onEnd({ answered: questions.length, seconds, completed: true });else
    setIndex((i) => i + 1);
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-forest-950">
        <img
          src={interviewer.image}
          alt={`${interviewer.name}, your ${interviewer.role}`}
          className="aspect-[4/3] w-full object-cover grayscale sm:aspect-video" />
        

        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Live · <span className="tabular-nums">{formatTime(seconds)}</span>
          </span>
          <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium tabular-nums text-white backdrop-blur">
            Question {index + 1} of {questions.length}
          </span>
        </div>

        {/* Interviewer name + speaking state */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-black/60 py-1.5 pl-3 pr-4 text-xs text-white backdrop-blur">
          <SpeakingBars active={speaking && !reduceMotion} />
          <span className="font-semibold">{interviewer.name}</span>
          <span className="text-white/70">{speaking ? 'Speaking' : 'Listening'}</span>
        </div>

        {/* Self view */}
        <div className="absolute bottom-4 right-4 flex h-24 w-32 flex-col items-center justify-center rounded-xl border border-white/15 bg-forest-800 sm:h-28 sm:w-40">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-600 text-sm font-semibold text-white">
            {currentUser.initials}
          </span>
          <span className="mt-2 flex items-center gap-1 text-[11px] text-white/80">
            {muted ? <MicOffIcon className="h-3 w-3 text-red-400" /> : <MicIcon className="h-3 w-3" />}
            You
          </span>
        </div>
      </div>

      {/* Question caption */}
      <div className="mt-5 min-h-[5.5rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="font-serif text-xl leading-relaxed text-ink md:text-2xl">
            
            “{questions[index]}”
          </motion.p>
        </AnimatePresence>
        <p className="mt-2 text-sm text-ink-muted">
          {muted ? 'Your mic is off. Unmute to answer out loud.' : speaking ? `${interviewer.name} is asking…` : 'Answer out loud. Take your time.'}
        </p>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={muted}
          onClick={() => setMuted((m) => !m)}
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 ${
          muted ? 'border-red-200 bg-red-50 text-red-700' : 'border-line bg-surface text-ink hover:bg-forest-50'}`
          }>
          
          {muted ? <MicOffIcon className="h-4 w-4" /> : <MicIcon className="h-4 w-4" />}
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 rounded-lg bg-forest-800 px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-forest-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2">
          
          <SkipForwardIcon className="h-4 w-4" />
          {isLast ? 'Finish & get feedback' : 'Next question'}
        </button>
        <button
          type="button"
          onClick={() => onEnd({ answered: index, seconds, completed: false })}
          className="ml-auto inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors duration-150 ease-out hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">
          
          <PhoneOffIcon className="h-4 w-4" />
          End interview
        </button>
      </div>
    </div>);

}

function SpeakingBars({ active }: {active: boolean;}) {
  const heights = [0.5, 1, 0.7];
  return (
    <span className="flex h-3.5 items-center gap-[3px]" aria-hidden="true">
      {heights.map((h, i) =>
      <motion.span
        key={i}
        className="w-[3px] rounded-full bg-white"
        animate={active ? { height: ['30%', `${h * 100}%`, '30%'] } : { height: '30%' }}
        transition={active ? { duration: 0.6, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' } : { duration: 0.15 }} />

      )}
    </span>);

}

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}