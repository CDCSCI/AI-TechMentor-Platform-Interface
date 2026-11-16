import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { level0, level1Functions } from '../../data/systemDesign';

export function Level0Diagram() {
  return (
    <figure>
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
        <FlowList title="Inputs from candidate" items={level0.inputs} />
        <ArrowRightIcon className="mx-auto hidden h-5 w-5 text-ink md:block" aria-hidden="true" />
        <div className="rounded-xl bg-forest-900 px-6 py-8 text-center text-white">
          <p className="text-xs font-medium text-forest-300">0.0</p>
          <p className="mt-1 font-serif text-2xl font-semibold">{level0.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">{level0.purpose}</p>
        </div>
        <ArrowRightIcon className="mx-auto hidden h-5 w-5 text-ink md:block" aria-hidden="true" />
        <FlowList title="Outputs to candidate" items={level0.outputs} />
      </div>
      <figcaption className="mt-4 text-xs text-ink-faint">
        Figure 1. Level 0: the whole system as a single function with its inputs and outputs.
      </figcaption>
    </figure>);

}

function FlowList({ title, items }: {title: string;items: string[];}) {
  return (
    <div className="rounded-xl border border-line px-4 py-4">
      <p className="text-xs font-semibold text-ink">{title}</p>
      <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-ink-muted">
        {items.map((i) =>
        <li key={i}>{i}</li>
        )}
      </ul>
    </div>);

}

export function Level1Diagram() {
  return (
    <figure>
      <div className="overflow-x-auto pb-1">
        <div className="min-w-[680px]">
          <div className="flex justify-center">
            <div className="rounded-lg bg-forest-900 px-6 py-2.5 text-center text-white">
              <span className="text-xs text-forest-300">0.0 </span>
              <span className="font-semibold">{level0.name}</span>
            </div>
          </div>
          <div className="mx-auto h-5 w-px bg-ink" aria-hidden="true" />
          <div className="mx-[7%] h-px bg-ink" aria-hidden="true" />
          <div className="grid grid-cols-7 gap-2">
            {level1Functions.map((f) =>
            <div key={f.id} className="flex flex-col">
                <div className="mx-auto h-5 w-px bg-ink" aria-hidden="true" />
                <div className="flex flex-1 flex-col rounded-lg border border-ink/80 bg-surface px-2 py-2.5 text-center">
                  <span className="text-[11px] font-semibold tabular-nums text-ink-faint">{f.id}</span>
                  <span className="mt-0.5 text-[12px] font-semibold leading-tight text-ink">{f.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-xs text-ink-faint">
        Figure 2. Level 1: the seven major functions that make up the system.
      </figcaption>
    </figure>);

}

export function Level1Table() {
  return (
    <div className="overflow-x-auto border-y border-ink/80">
      <table className="w-full min-w-[700px] border-collapse text-left text-[13px] leading-relaxed">
        <caption className="sr-only">Level 1 function descriptions</caption>
        <thead>
          <tr className="border-b border-ink/80 text-xs text-ink">
            <th scope="col" className="w-12 py-3 pr-3 font-semibold">ID</th>
            <th scope="col" className="w-[22%] py-3 pr-4 font-semibold">Function</th>
            <th scope="col" className="w-[32%] py-3 pr-4 font-semibold">Description</th>
            <th scope="col" className="py-3 pr-4 font-semibold">Inputs</th>
            <th scope="col" className="py-3 font-semibold">Outputs</th>
          </tr>
        </thead>
        <tbody>
          {level1Functions.map((f) =>
          <tr key={f.id} className="border-b border-line align-top last:border-b-0">
              <td className="py-3.5 pr-3 tabular-nums text-ink-faint">{f.id}</td>
              <th scope="row" className="py-3.5 pr-4 font-semibold text-ink">
                {f.name}
                <span className="block text-xs font-normal text-ink-faint">{f.screen}</span>
              </th>
              <td className="py-3.5 pr-4 text-ink-muted">{f.description}</td>
              <td className="py-3.5 pr-4 text-ink-muted">{f.inputs}</td>
              <td className="py-3.5 text-ink-muted">{f.outputs}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}