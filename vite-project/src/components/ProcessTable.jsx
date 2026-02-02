import React from 'react';

const ProcessTable = ({ processes, setProcesses }) => {
  const handleInputChange = (id, field, value) => {
    setProcesses(
      processes.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const handleAddProcess = () => {
    const newId = Math.max(...processes.map(p => p.id), 0) + 1;
    setProcesses([
      ...processes,
      {
        id: newId,
        name: `P${newId}`,
        arrivalTime: 0,
        burstTime: 1,
        priority: 1
      }
    ]);
  };

  const handleRemoveProcess = (id) => {
    if (processes.length > 1) {
      setProcesses(processes.filter(p => p.id !== id));
    }
  };

  return (
    <div className="process-table-container">
      <h3>Processes</h3>
      <table className="process-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {processes.map(process => (
            <tr key={process.id}>
              <td>{process.id}</td>
              <td>
                <input
                  type="text"
                  value={process.name}
                  onChange={(e) =>
                    handleInputChange(process.id, 'name', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={process.arrivalTime}
                  onChange={(e) =>
                    handleInputChange(
                      process.id,
                      'arrivalTime',
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={process.burstTime}
                  onChange={(e) =>
                    handleInputChange(
                      process.id,
                      'burstTime',
                      parseInt(e.target.value) || 1
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={process.priority}
                  onChange={(e) =>
                    handleInputChange(
                      process.id,
                      'priority',
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveProcess(process.id)}
                  disabled={processes.length === 1}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-btn" onClick={handleAddProcess}>
        + Add Process
      </button>
    </div>
  );
};

export default ProcessTable;
