import type { ProjectMilestone, ProjectTask, ScheduleChange, WbsPhase } from '../types/project';

export const projectInfo = {
  name: 'AI.TechMentor',
  course: 'IST 440W',
  owner: 'Chelsea Davis',
  revision: '2.0',
  startDate: new Date(2026, 7, 24),
  endDate: new Date(2026, 10, 29),
  statusDate: new Date(2026, 10, 15)
};

export const wbsPhases: WbsPhase[] = [
{ id: 'P1', wbs: '1.0', name: 'Initiation & Planning' },
{ id: 'P2', wbs: '2.0', name: 'Design' },
{ id: 'P3', wbs: '3.0', name: 'Development' },
{ id: 'P4', wbs: '4.0', name: 'Testing & QA' },
{ id: 'P5', wbs: '5.0', name: 'Launch & Closeout' }];


export const projectTasks: ProjectTask[] = [
{ id: 'A', wbs: '1.1', phaseId: 'P1', name: 'Project brief & charter', deps: [], o: 5, m: 7, p: 9 },
{ id: 'B', wbs: '1.2', phaseId: 'P1', name: 'Stakeholder & user research', deps: ['A'], o: 4, m: 7, p: 10 },
{ id: 'C', wbs: '1.3', phaseId: 'P1', name: 'Requirements & scope definition', deps: ['B'], o: 5, m: 7, p: 9 },
{ id: 'D', wbs: '1.4', phaseId: 'P1', name: 'Stakeholder analysis & SWOT', deps: ['B'], o: 3, m: 5, p: 7, change: 'new' },
{ id: 'E', wbs: '2.1', phaseId: 'P2', name: 'Information architecture & flows', deps: ['C'], o: 5, m: 7, p: 9 },
{ id: 'F', wbs: '2.2', phaseId: 'P2', name: 'Brand & logo design', deps: ['C'], o: 3, m: 5, p: 7 },
{ id: 'G', wbs: '2.3', phaseId: 'P2', name: 'UI design: core screens', deps: ['E', 'F'], o: 11, m: 13, p: 21 },
{ id: 'H', wbs: '2.4', phaseId: 'P2', name: 'System design document', deps: ['E'], o: 5, m: 7, p: 9, change: 'new' },
{ id: 'I', wbs: '3.1', phaseId: 'P3', name: 'App shell & navigation', deps: ['G'], o: 5, m: 7, p: 9 },
{ id: 'J', wbs: '3.2', phaseId: 'P3', name: 'Profile intake & data layer', deps: ['I'], o: 3, m: 5, p: 7, change: 'revised' },
{ id: 'K', wbs: '3.3', phaseId: 'P3', name: 'AI resume tailoring & action plan', deps: ['J'], o: 8, m: 12, p: 16, change: 'revised' },
{ id: 'L', wbs: '3.4', phaseId: 'P3', name: 'Skill Lab scenarios', deps: ['J'], o: 6, m: 8, p: 10, change: 'revised' },
{ id: 'M', wbs: '3.5', phaseId: 'P3', name: 'Mock interviews + AI avatar', deps: ['J'], o: 9, m: 11, p: 19, change: 'revised' },
{ id: 'N', wbs: '3.6', phaseId: 'P3', name: 'Relocate offer calculator', deps: ['J'], o: 5, m: 7, p: 9, change: 'new' },
{ id: 'O', wbs: '3.7', phaseId: 'P3', name: 'Monochrome visual refresh', deps: ['M', 'N'], o: 2, m: 4, p: 6, change: 'new' },
{ id: 'P', wbs: '4.1', phaseId: 'P4', name: 'Usability testing', deps: ['K', 'L', 'O'], o: 5, m: 7, p: 9 },
{ id: 'Q', wbs: '4.2', phaseId: 'P4', name: 'Functional & accessibility QA', deps: ['P'], o: 5, m: 7, p: 9 },
{ id: 'R', wbs: '5.1', phaseId: 'P5', name: 'Investor overview & business report', deps: ['D', 'G'], o: 7, m: 10, p: 13, change: 'revised' },
{ id: 'S', wbs: '5.2', phaseId: 'P5', name: 'Final presentation & deployment', deps: ['Q', 'R', 'H'], o: 5, m: 7, p: 9 },
{ id: 'T', wbs: '5.3', phaseId: 'P5', name: 'Project closeout', deps: ['S'], o: 4, m: 7, p: 10 }];


export const projectMilestones: ProjectMilestone[] = [
{ name: 'Requirements approved', afterTask: 'C' },
{ name: 'Design sign-off', afterTask: 'G' },
{ name: 'Features complete', afterTask: 'O' },
{ name: 'QA complete', afterTask: 'Q' },
{ name: 'Final presentation', afterTask: 'S' },
{ name: 'Project closed', afterTask: 'T' }];


export const scheduleChanges: ScheduleChange[] = [
{ item: '1.4 Stakeholder analysis & SWOT', type: 'Added', baseline: '—', updated: '5 days', reason: 'Stakeholder power ratings and SWOT added to the business report.' },
{ item: '2.4 System design document', type: 'Added', baseline: '—', updated: '7 days', reason: 'Functional decomposition, design flow, and operational flow charts.' },
{ item: '3.5 Mock interviews + AI avatar', type: 'Revised', baseline: '10 days', updated: '12 days', reason: 'Live AI interviewer avatar, timer, mic controls, and saved sessions.' },
{ item: '3.6 Relocate offer calculator', type: 'Added', baseline: '—', updated: '7 days', reason: 'New screen comparing take-home pay and living costs across cities.' },
{ item: '3.7 Monochrome visual refresh', type: 'Added', baseline: '—', updated: '4 days', reason: 'Product restyled from green to black, grey, and white.' },
{ item: '3.2 Profile intake & data layer', type: 'Compressed', baseline: '7 days', updated: '5 days', reason: 'Reused form components to absorb new scope.' },
{ item: '3.3 AI resume tailoring & action plan', type: 'Compressed', baseline: '14 days', updated: '12 days', reason: 'Shared AI request pipeline across both features.' },
{ item: '3.4 Skill Lab scenarios', type: 'Compressed', baseline: '10 days', updated: '8 days', reason: 'Scenario templates reused across six categories.' },
{ item: '5.1 Investor overview & business report', type: 'Revised', baseline: 'Depends on 2.3', updated: 'Depends on 1.4 & 2.3', reason: 'Report now includes stakeholder analysis and SWOT.' }];


/** Column / row placement for the PERT network diagram */
export const pertLayout: Record<string, {col: number;row: number;}> = {
  A: { col: 0, row: 0 },
  B: { col: 1, row: 0 },
  C: { col: 2, row: 0 },
  D: { col: 2, row: 3 },
  E: { col: 3, row: 0 },
  F: { col: 3, row: 1 },
  G: { col: 4, row: 0 },
  H: { col: 10, row: -2 },
  I: { col: 5, row: 0 },
  J: { col: 6, row: 0 },
  K: { col: 7, row: -1 },
  L: { col: 7, row: 1 },
  M: { col: 7, row: 0 },
  N: { col: 7, row: 2 },
  O: { col: 8, row: 0 },
  P: { col: 9, row: 0 },
  Q: { col: 10, row: 0 },
  R: { col: 10, row: 3 },
  S: { col: 11, row: 0 },
  T: { col: 12, row: 0 }
};