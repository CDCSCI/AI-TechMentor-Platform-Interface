export const designDocInfo = {
  title: 'System Design Document',
  project: 'AI.TechMentor',
  course: 'IST 440W',
  author: 'Chelsea Davis',
  date: 'November 15, 2026'
};

export const level0 = {
  name: 'AI.TechMentor',
  purpose: 'Guide an early-career technology candidate from an unfinished profile to a job offer.',
  inputs: [
  'Resume, classwork & target role',
  'Job descriptions & key skills',
  'Career goals & timeframe',
  'Skill Lab & spoken interview answers',
  'Job offers, salaries & cities'],

  outputs: [
  'Tailored resume suggestions',
  'Skill scenarios & feedback',
  'Milestone career roadmap',
  'Interview feedback & session history',
  'Relocation verdict & break-even salary']

};

export interface Level1Function {
  id: string;
  name: string;
  screen: string;
  description: string;
  inputs: string;
  outputs: string;
}

export const level1Functions: Level1Function[] = [
{
  id: '1.0',
  name: 'Manage Profile',
  screen: 'Profile & Experiences',
  description: 'Capture the candidate’s background once so every other function can personalize its output.',
  inputs: 'Resume text, unlisted classwork or projects, target role',
  outputs: 'Stored candidate profile'
},
{
  id: '2.0',
  name: 'Track Progress',
  screen: 'Home Dashboard',
  description: 'Show profile completion, the next best step, and one-click access to every tool.',
  inputs: 'Profile status, recent activity',
  outputs: 'Next-step recommendation, progress bar'
},
{
  id: '3.0',
  name: 'Tailor Resume',
  screen: 'Resume',
  description: 'Rewrite resume content to match a specific job posting while staying grounded in real experience.',
  inputs: 'Job description, key skills, profile',
  outputs: 'Suggested resume rewrites'
},
{
  id: '4.0',
  name: 'Build Skills',
  screen: 'Skill Lab',
  description: 'Generate realistic scenarios across six IT categories and give honest feedback on answers.',
  inputs: 'Selected category, written answer',
  outputs: 'Scenario, answer feedback'
},
{
  id: '5.0',
  name: 'Plan Career',
  screen: 'Action Plan',
  description: 'Turn a goal and timeframe into a milestone-based roadmap toward the target role.',
  inputs: 'Goal category, timeframe, goal description',
  outputs: 'Milestone roadmap'
},
{
  id: '6.0',
  name: 'Practice Interviews',
  screen: 'Mock Interviews',
  description: 'Run live interviews with an AI interviewer and save each session with a rating.',
  inputs: 'Interview type, spoken answers',
  outputs: 'Questions, feedback, saved session'
},
{
  id: '7.0',
  name: 'Compare Relocation',
  screen: 'Relocate',
  description: 'Convert an offer into take-home pay and real living costs across two cities.',
  inputs: 'Current & offer city, salaries, housing type',
  outputs: 'Monthly budget, break-even salary, verdict'
}];


export const architectureLayers = [
{
  name: 'Client',
  tech: 'React + TypeScript web app',
  parts: ['App shell & routing', 'Screen forms & validation', 'Relocation calculator', 'Interview room (mic & audio)']
},
{
  name: 'Application server',
  tech: 'REST API',
  parts: ['API gateway & authentication', 'Profile & session service', 'AI orchestrator (prompt builder)', 'Response parser & safety checks']
},
{
  name: 'Data & external services',
  tech: 'Managed services',
  parts: ['Profile & session database', 'LLM provider API', 'Speech-to-text / text-to-speech', 'Cost-of-living & tax dataset']
}];


export const operationalSteps = [
{ title: 'Get started', detail: 'The candidate opens AI.TechMentor and signs up or logs in.' },
{ title: 'Build the profile', detail: 'If the profile is incomplete, they add their resume, unlisted experience, and target role.' },
{ title: 'See the next step', detail: 'The Home dashboard shows progress and the single most useful next action.' },
{ title: 'Use a tool', detail: 'They tailor a resume, practice in Skill Lab, build an action plan, run a mock interview, or compare relocation offers.' },
{ title: 'Review feedback', detail: 'Results and feedback are saved, so improvement is visible over time.' },
{ title: 'Decide', detail: 'If not ready to apply, they return to the dashboard and keep practicing. If ready, they apply, interview, and receive an offer.' }];