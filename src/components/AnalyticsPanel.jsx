import React from 'react';

function AnalyticsPanel({ isOpen, onClose, data }) {
  const tasks = Object.values(data.tasks);
  const completed = tasks.filter(t => {
    const col = Object.values(data.columns).find(c => c.taskIds.includes(t.id));
    return col?.id === 'done';
  }).length;

  const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className={`analytics-panel ${isOpen ? 'open' : ''}`}>
      <div className="panel-header">
        <h3 className="panel-title">📊 Project Insights</h3>
        <button className="icon-btn" onClick={onClose}>✕</button>
      </div>

      <div className="sprint-info">
        <div className="sprint-header">
          <span className="sprint-name">🎯 Sprint 4 Progress</span>
          <span className="sprint-date">Ends in 5 days</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="sprint-stats">
          <span>{completed}/{tasks.length} tasks completed</span>
          <span>{progress}%</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Tasks Completed</div>
        <div className="stat-value">{completed}</div>
        <div className="stat-change">↑ 12% from last week</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Total Tasks</div>
        <div className="stat-value">{tasks.length}</div>
        <div className="stat-change">↑ 5 new this week</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Completion Rate</div>
        <div className="stat-value">{progress}%</div>
        <div className="stat-change">↑ 8% improvement</div>
      </div>
    </div>
  );
}

export default AnalyticsPanel;
