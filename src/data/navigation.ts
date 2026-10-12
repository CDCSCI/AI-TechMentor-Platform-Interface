import {
  ClipboardCheckIcon,
  CodeIcon,
  FileTextIcon,
  HouseIcon,
  MessageCircleIcon,
  UserIcon,
  type LucideIcon } from
'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  description: string;
}

export const navItems: NavItem[] = [
{ label: 'Home', path: '/app', icon: HouseIcon, description: '' },
{
  label: 'Profile & Experiences',
  path: '/app/profile',
  icon: UserIcon,
  description: 'Add your resume, classwork, and target role.'
},
{
  label: 'Resume',
  path: '/app/resume',
  icon: FileTextIcon,
  description: 'Tailor your resume to a specific job description.'
},
{
  label: 'Skill Lab',
  path: '/app/skills',
  icon: CodeIcon,
  description: 'Practice scenario-based skill checks by category.'
},
{
  label: 'Action Plan',
  path: '/app/plan',
  icon: ClipboardCheckIcon,
  description: 'Get an adaptive roadmap toward your target role.'
},
{
  label: 'Mock Interviews',
  path: '/app/interviews',
  icon: MessageCircleIcon,
  description: 'Practice live with feedback on content and voice.'
}];