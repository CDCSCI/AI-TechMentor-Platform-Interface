import React, { useRef, useState } from 'react';
import { DownloadIcon, LoaderCircleIcon } from 'lucide-react';
import { Level0Diagram, Level1Diagram, Level1Table } from '../components/design-doc/FunctionalDecomposition';
import { ArchitectureDiagram } from '../components/design-doc/ArchitectureDiagram';
import { Flowchart, FlowLegend } from '../components/flowchart/Flowchart';
import { designFlow, operationalFlow } from '../data/flowcharts';
import { designDocInfo, operationalSteps } from '../data/systemDesign';
import { downloadElementAsPdf } from '../utils/exportPdf';

export function SystemDesignDoc() {
  const docRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const download = async () => {
    if (!docRef.current) return;
    setStatus('loading');
    try {
      await downloadElementAsPdf(docRef.current, 'AI-TechMentor-System-Design');
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen w-full bg-canvas py-8 md:py-12">
      <div className="mx-auto mb-4 flex max-w-[900px] items-center justify-end gap-3 px-5">
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

      <div className="mx-auto max-w-[900px] px-5">
        <article ref={docRef} className="bg-surface px-6 py-10 shadow-sm ring-1 ring-line md:px-14 md:py-14">
          <header className="border-b-2 border-ink pb-8">
            <p className="text-sm font-medium text-ink-muted">
              {designDocInfo.project} · {designDocInfo.course}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-ink md:text-5xl">{designDocInfo.title}</h1>
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm">
              <div>
                <dt className="text-ink-faint">Prepared by</dt>
                <dd className="font-medium text-ink">{designDocInfo.author}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Date</dt>
                <dd className="font-medium text-ink">{designDocInfo.date}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Contents</dt>
                <dd className="font-medium text-ink">Functional decomposition · Design flow · Operational flow</dd>
              </div>
            </dl>
          </header>

          <Section number="1" title="Functional decomposition">
            <p>
              Functional decomposition breaks AI.TechMentor into the functions it performs. Level 0 treats the
              whole system as one function. Level 1 splits it into the seven major functions, each matching a
              screen in the product.
            </p>
            <Subhead>1.1 Level 0</Subhead>
            <Level0Diagram />
            <Subhead>1.2 Level 1</Subhead>
            <Level1Diagram />
            <div className="pt-2">
              <Level1Table />
            </div>
          </Section>

          <Section number="2" title="Design flow chart (technical design)">
            <p>
              How the system processes a request behind the scenes. Most features follow the same path: validate in
              the browser, authenticate, load the candidate’s profile, build an AI prompt, call the language model,
              check and store the result, then render it. The relocation calculator runs entirely in the browser.
            </p>
            <Subhead>2.1 System architecture</Subhead>
            <ArchitectureDiagram />
            <Subhead>2.2 Request processing flow</Subhead>
            <FlowLegend />
            <figure className="rounded-xl border border-line bg-canvas/40 p-4 md:p-6">
              <Flowchart chart={designFlow} title="Design flow chart" />
              <figcaption className="mt-3 text-xs text-ink-faint">Figure 4. Technical design flow for a feature request.</figcaption>
            </figure>
          </Section>

          <Section number="3" title="Operational flow chart (user point of view)">
            <p>
              The candidate’s journey through AI.TechMentor, from first visit to receiving an offer. The loop back
              to the dashboard reflects how users return to practice until they feel ready to apply.
            </p>
            <FlowLegend />
            <figure className="rounded-xl border border-line bg-canvas/40 p-4 md:p-6">
              <Flowchart chart={operationalFlow} title="Operational flow chart" />
              <figcaption className="mt-3 text-xs text-ink-faint">Figure 5. Operational flow from the user’s point of view.</figcaption>
            </figure>
            <ol className="divide-y divide-line border-y border-line">
              {operationalSteps.map((s, i) =>
              <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-2 py-3.5 md:grid-cols-[2rem_180px_1fr] md:gap-6">
                  <span className="font-semibold tabular-nums text-ink-faint">{i + 1}</span>
                  <span className="font-semibold text-ink">{s.title}</span>
                  <span className="col-start-2 md:col-start-auto">{s.detail}</span>
                </li>
              )}
            </ol>
          </Section>

          <footer className="mt-14 flex justify-between border-t border-line pt-5 text-xs text-ink-faint">
            <span>
              {designDocInfo.project} · {designDocInfo.title}
            </span>
            <span>{designDocInfo.course}</span>
          </footer>
        </article>
      </div>
    </div>);

}

function Section({ number, title, children }: {number: string;title: string;children: React.ReactNode;}) {
  return (
    <section className="mt-12">
      <h2 className="flex items-baseline gap-3 font-serif text-2xl font-semibold text-ink">
        <span className="text-base tabular-nums text-ink-faint">{number}.</span>
        {title}
      </h2>
      <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-ink-muted">{children}</div>
    </section>);

}

function Subhead({ children }: {children: React.ReactNode;}) {
  return <h3 className="!mt-9 text-base font-semibold text-ink">{children}</h3>;
}