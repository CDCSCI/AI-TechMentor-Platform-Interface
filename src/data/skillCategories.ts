import {
  CodeIcon,
  MessageSquareIcon,
  NetworkIcon,
  ServerIcon,
  SettingsIcon,
  ShieldCheckIcon,
  type LucideIcon } from
'lucide-react';

export interface RubricItem {
  label: string;
  tip: string;
  keywords: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  scenarios: string[];
  rubric: RubricItem[];
}

export const skillCategories: SkillCategory[] = [
{
  id: 'coding',
  name: 'Coding',
  description: 'Solve real-world coding problems.',
  icon: CodeIcon,
  scenarios: [
  'A teammate’s Python script that processes daily sales CSVs has started taking 40 minutes instead of 4. Walk through how you would find the bottleneck and what you would try first.',
  'An API endpoint you wrote returns the right data, but it takes 6 seconds under load. How would you investigate and speed it up?'],

  rubric: [
  { label: 'Measure before changing anything', tip: 'Profile or time the code first so you fix the real bottleneck.', keywords: ['profile', 'profiler', 'cprofile', 'measure', 'timing', 'time it', 'benchmark', 'log'] },
  { label: 'Check what changed in the input', tip: 'Ask whether the data grew or changed shape before blaming the code.', keywords: ['data size', 'input', 'rows', 'grew', 'bigger', 'volume', 'changed', 'load'] },
  { label: 'Look at the algorithm or queries', tip: 'Look for nested loops, repeated work, or slow queries.', keywords: ['loop', 'nested', 'complexity', 'algorithm', 'query', 'index', 'cache', 'vectoriz', 'pandas', 'n+1'] },
  { label: 'Verify the fix', tip: 'Re-run the timing and tests to prove the fix worked and nothing broke.', keywords: ['test', 'verify', 'compare', 'regression', 'confirm', 're-run', 'rerun'] }]

},
{
  id: 'networking',
  name: 'Networking',
  description: 'Troubleshoot network issues.',
  icon: NetworkIcon,
  scenarios: [
  'Users on the third floor can reach internal sites but not the public internet. Other floors are fine. Describe your troubleshooting steps in order.',
  'A remote employee’s VPN connects, but they can’t open the internal file share. Walk through how you would narrow down the problem.'],

  rubric: [
  { label: 'Scope the problem', tip: 'Confirm who is affected and what still works before touching anything.', keywords: ['scope', 'isolate', 'other users', 'who is affected', 'only', 'floor', 'which users', 'narrow'] },
  { label: 'Check the physical and switch layer', tip: 'Rule out cables, ports, and switch or access point issues.', keywords: ['cable', 'switch', 'port', 'link light', 'physical', 'access point', 'uplink'] },
  { label: 'Check IP, gateway, and DHCP', tip: 'Verify addressing, the default gateway, and DHCP leases.', keywords: ['ip', 'dhcp', 'gateway', 'subnet', 'ipconfig', 'ping', 'route'] },
  { label: 'Check DNS', tip: 'Test whether names resolve as well as raw IPs.', keywords: ['dns', 'nslookup', 'resolve', 'dig'] },
  { label: 'Check firewall and proxy rules', tip: 'Look for firewall, ACL, or proxy rules that block traffic.', keywords: ['firewall', 'proxy', 'acl', 'rule', 'blocked', 'split tunnel'] }]

},
{
  id: 'security',
  name: 'Security',
  description: 'Find and fix vulnerabilities.',
  icon: ShieldCheckIcon,
  scenarios: [
  'An employee reports an email from “IT Support” asking them to re-enter their password on a linked page. What do you do in the first 30 minutes?',
  'Monitoring shows dozens of failed logins on one account from an unfamiliar country overnight. What are your first steps?'],

  rubric: [
  { label: 'Contain the threat', tip: 'Block the sender, link, or account first to stop the spread.', keywords: ['contain', 'block', 'isolate', 'disable', 'quarantine', 'lock'] },
  { label: 'Secure credentials', tip: 'Reset affected passwords and confirm MFA is on.', keywords: ['reset', 'password', 'mfa', 'credential', 'two-factor', '2fa'] },
  { label: 'Escalate and report', tip: 'Report to the security team and follow the incident process.', keywords: ['report', 'escalate', 'security team', 'soc', 'incident', 'ticket'] },
  { label: 'Investigate the evidence', tip: 'Check headers, sign-in logs, and the linked domain.', keywords: ['header', 'sender', 'domain', 'logs', 'sign-in', 'investigate', 'ip address'] },
  { label: 'Warn others', tip: 'Alert other users who may have received the same thing.', keywords: ['notify', 'warn', 'alert', 'other users', 'awareness', 'everyone'] }]

},
{
  id: 'systems',
  name: 'Systems',
  description: 'Manage and configure systems.',
  icon: ServerIcon,
  scenarios: [
  'A Linux web server’s disk is at 98% and the site is slowing down. Explain how you would find what’s using the space and fix it safely.',
  'A Windows server reboots unexpectedly every few days. How would you find the cause?'],

  rubric: [
  { label: 'Find the cause with the right tools', tip: 'Use tools like df, du, or Event Viewer to find the real cause.', keywords: ['du', 'df', 'ncdu', 'disk usage', 'event viewer', 'largest', 'top', 'monitor'] },
  { label: 'Check the logs', tip: 'Logs often explain both the symptom and the cause.', keywords: ['log', 'logs', '/var/log', 'journal', 'event log', 'syslog'] },
  { label: 'Fix it safely', tip: 'Back up or archive before deleting or changing anything.', keywords: ['backup', 'back up', 'archive', 'compress', 'safely', 'snapshot', 'maintenance window'] },
  { label: 'Prevent it from recurring', tip: 'Add log rotation, alerts, or patches so it doesn’t happen again.', keywords: ['rotate', 'logrotate', 'alert', 'threshold', 'cron', 'patch', 'update', 'prevent'] }]

},
{
  id: 'communication',
  name: 'Communication',
  description: 'Write clear, professional responses.',
  icon: MessageSquareIcon,
  scenarios: [
  'A non-technical manager asks why a planned outage will take four hours. Write a short, clear reply that sets expectations.',
  'You found a bug that will delay a release by two days. Write a short update to the project lead.'],

  rubric: [
  { label: 'Explain why', tip: 'Give the reason in plain language.', keywords: ['because', 'reason', 'so that', 'in order to', 'upgrade', 'migration', 'bug', 'fix'] },
  { label: 'State the impact', tip: 'Say what people won’t be able to do.', keywords: ['impact', 'affect', 'unavailable', 'downtime', 'delay', 'won’t be able', "won't be able", 'offline'] },
  { label: 'Give the timing', tip: 'Include clear times or dates.', keywords: ['pm', 'am', 'hours', 'days', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'schedule', 'by'] },
  { label: 'Offer next steps and contact', tip: 'End with what happens next and who to ask.', keywords: ['contact', 'questions', 'update', 'reach', 'let me know', 'next step', 'follow up'] }]

},
{
  id: 'general',
  name: 'General IT',
  description: 'Apply core IT concepts to scenarios.',
  icon: SettingsIcon,
  scenarios: [
  'A new hire’s laptop can’t connect to the office printer, but everyone else can. List the checks you’d run and explain why.',
  'A user says their computer has been “really slow” since yesterday. How would you troubleshoot it?'],

  rubric: [
  { label: 'Compare with what works', tip: 'Compare the affected device with a working one.', keywords: ['everyone else', 'others', 'working', 'compare', 'since yesterday', 'what changed'] },
  { label: 'Check drivers and updates', tip: 'Missing drivers or recent updates are common causes.', keywords: ['driver', 'install', 'update', 'patch'] },
  { label: 'Check the connection', tip: 'Confirm the device is on the right network.', keywords: ['network', 'wifi', 'wi-fi', 'ip', 'connected', 'vlan'] },
  { label: 'Check resources and permissions', tip: 'Look at permissions, queues, or CPU, memory, and disk.', keywords: ['permission', 'queue', 'spooler', 'task manager', 'cpu', 'memory', 'disk', 'restart'] }]

}];