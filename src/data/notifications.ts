export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  path: string;
}

export const notifications: AppNotification[] = [
{
  id: 'n1',
  title: 'New Skill Lab scenarios',
  body: 'Every category now has a second scenario to practice.',
  time: '2h ago',
  path: '/app/skills'
},
{
  id: 'n2',
  title: 'Keep your streak going',
  body: 'You practiced three interviews this fall. Try a case study next.',
  time: 'Yesterday',
  path: '/app/interviews'
},
{
  id: 'n3',
  title: 'Got an offer?',
  body: 'Compare it across cities on real take-home pay.',
  time: '3 days ago',
  path: '/app/relocate'
}];