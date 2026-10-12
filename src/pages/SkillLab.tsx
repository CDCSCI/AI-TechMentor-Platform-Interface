import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { skillCategories } from '../data/skillCategories';

export function SkillLab() {
  const [selectedId, setSelectedId] = useState(skillCategories[0].id);
  const { status, run, reset } = useFakeRequest();
  const selected = skillCategories.find((c) => c.id === selectedId) ?? skillCategories[0];

  return (
    <div>
      <PageHeader
        title="Skill Building Lab"
        description="Pick a category to focus on. You’ll get a realistic scenario to reason through, and honest feedback on your answer." />
      

      <h2 className="mb-3 text-sm font-semibold text-ink">Categories</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3" role="group" aria-label="Skill categories">
        {skillCategories.map((c) => {
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setSelectedId(c.id);
                reset();
              }}
              className={`flex flex-col items-start rounded-xl border p-5 text-left transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 ${
              active ?
              'border-forest-600 bg-forest-50' :
              'border-line bg-surface hover:border-forest-200'}`
              }>
              
              <c.icon className={`h-5 w-5 ${active ? 'text-forest-800' : 'text-forest-700'}`} />
              <span className="mt-3 text-sm font-semibold text-ink">{c.name}</span>
              <span className="mt-1 text-xs leading-relaxed text-ink-muted">{c.description}</span>
            </button>);

        })}
      </div>

      <div className="mt-8">
        <Button onClick={run} loading={status === 'loading'}>
          {status === 'loading' ? 'Generating…' : `Generate ${selected.name.toLowerCase()} scenario`}
        </Button>
      </div>

      {status === 'success' &&
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="mt-8 max-w-3xl rounded-xl border border-line bg-surface p-6"
        aria-live="polite">
        
          <p className="text-sm font-medium text-forest-700">{selected.name} scenario</p>
          <p className="mt-2 font-serif text-lg leading-relaxed text-ink">{selected.scenario}</p>
          <label htmlFor="answer" className="mt-6 block text-sm font-medium text-ink">
            Your answer
          </label>
          <textarea
          id="answer"
          rows={4}
          placeholder="Talk through your reasoning step by step…"
          className="mt-1.5 block w-full rounded-lg border border-line bg-canvas px-3.5 py-3 text-sm placeholder:text-ink-faint focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-100" />
        
          <Button className="mt-4">Submit for feedback</Button>
        </motion.section>
      }
    </div>);

}