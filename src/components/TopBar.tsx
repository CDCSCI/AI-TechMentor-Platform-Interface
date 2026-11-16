import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BellIcon, ChevronDownIcon, PaletteIcon, RotateCcwIcon, UserIcon } from 'lucide-react';
import { Logo } from './Logo';
import { navItems } from '../data/navigation';
import { currentUser } from '../data/user';
import { notifications } from '../data/notifications';
import { useLogo } from '../contexts/LogoContext';
import { useCareer } from '../contexts/CareerContext';
import { useDismiss } from '../hooks/useDismiss';

type Menu = 'notifications' | 'account' | null;

const popover = {
  initial: { opacity: 0, scale: 0.96, y: -4 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -4 },
  transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
};

const menuItemClass =
'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors duration-150 ease-out hover:bg-forest-50 focus-visible:bg-forest-50 focus-visible:outline-none';

export function TopBar() {
  const { variant } = useLogo();
  const { resetDemo } = useCareer();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState<Menu>(null);
  const [unread, setUnread] = useState(true);
  const menusRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setMenu(null), []);
  useDismiss(menusRef, menu !== null, close);

  useEffect(() => {
    close();
    navRef.current?.
    querySelector('[aria-current="page"]')?.
    scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [pathname, close]);

  const toggle = (m: Exclude<Menu, null>) => {
    setMenu((cur) => cur === m ? null : m);
    if (m === 'notifications') setUnread(false);
  };

  return (
    <div className="sticky top-0 z-20 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-5 md:justify-end md:px-10">
        <div className="md:hidden">
          <Logo variant={variant} tone="onLight" size={24} />
        </div>
        <div ref={menusRef} className="relative flex items-center gap-2">
          <button
            type="button"
            aria-label={unread ? 'Notifications, 3 unread' : 'Notifications'}
            aria-haspopup="true"
            aria-expanded={menu === 'notifications'}
            onClick={() => toggle('notifications')}
            className="relative rounded-full p-2 text-ink-muted transition-colors duration-150 ease-out hover:bg-forest-50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500">
            
            <BellIcon className="h-5 w-5" />
            {unread && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-signal ring-2 ring-canvas" />}
          </button>
          <button
            type="button"
            aria-label={`Account menu for ${currentUser.fullName}`}
            aria-haspopup="menu"
            aria-expanded={menu === 'account'}
            onClick={() => toggle('account')}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors duration-150 ease-out hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500">
            
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-800 text-xs font-semibold text-white">
              {currentUser.initials}
            </span>
            <span className="hidden text-sm font-medium text-ink sm:inline">{currentUser.fullName}</span>
            <ChevronDownIcon className="h-4 w-4 text-ink-faint" />
          </button>

          <AnimatePresence>
            {menu === 'notifications' &&
            <motion.div
              {...popover}
              style={{ transformOrigin: 'top right' }}
              className="absolute right-0 top-12 w-[min(22rem,calc(100vw-2.5rem))] rounded-xl border border-line bg-surface p-2 shadow-lg">
              
                <p className="px-3 pb-1 pt-2 text-sm font-semibold text-ink">Notifications</p>
                <ul>
                  {notifications.map((n) =>
                <li key={n.id}>
                      <Link to={n.path} className="block rounded-lg px-3 py-2.5 transition-colors duration-150 ease-out hover:bg-forest-50">
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="text-sm font-medium text-ink">{n.title}</span>
                          <span className="shrink-0 text-xs text-ink-faint">{n.time}</span>
                        </span>
                        <span className="mt-0.5 block text-sm text-ink-muted">{n.body}</span>
                      </Link>
                    </li>
                )}
                </ul>
              </motion.div>
            }

            {menu === 'account' &&
            <motion.div
              {...popover}
              role="menu"
              aria-label="Account"
              style={{ transformOrigin: 'top right' }}
              className="absolute right-0 top-12 w-60 rounded-xl border border-line bg-surface p-1.5 shadow-lg">
              
                <Link to="/app/profile" role="menuitem" className={menuItemClass}>
                  <UserIcon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                  Profile & Experiences
                </Link>
                <Link to="/logos" role="menuitem" className={menuItemClass}>
                  <PaletteIcon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                  Brand & logo options
                </Link>
                <div className="my-1 h-px bg-line" />
                <button
                type="button"
                role="menuitem"
                onClick={() => {
                  resetDemo();
                  close();
                }}
                className={menuItemClass}>
                
                  <RotateCcwIcon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                  Reset demo data
                </button>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>

      <nav ref={navRef} aria-label="Main" className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden">
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