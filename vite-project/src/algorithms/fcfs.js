import { getColor } from './utils.js';

export const scheduleFCFS = (procs) => {
  const sorted = [...procs].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let time = 0;

  const timeline = [];
  const processResults = [];

  sorted.forEach(p => {
    const start = Math.max(time, p.arrivalTime);
    const end = start + p.burstTime;

    timeline.push({
      process: p.name,
      start,
      end,
      color: getColor(p.id)
    });

    processResults.push({
      ...p,
      completionTime: end,
      turnaroundTime: end - p.arrivalTime,
      waitingTime: start - p.arrivalTime
    });

    time = end;
  });

  return { timeline, processResults };
};
