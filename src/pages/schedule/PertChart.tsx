import React from 'react';
import { addDays, format } from 'date-fns';
import { pertLayout, projectInfo } from '../../data/projectPlan';
import { useProjectSchedule } from '../../hooks/useProjectSchedule';
import { ChangeTag } from '../../components/schedule/ChangeTag';
import type { ScheduledTask } from '../../types/project';

const NODE_W = 168;
const NODE_H = 104;
const COL_GAP = 64;
const ROW_GAP = 36;
const PAD = 24;

export function PertChart() {
  const { tasks, duration, critical, criticalVariance } = useProjectSchedule();
  const byId = new Map(tasks.map((t) => [t.id, t]));

  const layout = Object.values(pertLayout);
  const cols = Math.max(...layout.map((p) => p.col)) + 1;
  const rowMin = Math.min(...layout.map((p) => p.row));
  const rowCount = Math.max(...layout.map((p) => p.row)) - rowMin + 1;
  const width = PAD * 2 + cols * NODE_W + (cols - 1) * COL_GAP;
  const height = PAD * 2 + rowCount * NODE_H + (rowCount - 1) * ROW_GAP;

  const pos = (id: string) => {
    const p = pertLayout[id];
    return { x: PAD + p.col * (NODE_W + COL_GAP), y: PAD + (p.row - rowMin) * (NODE_H + ROW_GAP) };
  };
  const laneFree = (row: number, fromCol: number, toCol: number) =>
  !layout.some((p) => p.row === row && p.col > fromCol && p.col < toCol);

  const edgePath = (fromId: string, toId: string) => {
    const a = pertLayout[fromId];
    const b = pertLayout[toId];
    const pa = pos(fromId);
    const pb = pos(toId);
    const sx = pa.x + NODE_W;
    const sy = pa.y + NODE_H / 2;
    const tx = pb.x - 2;
    const ty = pb.y + NODE_H / 2;
    if (sy === ty) return `M${sx} ${sy} L${tx} ${ty}`;
    // Turn late (stay on the source row) when that lane is clear, otherwise turn right away.
    if (b.col - a.col > 1 && laneFree(a.row, a.col, b.col)) {
      const bx = pb.x - COL_GAP + 4;
      return `M${sx} ${sy} L${bx} ${sy} C${bx + 28} ${sy} ${bx + 28} ${ty} ${bx + 56} ${ty} L${tx} ${ty}`;
    }
    return `M${sx} ${sy} C${sx + 28} ${sy} ${sx + 28} ${ty} ${sx + 56} ${ty} L${tx} ${ty}`;
  };

  const edges = tasks.flatMap((t) =>
  t.deps.map((d) => {
    const from = byId.get(d) as ScheduledTask;
    return { from, to: t, critical: from.critical && t.critical && from.ef === t.es };
  })
  );

  const sigma = Math.sqrt(criticalVariance);
  const p95 = Math.ceil(duration + 1.645 * sigma);

  return (
    <div>
      <div className="mb-6 max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold text-ink">PERT Chart</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          Each activity uses optimistic (o), most likely (m), and pessimistic (p) estimates. Expected time is
          (o + 4m + p) ÷ 6. New and revised activities from the latest changes are tagged.
        </p>
        <p className="mt-4 text-sm text-ink">
          <span className="font-semibold">Critical path:</span>{' '}
          <span className="tabular-nums">{critical.map((t) => t.id).join(' → ')}</span>
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink">How to read a node</h3>
          <div className="mt-3 w-[168px] overflow-hidden rounded-lg border border-line bg-surface text-[10px] text-ink-muted">
            <div className="grid grid-cols-3 border-b border-line text-center">
              <span className="py-1">Early start</span>
              <span className="border-x border-line py-1">Duration</span>
              <span className="py-1">Early finish</span>
            </div>
            <div className="px-2 py-2 text-[11px] text-ink">WBS · ID · Activity</div>
            <div className="grid grid-cols-3 border-t border-line text-center">
              <span className="py-1">Late start</span>
              <span className="border-x border-line py-1">Slack</span>
              <span className="py-1">Late finish</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-ink-faint">Numbers are project days from Aug 24.</p>
        </div>
        <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-3 sm:gap-10">
          <div>
            <dt className="text-ink-muted">Expected duration</dt>
            <dd className="font-serif text-2xl font-semibold text-ink">{duration} days</dd>
            <dd className="text-xs text-ink-faint">Finishes {format(addDays(projectInfo.startDate, duration - 1), 'MMM d, yyyy')}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Std. deviation</dt>
            <dd className="font-serif text-2xl font-semibold tabular-nums text-ink">± {sigma.toFixed(1)}</dd>
            <dd className="text-xs text-ink-faint">days, along the critical path</dd>
          </div>
          <div>
            <dt className="text-ink-muted">95% confidence</dt>
            <dd className="font-serif text-2xl font-semibold tabular-nums text-ink">{p95} days</dd>
            <dd className="text-xs text-ink-faint">By {format(addDays(projectInfo.startDate, p95 - 1), 'MMM d, yyyy')}</dd>
          </div>
        </dl>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <svg width={width} height={height} role="img" aria-label="PERT network diagram">
          <defs>
            <marker id="pert-arrow-crit" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 10 5 0 10Z" fill="#121212" />
            </marker>
            <marker id="pert-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 10 5 0 10Z" fill="#b9b7b0" />
            </marker>
          </defs>
          {edges.map(({ from, to, critical: crit }) =>
          <path
            key={`${from.id}-${to.id}`}
            d={edgePath(from.id, to.id)}
            fill="none"
            stroke={crit ? '#121212' : '#b9b7b0'}
            strokeWidth={crit ? 2.25 : 1.5}
            markerEnd={`url(#${crit ? 'pert-arrow-crit' : 'pert-arrow'})`} />

          )}
          {tasks.map((t) => {
            const { x, y } = pos(t.id);
            return (
              <foreignObject key={t.id} x={x} y={y} width={NODE_W} height={NODE_H}>
                <PertNode task={t} />
              </foreignObject>);

          })}
        </svg>
      </div>

      <section className="mt-12">
        <h3 className="font-serif text-xl font-semibold text-ink">Activity estimates</h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-line text-xs text-ink-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">ID</th>
                <th scope="col" className="px-4 py-3 font-medium">Activity</th>
                <th scope="col" className="px-4 py-3 font-medium">Predecessors</th>
                {['o', 'm', 'p', 'Expected', 'Variance', 'Slack'].map((h) =>
                <th key={h} scope="col" className="px-3 py-3 text-right font-medium">{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) =>
              <tr key={t.id} className="border-t border-line">
                  <td className={`px-4 py-2.5 tabular-nums ${t.critical ? 'font-semibold text-ink' : 'text-ink-muted'}`}>{t.id}</td>
                  <td className="px-4 py-2.5 text-ink">
                    {t.name}
                    {t.critical && <span className="ml-2 text-xs font-medium text-ink-muted">Critical</span>}
                    <ChangeTag change={t.change} />
                  </td>
                  <td className="px-4 py-2.5 tabular-nums text-ink-muted">{t.deps.join(', ') || '—'}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink-muted">{t.o}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink-muted">{t.m}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink-muted">{t.p}</td>
                  <td className="px-3 py-2.5 text-right font-medium tabular-nums text-ink">{t.te}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink-muted">{t.variance.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink">{t.slack}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}

function PertNode({ task }: {task: ScheduledTask;}) {
  const crit = task.critical;
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-lg bg-surface text-[11px] tabular-nums ${
      crit ? 'border-2 border-forest-900' : task.change === 'new' ? 'border border-dashed border-signal' : 'border border-line'}`
      }>
      
      <div className={`grid grid-cols-3 text-center font-medium ${crit ? 'bg-forest-900 text-white' : 'border-b border-line text-ink'}`}>
        <span className="py-1">{task.es}</span>
        <span className={`py-1 ${crit ? 'border-x border-white/20' : 'border-x border-line'}`}>{task.te}</span>
        <span className="py-1">{task.ef}</span>
      </div>
      <div className="flex-1 px-2 py-1.5">
        <p className="text-[10px] text-ink-faint">
          {task.wbs} · {task.id}
          {task.change && <span className="ml-1 font-semibold text-signal">{task.change === 'new' ? 'New' : 'Revised'}</span>}
        </p>
        <p className="line-clamp-2 text-[12px] font-semibold leading-tight text-ink">{task.name}</p>
      </div>
      <div className="grid grid-cols-3 border-t border-line text-center text-ink-muted">
        <span className="py-1">{task.ls}</span>
        <span className={`border-x border-line py-1 ${task.slack === 0 ? 'text-ink' : 'font-semibold text-ink'}`}>{task.slack}</span>
        <span className="py-1">{task.lf}</span>
      </div>
    </div>);

}