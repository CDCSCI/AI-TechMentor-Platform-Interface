export interface MilestoneTemplate {
  title: string;
  detail: string;
  tool?: {label: string;path: string;};
}

const resume = { label: 'Tailor resume', path: '/app/resume' };
const skills = { label: 'Open Skill Lab', path: '/app/skills' };
const interviews = { label: 'Practice interview', path: '/app/interviews' };
const relocate = { label: 'Compare offers', path: '/app/relocate' };
const profile = { label: 'Update profile', path: '/app/profile' };

/** Tokens: {role}, {focus}, {cert} */
export const planTemplates: Record<string, MilestoneTemplate[]> = {
  Career: [
  { title: 'Sharpen your materials', detail: 'Tailor your resume to three {role} postings and close the biggest keyword gaps.', tool: resume },
  { title: 'Build proof of skill', detail: 'Complete two Skill Lab scenarios a week in {focus} and save your best answers as interview stories.', tool: skills },
  { title: 'Apply and interview', detail: 'Apply to 10–15 {role} openings and run a mock interview before every real one.', tool: interviews },
  { title: 'Land and grow', detail: 'Compare offers on real take-home pay, then set a 90-day learning goal in {focus} for the new role.', tool: relocate }],

  Education: [
  { title: 'Choose the right program', detail: 'Shortlist three programs that lead to {role} roles and compare cost, format, and graduate outcomes.' },
  { title: 'Cover the prerequisites', detail: 'Check where you stand in {focus} with Skill Lab and close the gaps before classes start.', tool: skills },
  { title: 'Learn by building', detail: 'Turn each course into a portfolio project and add it to your profile as you finish it.', tool: profile },
  { title: 'Turn it into a job', detail: 'Rewrite your resume around your new projects and start applying to {role} roles.', tool: resume }],

  Certification: [
  { title: 'Commit to {cert}', detail: 'Book the exam date now so a real deadline drives your study plan.' },
  { title: 'Study in short cycles', detail: 'Study 5–7 hours a week and use Skill Lab {focus} scenarios to apply each topic.', tool: skills },
  { title: 'Practice under exam conditions', detail: 'Take timed practice exams until you score 85% or higher twice in a row.' },
  { title: 'Pass and promote it', detail: 'Add {cert} to your profile and resume, then target {role} postings that ask for it.', tool: resume }],

  'Skill growth': [
  { title: 'Find your baseline', detail: 'Answer three Skill Lab scenarios in {focus} and note which steps you missed.', tool: skills },
  { title: 'Practice deliberately', detail: 'Work on your two weakest areas every week until your Skill Lab feedback reads Strong.' },
  { title: 'Build something real', detail: 'Ship a small {focus} project that hiring managers for {role} roles would care about.' },
  { title: 'Show the growth', detail: 'Add the project to your profile and walk through it in a technical mock interview.', tool: interviews }]

};

export const planPeriods: Record<string, string[]> = {
  '0–6 months': ['Weeks 1–4', 'Months 2–3', 'Months 4–5', 'Month 6'],
  '6–12 months': ['Month 1', 'Months 2–4', 'Months 5–9', 'Months 10–12'],
  '1–3 years': ['Months 1–3', 'Months 4–12', 'Year 2', 'Year 3'],
  '3–5 years': ['Months 1–3', 'Months 4–12', 'Years 2–3', 'Years 4–5']
};