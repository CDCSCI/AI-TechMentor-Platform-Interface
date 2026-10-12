import React from 'react';
import { NavLink } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from 'lucide-react';
import { Logo } from './Logo';
import { navItems } from '../data/navigation';
import { currentUser } from '../data/user';
import { useLogo } from '../contexts/LogoContext';

export function TopBar() {
  const { variant } = useLogo();

  return (
    <div className="sticky top-0 z-10 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-5 md:justify-end md:px-10">
        <div className="md:hidden">
          <Logo variant={variant} tone="onLight" size={24} />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-full p-2 text-ink-muted transition-colors duration-150 ease-out hover:bg-forest-50 hover:text-ink">
            
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-forest-500 ring-2 ring-canvas" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors duration-150 ease-out hover:bg-forest-50">
            
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-800 text-xs font-semibold text-white">
              {currentUser.initials}
            </span>
            <span className="hidden text-sm font-medium text-ink sm:inline">{currentUser.fullName}</span>
            <ChevronDownIcon className="h-4 w-4 text-ink-faint" />
          </button>
        </div>
      </div>

      <nav aria-label="Main" className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden">
        {navItems.map((item) =>
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/app'}
          className={({ isActive }) =>
          `whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 ease-out ${
          isActive ? 'bg-forest-800 text-white' : 'text-ink-muted hover:bg-forest-50'}`

          }>
          
            {item.label}
          </NavLink>
        )}
      </nav>
    </div>);

}