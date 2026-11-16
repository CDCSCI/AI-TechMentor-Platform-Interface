import React from 'react';
import { format } from 'date-fns';
import { scheduleChanges, wbsPhases } from '../../data/projectPlan';
import { useProjectSchedule } from '../../hooks/useProjectSchedule';
import { taskStatus } from '../../utils/schedule';
import { ChangeTag } from '../../components/schedule/ChangeTag';

export function CriticalPathAnalysis() {
  const { tasks, duration, critical, paths, statusDay } = useProjectSchedule();
  const nearCritical = tasks.filter((t) => t.slack > 0 && t.slack <= 5);
  const topPaths = paths.slice(0, 8);
  const phaseName = (id: string) => wbsPhases.find((p) => p.id === id)?.name ?? '';

  return (
    <div>
      <div className="mb-8 max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold text-ink">Critical Path Analysis</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          The critical path is the longest chain of dependent tasks. It sets the {duration}-day project length, and
          any delay on it moves the finish date. After the scope changes, it now runs through the mock interview
          avatar work and the monochrome refresh instead of the AI resume features.
        </p>
      </div>

      <section className="rounded-xl bg-forest-900 p-6 text-white md:p-8">
        <p className="text-sm text-white/70">Critical path · {critical.length} tasks · {duration} days · zero slack</p>
        <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
          {critical.map((t, i) =>
          <li key={t.id} className="flex items-center gap-2">
              <span className="rounded-md border border-white/20 px-2.5 py-1.5 text-sm">
                <span className="font-semibold tabular-nums">{t.id}</span>
                <span className="ml-1.5 text-white/75">{t.name}</span>
              </span>
              {i < critical.length - 1 && <span className="text-white/40" aria-hidden="true">→</span>}
            </li>
          )}
        </ol>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-base font-semibold text-ink">All network paths</h3>
          <p className="mt-1 text-sm text-ink-muted">The {topPaths.length} longest of {paths.length} start-to-finish paths, with float against the critical path.</p>
          <ul className="mt-4 space-y-3">
            {topPaths.map((p, i) =>
            <li key={p.ids.join('')}>
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="truncate tabular-nums text-ink">{p.ids.join(' → ')}</span>
                  <span className="shrink-0 tabular-nums text-ink-muted">
                    {p.length} days{' '}
                    <span className={i === 0 ? 'font-semibold text-ink' : ''}>
                      · {duration - p.length === 0 ? 'critical' : `${duration - p.length} float`}
                    </span>
                  </span>
                </div>
                <div className="mt-1.5 h-2 rounded-sm bg-line/70">
                  <div className={`h-full rounded-sm ${i === 0 ? 'bg-forest-900' : 'bg-forest-300'}`} style={{ width: `${p.length / duration * 100}%` }} />
                </div>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-ink">Near-critical tasks to watch</h3>
          <p className="mt-1 text-sm text-ink-muted">Tasks with 5 days of slack or less. A small slip here creates a new critical path.</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {nearCritical.map((t) =>
            <li key={t.id} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                <span className="text-ink">
                  <span className="mr-2 font-semibold tabular-nums">{t.id}</span>
                  {t.name}
                  <ChangeTag change={t.change} />
                </span>
                <span className="shrink-0 font-semibold tabular-nums text-signal">{t.slack} days</span>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-base font-semibold text-ink">Forward and backward pass</h3>
        <p className="mt-1 text-sm text-ink-muted">Early and late start/finish in project days from Aug 24. Slack = LS − ES.</p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-line text-xs text-ink-muted">
              <tr>
                {['ID', 'Task', 'Phase', 'Days', 'ES', 'EF', 'LS', 'LF', 'Slack', 'Dates', 'Status'].map((h, i) =>
                <th key={h} scope="col" className={`px-3 py-3 font-medium ${i >= 3 && i <= 8 ? 'text-right' : ''}`}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) =>
              <tr key={t.id} className={`border-t border-line ${t.critical ? 'bg-forest-50/60' : ''}`}>
                  <td className={`px-3 py-2.5 tabular-nums ${t.critical ? 'font-semibold text-ink' : 'text-ink-muted'}`}>{t.id}</td>
                  <td className="px-3 py-2.5 text-ink">
                    {t.name}
                    <ChangeTag change={t.change} />
                  </td>
                  <td className="px-3 py-2.5 text-xs text-ink-muted">{phaseName(t.phaseId)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink">{t.te}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink-muted">{t.es}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink-muted">{t.ef}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink-muted">{t.ls}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink-muted">{t.lf}</td>
                  <td className={`px-3 py-2.5 text-right tabular-nums ${t.slack === 0 ? 'font-semibold text-ink' : 'text-ink-muted'}`}>{t.slack}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-xs tabular-nums text-ink-muted">
                    {format(t.start, 'MMM d')} – {format(t.end, 'MMM d')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-xs text-ink-muted">{taskStatus(t, statusDay)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-base font-semibold text-ink">Changes since the baseline schedule</h3>
        <p className="mt-1 text-sm text-ink-muted">
          New scope was absorbed by compressing three development tasks, so the completion date is unchanged.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-line text-xs text-ink-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Work package</th>
                <th scope="col" className="px-4 py-3 font-medium">Change</th>
                <th scope="col" className="px-4 py-3 font-medium">Baseline</th>
                <th scope="col" className="px-4 py-3 font-medium">Updated</th>
                <th scope="col" className="px-4 py-3 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody>
              {scheduleChanges.map((c) =>
              <tr key={c.item} className="border-t border-line align-top">
                  <td className="px-4 py-3 font-medium text-ink">{c.item}</td>
                  <td className={`px-4 py-3 ${c.type === 'Added' ? 'font-semibold text-signal' : 'text-ink'}`}>{c.type}</td>
                  <td className="px-4 py-3 tabular-nums text-ink-muted">{c.baseline}</td>
                  <td className="px-4 py-3 tabular-nums text-ink">{c.updated}</td>
                  <td className="px-4 py-3 text-ink-muted">{c.reason}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}