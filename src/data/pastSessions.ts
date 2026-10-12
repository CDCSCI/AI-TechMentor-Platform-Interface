export interface PastSession {
  id: string;
  title: string;
  date: string;
  kind: 'behavioral' | 'technical';
  score: string;
}

export const pastSessions: PastSession[] = [
{ id: 's1', title: 'Behavioral – Entry Level', date: 'Sep 26, 2026 · 10:24 AM', kind: 'behavioral', score: 'Strong' },
{ id: 's2', title: 'Technical – Networking', date: 'Sep 20, 2026 · 2:17 PM', kind: 'technical', score: 'Good' },
{ id: 's3', title: 'Behavioral – Career Growth', date: 'Sep 14, 2026 · 11:03 AM', kind: 'behavioral', score: 'Good' }];