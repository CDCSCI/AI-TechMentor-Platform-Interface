import React from 'react';
import { Outlet } from 'react-router-dom';
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
    </div>);

}