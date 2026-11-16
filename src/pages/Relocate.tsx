import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { FieldSelect } from '../components/FieldSelect';
import { CityBreakdown } from '../components/relocate/CityBreakdown';
import { cities, housingModes } from '../data/cities';
import { breakEvenSalary, cityBudget, usd } from '../utils/relocation';

type HousingId = (typeof housingModes)[number]['id'];

const cityLabel = (id: string) => {
  const c = cities.find((x) => x.id === id);
  return c ? `${c.name}, ${c.state}` : '';
};
const cityOptions = cities.map((c) => `${c.name}, ${c.state}`);
const idFromLabel = (label: string) => cities.find((c) => `${c.name}, ${c.state}` === label)?.id ?? cities[0].id;

export function Relocate() {
  const [fromId, setFromId] = useState('rdu');
  const [toId, setToId] = useState('austin');
  const [currentBase, setCurrentBase] = useState('125000');
  const [offerBase, setOfferBase] = useState('136000');
  const [housing, setHousing] = useState<HousingId>('solo');

  const current = Number(currentBase);
  const offer = Number(offerBase);
  const valid = current >= 20000 && offer >= 20000;

  const result = useMemo(() => {
    if (!valid) return null;
    const from = cities.find((c) => c.id === fromId) ?? cities[0];
    const to = cities.find((c) => c.id === toId) ?? cities[1];
    const share = housingModes.find((h) => h.id === housing)?.share ?? 1;
    const now = cityBudget(current, from, share);
    const next = cityBudget(offer, to, share);
    const breakEven = breakEvenSalary(now.leftover, to, share);
    return { from, to, now, next, breakEven, delta: offer - breakEven, monthly: next.leftover - now.leftover };
  }, [valid, fromId, toId, current, offer, housing]);

  return (
    <div>
      <PageHeader
        title="Is the move worth it?"
        description="Salary numbers don’t compare across cities. This turns an offer into take-home pay, real housing costs, and the salary you’d need to keep the life you already have." />
      

      <section aria-label="The two offers" className="rounded-2xl border border-line bg-surface p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FieldSelect label="You live in" options={cityOptions} value={cityLabel(fromId)} onChange={(v) => setFromId(idFromLabel(v))} />
          <SalaryInput label="Your current base" value={currentBase} onChange={setCurrentBase} />
          <FieldSelect label="The offer is in" options={cityOptions} value={cityLabel(toId)} onChange={(v) => setToId(idFromLabel(v))} />
          <SalaryInput label="Offered base" value={offerBase} onChange={setOfferBase} />
        </div>

        <div className="mt-6 border-t border-line pt-5">
          <p id="housing-label" className="mb-2.5 text-sm font-medium text-ink">
            Housing
          </p>
          <div role="group" aria-labelledby="housing-label" className="flex flex-wrap gap-2">
            {housingModes.map((h) => {
              const active = h.id === housing;
              return (
                <button
                  key={h.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setHousing(h.id)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 ${
                  active ?
                  'border-forest-800 bg-forest-800 text-white' :
                  'border-line bg-surface text-ink hover:border-forest-200 hover:bg-forest-50'}`
                  }>
                  
                  {h.label}
                </button>);

            })}
          </div>
        </div>
      </section>

      {!result ?
      <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          Enter both salaries as yearly amounts of at least $20,000 to see the comparison.
        </p> :

      <>
          <Verdict delta={result.delta} monthly={result.monthly} breakEven={result.breakEven} toName={result.to.name} />

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <CityBreakdown city={result.from} budget={result.now} tag="Where you are" />
            <CityBreakdown city={result.to} budget={result.next} tag="The offer" highlight />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-ink-faint">
            Estimates use 2026 federal tax brackets for a single filer, Social Security and Medicare, approximate
            state and local rates, median one-bedroom rents, and a cost-of-living index for everyday spending.
            Treat them as a starting point, not tax advice.
          </p>
        </>
      }
    </div>);

}

function SalaryInput({ label, value, onChange }: {label: string;value: string;onChange: (v: string) => void;}) {
  const id = `salary-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-faint">$</span>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          step={1000}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-lg border border-line bg-surface py-2.5 pl-7 pr-3 text-sm tabular-nums text-ink transition-[border-color,box-shadow] duration-150 ease-out focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-100" />
        
      </div>
    </div>);

}

function Verdict({ delta, monthly, breakEven, toName }: {delta: number;monthly: number;breakEven: number;toName: string;}) {
  const tone = delta >= 2000 ? 'ahead' : delta <= -2000 ? 'behind' : 'even';
  const copy = {
    ahead: {
      title: 'Ahead in real terms',
      body: `The offer clears your break-even salary by ${usd(delta)} a year, leaving ${usd(monthly)} more each month.`
    },
    even: {
      title: 'About even',
      body: `The offer lands within ${usd(Math.abs(delta))} of your break-even salary. Decide on the role and growth, not the money.`
    },
    behind: {
      title: 'Behind in real terms',
      body: `You’d need ${usd(breakEven)} in ${toName} to keep your current lifestyle, ${usd(
        Math.abs(delta)
      )} more than offered. That’s ${usd(Math.abs(monthly))} less each month, and a clear number to negotiate with.`
    }
  }[tone];

  return (
    <motion.section
      key={tone}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      aria-live="polite"
      className="mt-6 flex flex-col gap-6 rounded-2xl bg-forest-900 p-7 text-white md:flex-row md:items-end md:justify-between md:p-9">
      
      <div className="max-w-xl">
        <p className="text-sm font-medium text-forest-300">The verdict</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold">{copy.title}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-forest-100/85">{copy.body}</p>
      </div>
      <div className="shrink-0 md:text-right">
        <p
          className={`font-serif text-5xl font-semibold tabular-nums ${tone === 'behind' ? 'text-red-300' : 'text-white'}`}>
          
          {delta >= 0 ? '+' : '−'}
          {usd(Math.abs(delta))}
        </p>
        <p className="mt-1 text-sm text-forest-100/75">vs. break-even of {usd(breakEven)}</p>
      </div>
    </motion.section>);

}