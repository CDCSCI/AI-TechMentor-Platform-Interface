import { planPeriods, planTemplates, type MilestoneTemplate } from '../data/planTemplates';
import { extractSkills } from './resumeTailoring';

export interface PlannedMilestone extends MilestoneTemplate {
  period: string;
}

export interface ActionPlanResult {
  role: string;
  focus: string;
  cert: string;
  milestones: PlannedMilestone[];
}

function pickCertification(text: string): string {
  const t = text.toLowerCase();
  if (/secur|cyber|soc\b|siem/.test(t)) return 'CompTIA Security+';
  if (/network|cisco|vlan|tcp/.test(t)) return 'CompTIA Network+';
  if (/cloud|aws|azure/.test(t)) return 'AWS Certified Cloud Practitioner';
  if (/data|sql|analyst|python|tableau|excel/.test(t)) return 'Google Data Analytics Certificate';
  return 'CompTIA A+';
}

export function buildActionPlan({
  category,
  timeframe,
  goals,
  profileRole





}: {category: string;timeframe: string;goals: string;profileRole: string;}): ActionPlanResult {
  const role = profileRole.trim() || 'entry-level tech';
  const context = `${goals} ${profileRole}`;
  const focus = extractSkills(context)[0]?.toLowerCase() ?? 'your core technical skills';
  const cert = pickCertification(context);
  const periods = planPeriods[timeframe] ?? planPeriods['0–6 months'];
  const fill = (s: string) => s.replace(/\{role\}/g, role).replace(/\{focus\}/g, focus).replace(/\{cert\}/g, cert);

  const templates = planTemplates[category] ?? planTemplates.Career;
  return {
    role,
    focus,
    cert,
    milestones: templates.map((t, i) => ({ ...t, title: fill(t.title), detail: fill(t.detail), period: periods[i] }))
  };
}