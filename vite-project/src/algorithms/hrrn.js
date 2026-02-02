import { getColor } from './utils.js';

export const scheduleHRRN = (procs) => {
  const processes = procs.map(p => ({ ...p, scheduled: false }));
  let time = 0;
  const timeline = [];
  const processResults = [];

  for (let i = 0; i < processes.length; i++) {
    let maxResponseRatio = -1;
    let selectedProcess = null;
    let selectedIndex = -1;

    processes.forEach((p, idx) => {
      if (!p.scheduled && p.arrivalTime <= time) {
        const waitingTime = time - p.arrivalTime;
        const responseRatio = (waitingTime + p.burstTime) / p.burstTime;

        if (responseRatio > maxResponseRatio) {
          maxResponseRatio = responseRatio;
          selectedProcess = p;
          selectedIndex = idx;
        }
      }
    });

    if (!selectedProcess) {
      const nextProcess = processes.find((p, idx) => !p.scheduled && p.arrivalTime > time);
      if (nextProcess) {
        time = nextProcess.arrivalTime;
        i--;
        continue;
      }
      break;
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
      responseRatio: maxResponseRatio
    });

    processes[selectedIndex].scheduled = true;
    time = end;
  }

  return { timeline, processResults };
};
