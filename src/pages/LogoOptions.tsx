import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleCheckIcon } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LogoMark } from '../components/LogoMark';
import { Button } from '../components/Button';
import { logoConcepts } from '../data/logoConcepts';
import { useLogo } from '../contexts/LogoContext';
import type { LogoVariant } from '../types/logo';

const iconSizes = [
{ box: 'h-14 w-14 rounded-2xl', mark: 32, label: 'App icon' },
{ box: 'h-10 w-10 rounded-xl', mark: 22, label: 'Sidebar' },
{ box: 'h-7 w-7 rounded-md', mark: 16, label: 'Favicon' }];


export function LogoOptions() {
  const { variant, setVariant } = useLogo();
  const navigate = useNavigate();

  const preview = (id: LogoVariant) => {
    setVariant(id);
    navigate('/app');
  };

  return (
    <div className="min-h-screen w-full bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-16">
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">Logo options</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              Four refined directions for AI TechMentor. Each one is shown on the brand green, on a light
              background, and at small sizes. Choose one to see it throughout the product.
            </p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/app')}>
            Open the product
          </Button>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {logoConcepts.map((concept) => {
            const selected = concept.id === variant;
            return (
              <article
                key={concept.id}
                className={`flex flex-col overflow-hidden rounded-2xl border bg-surface transition-[border-color,box-shadow] duration-200 ease-out ${
                selected ? 'border-forest-600 ring-1 ring-forest-600' : 'border-line'}`
                }>
                
                <div className="flex h-52 items-center justify-center bg-forest-900">
                  <Logo variant={concept.id} size={48} textClassName="text-3xl" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line px-6 py-5">
                  <Logo variant={concept.id} tone="onLight" size={28} textClassName="text-lg" />
                  <div className="flex items-end gap-4">
                    {iconSizes.map((s) =>
                    <div key={s.label} className="flex flex-col items-center gap-1.5">
                        <span className={`flex items-center justify-center bg-forest-900 ${s.box}`}>
                          <LogoMark variant={concept.id} size={s.mark} />
                        </span>
                        <span className="text-[10px] text-ink-faint">{s.label}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-6 py-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-serif text-2xl font-semibold text-ink">{concept.name}</h2>
                    {selected &&
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700">
                        <CircleCheckIcon className="h-4 w-4" />
                        In use
                      </span>
                    }
                  </div>
                  <p className="mt-1 text-sm font-medium text-forest-700">{concept.idea}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{concept.rationale}</p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <Button onClick={() => preview(concept.id)}>Preview in app</Button>
                    {!selected &&
                    <Button variant="secondary" showArrow={false} onClick={() => setVariant(concept.id)}>
                        Use this logo
                      </Button>
                    }
                  </div>
                </div>
              </article>);

          })}
        </div>
      </div>
    </div>);

}