import React from 'react';
import { addDays, format } from 'date-fns';
import { projectInfo, projectMilestones, wbsPhases } from '../../data/projectPlan';
import { useProjectSchedule } from '../../hooks/useProjectSchedule';
import { taskStatus } from '../../utils/schedule';
import { ChangeTag } from '../../components/schedule/ChangeTag';

const LEFT_COLS = 'grid-cols-[48px_272px_60px_60px_40px_1fr]';
const LEFT_WIDTH = 48 + 272 + 60 + 60 + 40;

export function GanttChart() {
  const { tasks, duration, critical, statusDay } = useProjectSchedule();
  const weeks = Math.ceil(duration / 7);
  const pct = (d: number) => `${d / duration * 100}%`;
  const added = tasks.filter((t) => t.change === 'new').length;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl font-semibold text-ink">Gantt Chart</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            {added} new work packages were added and four were revised, while the Nov 29 finish holds at {duration}{' '}
            days. Black bars are the {critical.length} critical tasks; the filled portion of each bar shows progress
            as of {format(projectInfo.statusDate, 'MMM d')}.
          </p>
        </div>
        <Legend />
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <div className="relative min-w-[1180px]">
          <div className="pointer-events-none absolute bottom-0 right-0 top-0" style={{ left: LEFT_WIDTH }} aria-hidden="true">
            {Array.from({ length: weeks }).map((_, i) =>
            <div key={i} className="absolute bottom-0 top-0 border-l border-line/70" style={{ left: pct(i * 7) }} />
            )}
            <div className="absolute bottom-0 top-0 w-px bg-signal" style={{ left: pct(statusDay) }}>
              <span className="absolute right-1 top-1.5 whitespace-nowrap rounded bg-signal px-1.5 py-0.5 text-[10px] font-semibold text-white">
                Status · {format(projectInfo.statusDate, 'MMM d')}
              </span>
            </div>
          </div>

          <div className={`grid ${LEFT_COLS} h-11 items-center border-b border-line text-xs font-medium text-ink-muted`}>
            <span className="px-3">WBS</span>
            <span className="px-3">Task</span>
            <span className="px-2">Start</span>
            <span className="px-2">Finish</span>
            <span className="px-2 text-right">Days</span>
            <div className="relative h-full">
              {Array.from({ length: weeks }).map((_, i) =>
              <span key={i} className="absolute top-1/2 -translate-y-1/2 pl-1.5 text-[11px] tabular-nums" style={{ left: pct(i * 7) }}>
                  {format(addDays(projectInfo.startDate, i * 7), 'MMM d')}
                </span>
              )}
            </div>
          </div>

          {wbsPhases.map((phase) => {
            const phaseTasks = tasks.filter((t) => t.phaseId === phase.id);
            const es = Math.min(...phaseTasks.map((t) => t.es));
            const ef = Math.max(...phaseTasks.map((t) => t.ef));
            return (
              <div key={phase.id}>
                <div className={`grid ${LEFT_COLS} h-10 items-center border-b border-line bg-canvas/60 text-sm`}>
                  <span className="px-3 font-semibold tabular-nums text-ink">{phase.wbs}</span>
                  <span className="truncate px-3 font-semibold text-ink">{phase.name}</span>
                  <span className="px-2 text-xs tabular-nums text-ink-muted">{format(addDays(projectInfo.startDate, es), 'MMM d')}</span>
                  <span className="px-2 text-xs tabular-nums text-ink-muted">{format(addDays(projectInfo.startDate, ef - 1), 'MMM d')}</span>
                  <span className="px-2 text-right text-xs font-medium tabular-nums text-ink">{ef - es}</span>
                  <div className="relative h-full">
                    <div className="absolute top-1/2 h-2 -translate-y-1/2 rounded-sm bg-ink/70" style={{ left: pct(es), width: pct(ef - es) }} />
                  </div>
                </div>

                {phaseTasks.map((t) => {
                  const st = taskStatus(t, statusDay);
                  const done = st === 'Complete' ? 1 : st === 'In progress' ? (statusDay - t.es) / t.te : 0;
                  return (
                    <div key={t.id} className={`grid ${LEFT_COLS} h-10 items-center border-b border-line text-sm`}>
                      <span className="px-3 tabular-nums text-ink-muted">{t.wbs}</span>
                      <span className="truncate px-3 pl-6 text-ink">
                        {t.name}
                        <ChangeTag change={t.change} />
                      </span>
                      <span className="px-2 text-xs tabular-nums text-ink-muted">{format(t.start, 'MMM d')}</span>
                      <span className="px-2 text-xs tabular-nums text-ink-muted">{format(t.end, 'MMM d')}</span>
                      <span className="px-2 text-right text-xs tabular-nums text-ink">{t.te}</span>
                      <div className="relative h-full">
                        <div
                          title={`${t.name}: ${format(t.start, 'MMM d')} – ${format(t.end, 'MMM d')} · ${st}${
                          t.critical ? ' · critical' : ` · ${t.slack} days slack`}`
                          }
                          className={`absolute top-1/2 h-5 -translate-y-1/2 overflow-hidden rounded border ${
                          t.critical ? 'border-forest-900 bg-forest-900/25' : 'border-forest-300 bg-forest-300/30'}`
                          }
                          style={{ left: pct(t.es), width: pct(t.te) }}>
                          
                          <div
                            className={`h-full ${t.critical ? 'bg-forest-900' : 'bg-forest-300'}`}
                            style={{ width: `${Math.round(done * 100)}%` }} />
                          
                        </div>
                        {t.slack > 0 &&
                        <div
                          className="absolute top-1/2 h-5 -translate-y-1/2 rounded-r border border-dashed border-forest-300"
                          style={{ left: pct(t.ef), width: pct(t.slack) }} />

                        }
                      </div>
                    </div>);

                })}
              </div>);

          })}

          <div className={`grid ${LEFT_COLS} h-10 items-center border-b border-line bg-canvas/60 text-sm`}>
            <span className="px-3" />
            <span className="px-3 font-semibold text-ink">Milestones</span>
          </div>
          {projectMilestones.map((ms) => {
            const task = tasks.find((t) => t.id === ms.afterTask);
            if (!task) return null;
            return (
              <div key={ms.name} className={`grid ${LEFT_COLS} h-9 items-center border-b border-line text-sm last:border-b-0`}>
                <span className="px-3" />
                <span className="truncate px-3 pl-6 text-ink">{ms.name}</span>
                <span className="px-2" />
                <span className="px-2 text-xs tabular-nums text-ink-muted">{format(task.end, 'MMM d')}</span>
                <span className="px-2" />
                <div className="relative h-full">
                  <span
                    className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 ${
                    task.ef <= statusDay ? 'bg-ink' : 'border-2 border-ink bg-surface'}`
                    }
                    style={{ left: pct(task.ef) }}
                    aria-hidden="true" />
                  
                </div>
              </div>);

          })}
        </div>
      </div>
    </div>);

}

function Legend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
      <li className="flex items-center gap-2"><span className="h-3 w-6 rounded-sm bg-forest-900" /> Critical</li>
      <li className="flex items-center gap-2"><span className="h-3 w-6 rounded-sm bg-forest-300" /> Non-critical</li>
      <li className="flex items-center gap-2"><span className="h-3 w-6 rounded-sm border border-forest-900 bg-forest-900/25" /> Remaining</li>
      <li className="flex items-center gap-2"><span className="h-3 w-6 rounded-sm border border-dashed border-forest-300" /> Slack</li>
      <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rotate-45 bg-ink" /> Milestone</li>
      <li className="flex items-center gap-2"><span className="h-3 w-px bg-signal" /> Status date</li>
    </ul>);

}