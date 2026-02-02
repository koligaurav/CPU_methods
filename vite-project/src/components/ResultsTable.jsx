import React from 'react';

const ResultsTable = ({ processResults }) => {
  if (!processResults || processResults.length === 0) {
    return null;
  }

  return (
    <div className="results-table-container">
      <h3>Process Results</h3>
      <table className="results-table">
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {processResults.map(result => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.arrivalTime}</td>
              <td>{result.burstTime}</td>
              <td>{result.completionTime}</td>
              <td>{result.turnaroundTime}</td>
              <td>{result.waitingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
