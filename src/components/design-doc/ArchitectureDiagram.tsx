import React from 'react';
import { ArrowLeftRightIcon } from 'lucide-react';
import { architectureLayers } from '../../data/systemDesign';

export function ArchitectureDiagram() {
  return (
    <figure>
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {architectureLayers.map((layer, i) =>
        <React.Fragment key={layer.name}>
            {i > 0 &&
          <div className="flex items-center justify-center" aria-hidden="true">
                <ArrowLeftRightIcon className="h-5 w-5 rotate-90 text-ink md:rotate-0" />
              </div>
          }
            <div className={`rounded-xl border px-4 py-4 ${i === 1 ? 'border-ink bg-forest-50' : 'border-line'}`}>
              <p className="font-semibold text-ink">{layer.name}</p>
              <p className="text-xs text-ink-faint">{layer.tech}</p>
              <ul className="mt-3 space-y-1.5">
                {layer.parts.map((p) =>
              <li key={p} className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-[12px] text-ink">
                    {p}
                  </li>
              )}
              </ul>
            </div>
          </React.Fragment>
        )}
      </div>
      <figcaption className="mt-4 text-xs text-ink-faint">
        Figure 3. System architecture. The client never calls the AI provider directly; all AI requests pass through
        the server so profile data and API keys stay protected.
      </figcaption>
    </figure>);

}