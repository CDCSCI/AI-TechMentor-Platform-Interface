import { useMemo } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { projectInfo, projectTasks } from '../data/projectPlan';
import { computeSchedule, enumeratePaths } from '../utils/schedule';

export function useProjectSchedule() {
  return useMemo(() => {
    const schedule = computeSchedule(projectTasks, projectInfo.startDate);
    const statusDay = differenceInCalendarDays(projectInfo.statusDate, projectInfo.startDate);
    return { ...schedule, paths: enumeratePaths(schedule.tasks), statusDay };
  }, []);
}