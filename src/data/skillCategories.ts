import {
  CodeIcon,
  MessageSquareIcon,
  NetworkIcon,
  ServerIcon,
  SettingsIcon,
  ShieldCheckIcon,
  type LucideIcon } from
'lucide-react';

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  scenario: string;
}

export const skillCategories: SkillCategory[] = [
{
  id: 'coding',
  name: 'Coding',
  description: 'Solve real-world coding problems.',
  icon: CodeIcon,
  scenario:
  'A teammate’s Python script that processes daily sales CSVs has started taking 40 minutes instead of 4. Walk through how you would find the bottleneck and what you would try first.'
},
{
  id: 'networking',
  name: 'Networking',
  description: 'Troubleshoot network issues.',
  icon: NetworkIcon,
  scenario:
  'Users on the third floor can reach internal sites but not the public internet. Other floors are fine. Describe your troubleshooting steps in order.'
},
{
  id: 'security',
  name: 'Security',
  description: 'Find and fix vulnerabilities.',
  icon: ShieldCheckIcon,
  scenario:
  'An employee reports an email from “IT Support” asking them to re-enter their password on a linked page. What do you do in the first 30 minutes?'
},
{
  id: 'systems',
  name: 'Systems',
  description: 'Manage and configure systems.',
  icon: ServerIcon,
  scenario:
  'A Linux web server’s disk is at 98% and the site is slowing down. Explain how you would find what’s using the space and fix it safely.'
},
{
  id: 'communication',
  name: 'Communication',
  description: 'Write clear, professional responses.',
  icon: MessageSquareIcon,
  scenario:
  'A non-technical manager asks why a planned outage will take four hours. Write a short, clear reply that sets expectations.'
},
{
  id: 'general',
  name: 'General IT',
  description: 'Apply core IT concepts to scenarios.',
  icon: SettingsIcon,
  scenario:
  'A new hire’s laptop can’t connect to the office printer, but everyone else can. List the checks you’d run and explain why.'
}];