import React from 'react';

const AlgorithmInfo = ({ algorithm }) => {
  const descriptions = {
    FCFS: 'First Come First Served: Processes are executed in the order they arrive. Simple but can lead to poor average waiting time.',
    RR: 'Round Robin: Each process is assigned a fixed time quantum. After the time quantum expires, the process goes to the back of the queue.',
    SPN: 'Shortest Process Next: The process with the smallest burst time is selected next. Minimizes average waiting time.',
    SRT: 'Shortest Remaining Time: Preemptive version of SPN. The process with the shortest remaining burst time is selected.',
    HRRN: 'Highest Response Ratio Next: Selects the process with the highest response ratio (waiting time + burst time) / burst time.',
    Aging: 'Aging-based Priority: Process priority increases over time as they wait. Prevents starvation of lower priority processes.'
  };

  return (
    <div className="algorithm-info">
      <h2>Algorithm Information</h2>
      <p className="current-algorithm">Current: <strong>{algorithm}</strong></p>
      <p className="description">{descriptions[algorithm] || 'Select an algorithm'}</p>
    </div>
  );
};

export default AlgorithmInfo;
