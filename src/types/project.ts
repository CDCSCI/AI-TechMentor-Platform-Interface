export interface WbsPhase {
  id: string;
  wbs: string;
  name: string;
}

export type ChangeType = 'new' | 'revised';

export interface ProjectTask {
  id: string;
  wbs: string;
  phaseId: string;
  name: string;
  deps: string[];
  /** PERT estimates in calendar days */
  o: number;
  m: number;
  p: number;
  change?: ChangeType;
}

export interface ScheduledTask extends ProjectTask {
  te: number;
  variance: number;
  es: number;
  ef: number;
  ls: number;
  lf: number;
  slack: number;
  critical: boolean;
  start: Date;
  end: Date;
}

export interface ProjectMilestone {
  name: string;
  afterTask: string;
}

export interface ScheduleChange {
  item: string;
  type: 'Added' | 'Revised' | 'Compressed';
  baseline: string;
  updated: string;
  reason: string;
}