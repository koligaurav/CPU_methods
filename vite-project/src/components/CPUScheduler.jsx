import React, { useState } from 'react';
import {
  scheduleFCFS,
  scheduleRR,
  scheduleSPN,
  scheduleSRT,
  scheduleHRRN,
  scheduleAging
} from '../algorithms/index.js';

import AlgorithmInfo from './AlgorithmInfo';
import ControlPanel from './ControlPanel';
import ProcessTable from './ProcessTable';
import GanttChart from './GanttChart';
import Statistics from './Statistics';
import ResultsTable from './ResultsTable';

import '../styles/scheduler.css';

const CPUScheduler = () => {
  const [processes, setProcesses] = useState([
    { id: 1, name: 'P1', arrivalTime: 0, burstTime: 5, priority: 2 },
    { id: 2, name: 'P2', arrivalTime: 1, burstTime: 3, priority: 1 },
    { id: 3, name: 'P3', arrivalTime: 2, burstTime: 8, priority: 3 },
    { id: 4, name: 'P4', arrivalTime: 3, burstTime: 6, priority: 2 }
  ]);

  const [algorithm, setAlgorithm] = useState('FCFS');
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [results, setResults] = useState(null);

  const runScheduler = () => {
    let result;
    switch (algorithm) {
      case 'RR': result = scheduleRR(processes, timeQuantum); break;
      case 'SPN': result = scheduleSPN(processes); break;
      case 'SRT': result = scheduleSRT(processes); break;
      case 'HRRN': result = scheduleHRRN(processes); break;
      case 'Aging': result = scheduleAging(processes); break;
      default: result = scheduleFCFS(processes);
    }

    const avgTurnaround =
      result.processResults.reduce((s, p) => s + p.turnaroundTime, 0) /
      result.processResults.length;

    const avgWaiting =
      result.processResults.reduce((s, p) => s + p.waitingTime, 0) /
      result.processResults.length;

    setResults({
      ...result,
      avgTurnaround,
      avgWaiting,
      contextSwitches: result.timeline.length - 1
    });
  };

  return (
    <div className="scheduler-root">
      <AlgorithmInfo algorithm={algorithm} />
      <ControlPanel
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        timeQuantum={timeQuantum}
        setTimeQuantum={setTimeQuantum}
        runScheduler={runScheduler}
      />
      <ProcessTable processes={processes} setProcesses={setProcesses} />

      {results && (
        <>
          <GanttChart timeline={results.timeline} />
          <Statistics results={results} />
          <ResultsTable processResults={results.processResults} />
        </>
      )}
    </div>
  );
};

export default CPUScheduler;
