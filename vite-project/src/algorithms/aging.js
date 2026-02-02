import { getColor } from './utils.js';

export const scheduleAging = (procs) => {
  const processes = procs.map(p => ({
    ...p,
    effectivePriority: p.priority,
    waitingSince: p.arrivalTime
  }));

  let time = 0;
  const timeline = [];
  const processResults = [];
  const agingFactor = 1;
  const scheduled = new Set();

  while (scheduled.size < processes.length) {
    let selectedProcess = null;
    let minPriority = Infinity;

    processes.forEach(p => {
      if (!scheduled.has(p.id) && p.arrivalTime <= time) {
        const agingTime = time - p.waitingSince;
        const effectivePriority = p.priority - Math.floor(agingTime / 2) * agingFactor;

        if (effectivePriority < minPriority) {
          minPriority = effectivePriority;
          selectedProcess = p;
        }
      }
    });

    if (!selectedProcess) {
      const nextProcess = processes.find(p => !scheduled.has(p.id) && p.arrivalTime > time);
      if (nextProcess) {
        time = nextProcess.arrivalTime;
      } else {
        break;
      }
      continue;
    }

    const start = Math.max(time, selectedProcess.arrivalTime);
    const end = start + selectedProcess.burstTime;

    timeline.push({
      process: selectedProcess.name,
      start,
      end,
      color: getColor(selectedProcess.id)
    });

    processResults.push({
      ...selectedProcess,
      completionTime: end,
      turnaroundTime: end - selectedProcess.arrivalTime,
      waitingTime: start - selectedProcess.arrivalTime,
      basePriority: selectedProcess.priority
    });

    scheduled.add(selectedProcess.id);
    time = end;
  }

  return { timeline, processResults };
};
