import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import { DownloadIcon, LoaderCircleIcon } from 'lucide-react';
import { projectInfo } from '../data/projectPlan';
import { downloadElementAsPdf } from '../utils/exportPdf';
import { GanttChart } from './schedule/GanttChart';
import { CriticalPathAnalysis } from './schedule/CriticalPathAnalysis';
import { PertChart } from './schedule/PertChart';

const sections = [
{ id: 'gantt', label: 'Gantt Chart', Component: GanttChart },
{ id: 'critical-path', label: 'Critical Path Analysis', Component: CriticalPathAnalysis },
{ id: 'pert', label: 'PERT Chart', Component: PertChart }];


export function ScheduleDocument() {
  const docRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const download = async () => {
    if (!docRef.current) return;
    setStatus('loading');
    try {
      await downloadElementAsPdf(docRef.current, `AI-TechMentor-Project-Schedule-Rev${projectInfo.revision}`);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div ref={docRef} className="min-h-screen w-full bg-canvas">
      <header className="border-b-2 border-ink bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium text-ink-muted">
                {projectInfo.name} · {projectInfo.course}
              </p>
              <h1 className="mt-2 font-serif text-4xl font-semibold text-ink md:text-5xl">Project Schedule Update</h1>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm">
                <div>
                  <dt className="text-ink-faint">Prepared by</dt>
                  <dd className="font-medium text-ink">{projectInfo.owner}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Revision</dt>
                  <dd className="font-medium text-ink">{projectInfo.revision}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Project dates</dt>
                  <dd className="font-medium text-ink">
                    {format(projectInfo.startDate, 'MMM d')} – {format(projectInfo.endDate, 'MMM d, yyyy')}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Status date</dt>
                  <dd className="font-medium text-ink">{format(projectInfo.statusDate, 'MMMM d, yyyy')}</dd>
                </div>
              </dl>
            </div>
            <div className="flex items-center gap-3" data-export-ignore>
              {status === 'error' &&
              <p role="alert" className="text-xs text-red-600">
                  Download failed. Try again in a new tab.
                </p>
              }
              <button
                type="button"
                onClick={download}
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-forest-800 px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-forest-700 active:scale-[0.98] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2">
                
                {status === 'loading' ? <LoaderCircleIcon className="h-4 w-4 animate-spin" /> : <DownloadIcon className="h-4 w-4" />}
                {status === 'loading' ? 'Preparing PDF…' : 'Download PDF'}
              </button>
            </div>
          </div>

          <nav aria-label="Contents" className="mt-8 border-t border-line pt-5">
            <p className="text-xs font-semibold text-ink">Contents</p>
            <ol className="mt-2 flex flex-wrap gap-x-8 gap-y-1.5 text-sm">
              {sections.map((s, i) =>
              <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-muted transition-colors duration-150 ease-out hover:text-ink">
                    <span className="mr-1.5 tabular-nums text-ink-faint">{i + 1}.</span>
                    {s.label}
                  </a>
                </li>
              )}
            </ol>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 md:px-10">
        {sections.map(({ id, Component }, i) =>
        <section
          key={id}
          id={id}
          aria-label={sections[i].label}
          className={`scroll-mt-6 py-12 ${i > 0 ? 'border-t-2 border-ink' : ''}`}>
          
            <p className="mb-1 text-sm font-semibold tabular-nums text-ink-faint">Section {i + 1}</p>
            <Component />
          </section>
        )}

        <footer className="flex justify-between border-t border-line py-6 text-xs text-ink-faint">
          <span>
            {projectInfo.name} · Project Schedule Update · Rev {projectInfo.revision}
          </span>
          <span>{projectInfo.course}</span>
        </footer>
      </main>
    </div>);

}