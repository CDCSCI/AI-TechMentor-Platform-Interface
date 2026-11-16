import { addDays } from 'date-fns';
import type { ProjectTask, ScheduledTask } from '../types/project';

export function expectedDuration(t: ProjectTask): number {
  return Math.round((t.o + 4 * t.m + t.p) / 6);
}

export function taskVariance(t: ProjectTask): number {
  return ((t.p - t.o) / 6) ** 2;
}

/** Critical path method: forward and backward pass. Tasks must be listed in dependency order. */
export function computeSchedule(tasks: ProjectTask[], projectStart: Date) {
  const map = new Map<string, ScheduledTask>();

  for (const t of tasks) {
    const te = expectedDuration(t);
    const predEnds = t.deps.map((d) => map.get(d)?.ef ?? 0);
    const es = predEnds.length ? Math.max(...predEnds) : 0;
    map.set(t.id, {
      ...t,
      te,
      variance: taskVariance(t),
      es,
      ef: es + te,
      ls: 0,
      lf: 0,
      slack: 0,
      critical: false,
      start: projectStart,
      end: projectStart
    });
  }

  const duration = Math.max(...Array.from(map.values()).map((t) => t.ef));

  for (const t of [...tasks].reverse()) {
    const s = map.get(t.id);
    if (!s) continue;
    const successors = tasks.
    filter((x) => x.deps.includes(t.id)).
    map((x) => map.get(x.id)).
    filter((x): x is ScheduledTask => Boolean(x));
    s.lf = successors.length ? Math.min(...successors.map((x) => x.ls)) : duration;
    s.ls = s.lf - s.te;
    s.slack = s.ls - s.es;
    s.critical = s.slack === 0;
    s.start = addDays(projectStart, s.es);
    s.end = addDays(projectStart, s.ef - 1);
  }

  const scheduled = tasks.map((t) => map.get(t.id) as ScheduledTask);
  const critical = scheduled.filter((t) => t.critical);
  const criticalVariance = critical.reduce((sum, t) => sum + t.variance, 0);

  return { tasks: scheduled, duration, critical, criticalVariance };
}

/** Every start-to-finish path through the network, longest first. */
export function enumeratePaths(tasks: ScheduledTask[]) {
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const succ = (id: string) => tasks.filter((t) => t.deps.includes(id));
  const paths: {ids: string[];length: number;}[] = [];

  const walk = (id: string, trail: string[]) => {
    const next = succ(id);
    const path = [...trail, id];
    if (!next.length) {
      paths.push({ ids: path, length: path.reduce((s, x) => s + (byId.get(x)?.te ?? 0), 0) });
      return;
    }
    next.forEach((n) => walk(n.id, path));
  };

  tasks.filter((t) => !t.deps.length).forEach((t) => walk(t.id, []));
  return paths.sort((a, b) => b.length - a.length);
}

export function taskStatus(t: ScheduledTask, statusDay: number): 'Complete' | 'In progress' | 'Not started' {
  if (t.ef <= statusDay) return 'Complete';
  if (t.es <= statusDay) return 'In progress';
  return 'Not started';
}