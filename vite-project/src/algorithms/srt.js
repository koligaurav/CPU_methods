import { getColor } from './utils.js';

export const scheduleSRT = (procs) => {
  const processes = procs.map(p => ({
    ...p,
    remainingTime: p.burstTime
  }));

  let time = 0;
  let completed = 0;
  const timeline = [];
  const processResults = {};
  const n = processes.length;

  processes.forEach(p => {
    processResults[p.id] = {
      ...p,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0
    };
  });

  while (completed < n) {
    let minRemaining = Infinity;
    let selectedProcess = null;

    processes.forEach(p => {
      if (p.arrivalTime <= time && p.remainingTime > 0) {
        if (p.remainingTime < minRemaining) {
          minRemaining = p.remainingTime;
          selectedProcess = p;
        }
      }
    });

    if (!selectedProcess) {
      const nextArrival = processes.find(p => p.arrivalTime > time && p.remainingTime > 0);
      if (nextArrival) {
        time = nextArrival.arrivalTime;
      } else {
        break;
      }
      continue;
    }

    const start = time;
    selectedProcess.remainingTime -= 1;
    time += 1;

    if (selectedProcess.remainingTime === 0) {
      processResults[selectedProcess.id].completionTime = time;
      completed++;
    }

    if (!timeline.length || timeline[timeline.length - 1].process !== selectedProcess.name) {
      timeline.push({
        process: selectedProcess.name,
        start,
        end: time,
        color: getColor(selectedProcess.id)
      });
    } else {
      timeline[timeline.length - 1].end = time;
    }
  }

  processes.forEach(p => {
    const result = processResults[p.id];
    result.turnaroundTime = result.completionTime - p.arrivalTime;
    result.waitingTime = result.turnaroundTime - p.burstTime;
    if (result.waitingTime < 0) result.waitingTime = 0;
  });

  return {
    timeline,
    processResults: Object.values(processResults)
  };
};
