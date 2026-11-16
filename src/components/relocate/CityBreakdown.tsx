import React from 'react';
import type { City } from '../../data/cities';
import { usd, type CityBudget } from '../../utils/relocation';

interface CityBreakdownProps {
  city: City;
  budget: CityBudget;
  tag: string;
  highlight?: boolean;
}

export function CityBreakdown({ city, budget, tag, highlight = false }: CityBreakdownProps) {
  const rows = [
  { label: 'Base salary', value: usd(budget.salary) },
  { label: 'Take-home / month', value: usd(budget.takeHome) },
  { label: 'Housing', value: `− ${usd(budget.housing)}` },
  { label: 'Everything else', value: `− ${usd(budget.other)}` }];


  return (
    <article
      className={`flex flex-col rounded-2xl border bg-surface p-6 ${highlight ? 'border-forest-600' : 'border-line'}`}>
      
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-ink">{city.name}</h3>
          <p className="mt-0.5 text-sm text-ink-faint">
            {city.state} · Cost index {city.costIndex}
          </p>
        </div>
        <span
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
          highlight ? 'bg-forest-800 text-white' : 'bg-forest-50 text-forest-800'}`
          }>
          
          {tag}
        </span>
      </header>

      <dl className="mt-6 divide-y divide-line border-y border-line">
        {rows.map((r) =>
        <div key={r.label} className="flex items-baseline justify-between py-3 text-sm">
            <dt className="text-ink-muted">{r.label}</dt>
            <dd className="tabular-nums text-ink">{r.value}</dd>
          </div>
        )}
      </dl>

      <div className="mt-auto flex items-baseline justify-between pt-5">
        <span className="text-sm font-medium text-ink">Left over / month</span>
        <span
          className={`font-serif text-3xl font-semibold tabular-nums ${
          budget.leftover < 0 ? 'text-red-700' : 'text-forest-900'}`
          }>
          
          {usd(budget.leftover)}
        </span>
      </div>
    </article>);

}