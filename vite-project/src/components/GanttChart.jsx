import React from 'react';

const GanttChart = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return <div className="gantt-chart">No timeline data</div>;
  }

  const maxTime = Math.max(...timeline.map(t => t.end));
  const scale = 600 / maxTime;

  return (
    <div className="gantt-container">
      <h3>Gantt Chart</h3>
      <div className="gantt-chart">
        {timeline.map((item, index) => (
          <div key={index} className="gantt-item-container">
            <div
              className="gantt-item"
              style={{
                width: `${(item.end - item.start) * scale}px`,
                backgroundColor: item.color
              }}
              title={`${item.process}: ${item.start}-${item.end}`}
            >
              <span className="gantt-label">{item.process}</span>
            </div>
            <div className="gantt-time">
              {item.start}-{item.end}
            </div>
          </div>
        ))}
      </div>
      <div className="gantt-timeline">
        {Array.from({ length: Math.ceil(maxTime) + 1 }, (_, i) => (
          <span key={i} style={{ left: `${i * scale}px` }}>
            {i}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
