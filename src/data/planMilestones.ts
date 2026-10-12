export interface Milestone {
  period: string;
  title: string;
  detail: string;
}

export const planMilestones: Milestone[] = [
{
  period: 'Months 1–3',
  title: 'Build your foundation',
  detail: 'Earn CompTIA Security+ and finish two Skill Lab security scenarios each week.'
},
{
  period: 'Months 4–9',
  title: 'Get hands-on experience',
  detail: 'Land a SOC analyst or IT support role in the DC area. Keep a log of incidents you handle.'
},
{
  period: 'Year 2',
  title: 'Specialize',
  detail: 'Pick a focus like cloud security or incident response and add a matching certification.'
},
{
  period: 'Years 3–5',
  title: 'Step up to senior',
  detail: 'Aim for security engineer roles at $150k+. Mentor junior analysts to show leadership.'
}];