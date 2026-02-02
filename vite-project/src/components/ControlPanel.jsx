import React from 'react';

const ControlPanel = ({
  algorithm,
  setAlgorithm,
  timeQuantum,
  setTimeQuantum,
  runScheduler
}) => {
  return (
    <div className="control-panel">
      <div className="control-group">
        <label htmlFor="algorithm">Select Algorithm:</label>
        <select
          id="algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="FCFS">FCFS</option>
          <option value="RR">Round Robin</option>
          <option value="SPN">SPN</option>
          <option value="SRT">SRT</option>
          <option value="HRRN">HRRN</option>
          <option value="Aging">Aging</option>
        </select>
      </div>

      {algorithm === 'RR' && (
        <div className="control-group">
          <label htmlFor="timeQuantum">Time Quantum:</label>
          <input
            id="timeQuantum"
            type="number"
            min="1"
            value={timeQuantum}
            onChange={(e) => setTimeQuantum(parseInt(e.target.value) || 1)}
          />
        </div>
      )}

      <button className="run-button" onClick={runScheduler}>
        Run Scheduler
      </button>
    </div>
  );
};

export default ControlPanel;
