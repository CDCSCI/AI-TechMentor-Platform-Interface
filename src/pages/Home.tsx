import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { navItems } from '../data/navigation';
import { currentUser } from '../data/user';

export function Home() {
  const [profile, ...tools] = navItems.slice(1);

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
          to={profile.path}
          className="group flex flex-col rounded-2xl bg-forest-900 p-7 text-white transition-colors duration-200 ease-out hover:bg-forest-800 lg:row-span-2">
          
          <p className="text-sm font-medium text-forest-300">Your next step</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug">Finish your profile</h2>
          <p className="mt-2 text-sm leading-relaxed text-forest-100/80">
            Add your classwork and target role so every tool can tailor its feedback to you.
          </p>
          <div className="mt-auto pt-10">
            <div className="flex justify-between text-xs text-forest-100/80">
              <span>Profile complete</span>
              <span className="tabular-nums">{currentUser.profileCompletion}%</span>
            </div>
            <div
              className="mt-2 h-1.5 rounded-full bg-white/15"
              role="progressbar"
              aria-valuenow={currentUser.profileCompletion}
              aria-valuemin={0}
              aria-valuemax={100}>
              
              <div
                className="h-full rounded-full bg-forest-300"
                style={{ width: `${currentUser.profileCompletion}%` }} />
              
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Continue profile
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        {tools.map((tool) =>
        <Link
          key={tool.path}
          to={tool.path}
          className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-200 ease-out hover:border-forest-200 hover:shadow-sm">
          
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-800">
              <tool.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-semibold text-ink">{tool.label}</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{tool.description}</p>
            <span className="mt-auto flex justify-end pt-5">
              <ArrowRightIcon className="h-4 w-4 text-forest-700 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
            </span>
          </Link>
        )}
      </div>
    </div>);

}