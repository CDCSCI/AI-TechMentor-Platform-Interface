import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PaletteIcon } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function AppShell() {
  return (
    <div className="flex min-h-screen w-full bg-canvas">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="w-full max-w-5xl flex-1 px-5 py-8 md:px-10 md:py-10">
          <Outlet />
        </main>
      </div>

      <Link
        to="/"
        className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-forest-900 shadow-sm transition-[border-color,background-color] duration-150 ease-out hover:border-forest-200 hover:bg-forest-50">
        
        <PaletteIcon className="h-4 w-4" />
        Logo options
      </Link>
    </div>);

}