import type { CandidateProfile } from '../types/career';
import { escapeRegExp } from './text';

const skillLexicon: {name: string;patterns: string[];}[] = [
{ name: 'Python', patterns: ['python'] },
{ name: 'SQL', patterns: ['sql', 'mysql', 'postgres', 'postgresql'] },
{ name: 'Java', patterns: ['java'] },
{ name: 'JavaScript', patterns: ['javascript', 'typescript', 'node.js', 'nodejs'] },
{ name: 'React', patterns: ['react'] },
{ name: 'APIs', patterns: ['api', 'apis', 'rest'] },
{ name: 'Git', patterns: ['git', 'github'] },
{ name: 'Linux', patterns: ['linux', 'ubuntu', 'bash'] },
{ name: 'Windows Server', patterns: ['windows server', 'windows'] },
{ name: 'PowerShell', patterns: ['powershell'] },
{ name: 'Active Directory', patterns: ['active directory', 'entra'] },
{ name: 'Networking', patterns: ['networking', 'network', 'networks'] },
{ name: 'TCP/IP', patterns: ['tcp/ip', 'tcp', 'udp'] },
{ name: 'DNS & DHCP', patterns: ['dns', 'dhcp'] },
{ name: 'VLANs', patterns: ['vlan', 'vlans'] },
{ name: 'Cisco', patterns: ['cisco', 'ios'] },
{ name: 'Firewalls', patterns: ['firewall', 'firewalls'] },
{ name: 'Cybersecurity', patterns: ['security', 'cybersecurity', 'cyber'] },
{ name: 'SIEM', patterns: ['siem', 'splunk', 'sentinel'] },
{ name: 'Incident response', patterns: ['incident response', 'incidents', 'incident'] },
{ name: 'AWS', patterns: ['aws', 'amazon web services'] },
{ name: 'Azure', patterns: ['azure'] },
{ name: 'Cloud', patterns: ['cloud'] },
{ name: 'Docker', patterns: ['docker', 'containers'] },
{ name: 'Kubernetes', patterns: ['kubernetes', 'k8s'] },
{ name: 'Excel', patterns: ['excel', 'spreadsheets'] },
{ name: 'Tableau', patterns: ['tableau'] },
{ name: 'Power BI', patterns: ['power bi', 'powerbi'] },
{ name: 'Data analysis', patterns: ['data analysis', 'analytics', 'analyzed', 'analysis'] },
{ name: 'Machine learning', patterns: ['machine learning', 'ml'] },
{ name: 'Help desk', patterns: ['help desk', 'helpdesk', 'service desk', 'tickets', 'ticketing'] },
{ name: 'Troubleshooting', patterns: ['troubleshoot', 'troubleshooting', 'diagnose'] },
{ name: 'Customer service', patterns: ['customer service', 'customer support', 'end users', 'end-user'] },
{ name: 'Documentation', patterns: ['documentation', 'documented', 'document'] },
{ name: 'Agile', patterns: ['agile', 'scrum', 'sprint'] },
{ name: 'Communication', patterns: ['communication', 'communicate', 'presented', 'presentation'] }];


const weakStarts: [RegExp, string][] = [
[/^helped (with|to)?\s*/i, 'Supported '],
[/^worked on\s+/i, 'Developed '],
[/^was responsible for\s+/i, 'Owned '],
[/^responsible for\s+/i, 'Owned '],
[/^assisted (with)?\s*/i, 'Supported '],
[/^was in charge of\s+/i, 'Led '],
[/^did\s+/i, 'Completed '],
[/^made\s+/i, 'Built '],
[/^used\s+/i, 'Applied ']];


export interface Rewrite {
  before: string;
  after: string;
  reasons: string[];
}

export interface TailoringResult {
  target: string[];
  matched: string[];
  missing: string[];
  coverage: number;
  rewrites: Rewrite[];
  usedProfile: boolean;
}

export function extractSkills(text: string): string[] {
  const t = text.toLowerCase();
  return skillLexicon.
  filter((s) => s.patterns.some((p) => new RegExp(`(^|[^a-z0-9+#])${escapeRegExp(p)}($|[^a-z0-9+#])`).test(t))).
  map((s) => s.name);
}

export function tailorResume({
  job,
  skillsText,
  profile




}: {job: string;skillsText: string;profile: CandidateProfile;}): TailoringResult {
  const experience = `${profile.resume}\n${profile.classwork}`;
  const experienceLower = experience.toLowerCase();

  // Free-text skills the lexicon doesn't know (e.g. "ServiceNow") still count as targets.
  const customTerms = skillsText.
  split(/[,;\n]/).
  map((s) => s.trim()).
  filter((s) => s.length > 1 && s.length < 30 && extractSkills(s).length === 0);

  const target = Array.from(new Set([...extractSkills(job), ...extractSkills(skillsText), ...customTerms]));
  const known = new Set(extractSkills(experience));
  const has = (skill: string) => known.has(skill) || experienceLower.includes(skill.toLowerCase());
  const matched = target.filter(has);
  const missing = target.filter((s) => !has(s));

  const lines = Array.from(
    new Set(
      experience.
      split(/\n|•|(?<=\.)\s+/).
      map((l) => l.trim().replace(/^[-*•\d.)\s]+/, '').replace(/\.$/, '')).
      filter((l) => l.length >= 20)
    )
  );
  const ranked = [...lines].sort(
    (a, b) => extractSkills(b).filter((s) => target.includes(s)).length - extractSkills(a).filter((s) => target.includes(s)).length
  );

  return {
    target,
    matched,
    missing,
    coverage: target.length ? Math.round(matched.length / target.length * 100) : 0,
    rewrites: ranked.slice(0, 4).map((line) => rewriteLine(line, target)),
    usedProfile: Boolean(profile.resume.trim())
  };
}

function rewriteLine(line: string, target: string[]): Rewrite {
  const reasons: string[] = [];
  let after = line;

  const weak = weakStarts.find(([re]) => re.test(after));
  if (weak) {
    after = after.replace(weak[0], weak[1]);
    reasons.push('Stronger action verb');
  } else {
    after = after.charAt(0).toUpperCase() + after.slice(1);
  }

  const relevant = extractSkills(line).filter((s) => target.includes(s));
  if (relevant.length) reasons.push(`Keeps ${relevant.join(' and ')}, which this job asks for`);

  if (!/\d/.test(line)) {
    after = `${after}, [add a result: users supported, % improved, or time saved]`;
    reasons.push('Add a measurable result');
  }

  return { before: line, after: `${after}.`, reasons };
}