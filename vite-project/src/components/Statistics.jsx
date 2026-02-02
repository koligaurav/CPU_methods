import React from 'react';

const Statistics = ({ results }) => {
  if (!results) {
    return null;
  }

  return (
    <div className="statistics-container">
      <h3>CPU Scheduling Statistics</h3>
      <div className="statistics-grid">
        <div className="stat-card">
          <h4>Average Turnaround Time</h4>
          <p className="stat-value">{results.avgTurnaround.toFixed(2)} units</p>
        </div>
        <div className="stat-card">
          <h4>Average Waiting Time</h4>
          <p className="stat-value">{results.avgWaiting.toFixed(2)} units</p>
        </div>
        <div className="stat-card">
          <h4>Total Completion Time</h4>
          <p className="stat-value">
            {Math.max(...results.timeline.map(t => t.end))} units
          </p>
        </div>
        <div className="stat-card">
          <h4>Context Switches</h4>
          <p className="stat-value">{results.contextSwitches}</p>
        </div>
        <div className="stat-card">
          <h4>Number of Processes</h4>
          <p className="stat-value">{results.processResults.length}</p>
        </div>
        <div className="stat-card">
          <h4>Total Burst Time</h4>
          <p className="stat-value">
            {results.processResults.reduce((sum, p) => sum + p.burstTime, 0)} units
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
