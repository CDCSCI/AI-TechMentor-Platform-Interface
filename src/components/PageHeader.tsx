import React from 'react';

export function PageHeader({ title, description }: {title: string;description: string;}) {
  return (
    <header className="mb-8 max-w-2xl">
      <h1 className="font-serif text-3xl font-semibold text-ink md:text-[2.25rem] md:leading-tight">
        {title}
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{description}</p>
    </header>);

}