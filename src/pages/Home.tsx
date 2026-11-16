import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
import { navItems } from '../data/navigation';
import { currentUser } from '../data/user';
import { useCareer } from '../contexts/CareerContext';
import { sessionScore } from '../utils/interviewFeedback';
import { formatList } from '../utils/text';

const toolPaths = ['/app/resume', '/app/skills', '/app/plan', '/app/interviews'];

export function Home() {
  const { profile, completion, missing, sessions } = useCareer();
  const tools = navItems.filter((i) => toolPaths.includes(i.path));
  const next = nextStep(completion, missing, profile.role.trim(), sessions[0] ? sessionScore(sessions[0]) : null);

  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-ink md:text-[2.5rem] md:leading-tight">
          Welcome back, {currentUser.firstName}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
          You’re one step closer to your goals. Pick up where you left off or jump into any section.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Link
          to={next.path}
          className="group flex flex-col rounded-2xl bg-forest-900 p-7 text-white transition-colors duration-200 ease-out hover:bg-forest-800 lg:row-span-2">
          
          <p className="text-sm font-medium text-white/60">Your next step</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug">{next.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/75">{next.body}</p>
          <div className="mt-auto pt-10">
            <div className="flex justify-between text-xs text-white/70">
              <span>Profile complete</span>
              <span className="tabular-nums">{completion}%</span>
            </div>
            <div
              className="mt-2 h-1.5 rounded-full bg-white/15"
              role="progressbar"
              aria-label="Profile completion"
              aria-valuenow={completion}
              aria-valuemin={0}
              aria-valuemax={100}>
              
              <div className="h-full rounded-full bg-white" style={{ width: `${completion}%` }} />
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              {next.cta}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        {tools.map((tool) =>
        <Link
          key={tool.path}
          to={tool.path}
          className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-200 ease-out hover:border-forest-300 hover:shadow-sm">
          
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-800">
              <tool.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-semibold text-ink">{tool.label}</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{tool.description}</p>
            <span className="mt-auto flex justify-end pt-5">
              <ArrowRightIcon className="h-4 w-4 text-ink transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
            </span>
          </Link>
        )}

        <Link
          to="/app/relocate"
          className="group flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-200 ease-out hover:border-forest-300 hover:shadow-sm sm:flex-row sm:items-center lg:col-span-3">
          
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-800">
            <MapPinIcon className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <span className="block text-base font-semibold text-ink">Got an offer? See if the move pays off</span>
            <span className="mt-1 block text-sm text-ink-muted">
              Compare take-home pay, rent, and living costs between your city and the offer’s, plus the salary you’d
              need to break even.
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink">
            Compare offers
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>);

}

function nextStep(completion: number, missing: string[], role: string, latestScore: string | null) {
  if (completion < 100) {
    return {
      title: completion === 0 ? 'Set up your profile' : 'Finish your profile',
      body: `Add your ${formatList(missing)} so every tool can tailor its feedback to you.`,
      cta: completion === 0 ? 'Start profile' : 'Continue profile',
      path: '/app/profile'
    };
  }
  if (latestScore !== 'Strong') {
    return {
      title: `Practice a ${role} interview`,
      body: 'Your profile is complete. Rehearse out loud with Maya and tighten your pacing until it reads Strong.',
      cta: 'Start mock interview',
      path: '/app/interviews'
    };
  }
  return {
    title: 'Tailor your resume to a real posting',
    body: 'Your last interview was strong. Paste a job you want and close the keyword gaps before you apply.',
    cta: 'Tailor resume',
    path: '/app/resume'
  };
}