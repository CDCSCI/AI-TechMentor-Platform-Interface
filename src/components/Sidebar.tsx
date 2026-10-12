import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { LogoMark } from './LogoMark';
import { navItems } from '../data/navigation';
import { useLogo } from '../contexts/LogoContext';

export function Sidebar() {
  const { variant } = useLogo();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-forest-900 px-4 py-6 md:flex">
      <div className="px-2">
        <Logo variant={variant} />
      </div>

      <nav aria-label="Main" className="mt-10 flex flex-col gap-1">
        {navItems.map((item) =>
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/app'}
          className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-300 ${
          isActive ?
          'bg-white/10 text-white' :
          'text-forest-100/75 hover:bg-white/5 hover:text-white'}`

          }>
          
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        )}
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-xl border border-white/10 px-4 py-4">
        <LogoMark variant={variant} size={22} />
        <p className="text-xs leading-snug text-forest-100/80">
          Small steps.
          <br />
          Big career moves.
        </p>
      </div>
    </aside>);

}