import { getColor } from './utils.js';

export const scheduleRR = (procs, timeQuantum) => {
  const queue = procs.map(p => ({ ...p, remainingTime: p.burstTime }));
  let time = 0;
  const timeline = [];
  const processResults = [];
  const completionTimes = {};

  while (queue.length > 0) {
    const process = queue.shift();

    if (process.arrivalTime > time) {
      time = process.arrivalTime;
    }

    const start = time;
    const executeTime = Math.min(process.remainingTime, timeQuantum);
    const end = start + executeTime;

    timeline.push({
      process: process.name,
      start,
      end,
      color: getColor(process.id)
    });

    process.remainingTime -= executeTime;
    time = end;

    if (process.remainingTime > 0) {
      queue.push(process);
    } else {
      completionTimes[process.id] = time;
    }
  }

  procs.forEach(p => {
    const completionTime = completionTimes[p.id];
    const turnaroundTime = completionTime - p.arrivalTime;
    let waitingTime = turnaroundTime - p.burstTime;
    if (waitingTime < 0) waitingTime = 0;

    processResults.push({
      ...p,
      completionTime,
      turnaroundTime,
      waitingTime
    });
  });

  return { timeline, processResults };
};
