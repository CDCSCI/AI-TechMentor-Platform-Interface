import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCwIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { FieldTextarea } from '../components/FieldTextarea';
import { ErrorNote } from '../components/ErrorNote';
import { SkillFeedbackPanel } from '../components/skill-lab/SkillFeedbackPanel';
import { useFakeRequest } from '../hooks/useFakeRequest';
import { skillCategories } from '../data/skillCategories';
import { evaluateSkillAnswer, MIN_ANSWER_WORDS } from '../utils/skillFeedback';
import { wordCount } from '../utils/text';

export function SkillLab() {
  const [selectedId, setSelectedId] = useState(skillCategories[0].id);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [answerError, setAnswerError] = useState('');
  const scenario = useFakeRequest();
  const review = useFakeRequest(1200);

  const selected = skillCategories.find((c) => c.id === selectedId) ?? skillCategories[0];
  const scenarioText = selected.scenarios[scenarioIndex % selected.scenarios.length];
  const feedback = useMemo(
    () => review.status === 'success' ? evaluateSkillAnswer(selected.rubric, submitted) : null,
    [review.status, selected.rubric, submitted]
  );

  const clearAnswer = () => {
    setAnswer('');
    setSubmitted('');
    setAnswerError('');
    review.reset();
  };

  const pickCategory = (id: string) => {
    setSelectedId(id);
    setScenarioIndex(0);
    scenario.reset();
    clearAnswer();
  };

  const nextScenario = () => {
    setScenarioIndex((i) => i + 1);
    clearAnswer();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount(answer) < MIN_ANSWER_WORDS) {
      setAnswerError(`Write at least ${MIN_ANSWER_WORDS} words so there’s enough to give feedback on.`);
      return;
    }
    setAnswerError('');
    setSubmitted(answer);
    review.run();
  };

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
              onClick={() => pickCategory(c.id)}
              className={`flex flex-col items-start rounded-xl border p-5 text-left transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 ${
              active ? 'border-forest-600 bg-forest-50' : 'border-line bg-surface hover:border-forest-200'}`
              }>
              
              <c.icon className="h-5 w-5 text-forest-800" />
              <span className="mt-3 text-sm font-semibold text-ink">{c.name}</span>
              <span className="mt-1 text-xs leading-relaxed text-ink-muted">{c.description}</span>
            </button>);

        })}
      </div>

      {scenario.status !== 'success' &&
      <div className="mt-8 flex max-w-3xl flex-col gap-4">
          <div>
            <Button onClick={scenario.run} loading={scenario.status === 'loading'}>
              {scenario.status === 'loading' ? 'Generating…' : `Generate ${selected.name.toLowerCase()} scenario`}
            </Button>
          </div>
          {scenario.status === 'error' && <ErrorNote onRetry={scenario.run} />}
        </div>
      }

      {scenario.status === 'success' &&
      <motion.section
        key={`${selectedId}-${scenarioIndex}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="mt-8 max-w-3xl rounded-xl border border-line bg-surface p-6"
        aria-live="polite">
        
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-ink-muted">
              {selected.name} scenario {scenarioIndex % selected.scenarios.length + 1} of {selected.scenarios.length}
            </p>
            <button
            type="button"
            onClick={nextScenario}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-ink-muted transition-colors duration-150 ease-out hover:bg-forest-50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500">
            
              <RefreshCwIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Different scenario
            </button>
          </div>
          <p className="mt-2 font-serif text-lg leading-relaxed text-ink">{scenarioText}</p>

          <form onSubmit={submit} noValidate className="mt-6">
            <FieldTextarea
            label="Your answer"
            placeholder="Talk through your reasoning step by step: first…, then…, finally…"
            rows={6}
            value={answer}
            onChange={(v) => {
              setAnswer(v);
              if (answerError) setAnswerError('');
            }}
            error={answerError} />
          
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button type="submit" loading={review.status === 'loading'}>
                {review.status === 'loading' ? 'Reviewing…' : feedback ? 'Resubmit for feedback' : 'Submit for feedback'}
              </Button>
            </div>
            {review.status === 'error' &&
          <div className="mt-4">
                <ErrorNote onRetry={review.run} />
              </div>
          }
          </form>

          {feedback && <SkillFeedbackPanel feedback={feedback} />}
        </motion.section>
      }
    </div>);

}