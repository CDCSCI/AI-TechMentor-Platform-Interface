import type { CandidateProfile } from '../types/career';

export const emptyProfile: CandidateProfile = { resume: '', classwork: '', role: '' };

const profileFields: {key: keyof CandidateProfile;label: string;weight: number;}[] = [
{ key: 'resume', label: 'resume text', weight: 50 },
{ key: 'role', label: 'target role', weight: 30 },
{ key: 'classwork', label: 'classwork and projects', weight: 20 }];


export function profileCompletion(p: CandidateProfile): number {
  return profileFields.reduce((sum, f) => sum + (p[f.key].trim() ? f.weight : 0), 0);
}

export function missingProfileFields(p: CandidateProfile): string[] {
  return profileFields.filter((f) => !p[f.key].trim()).map((f) => f.label);
}