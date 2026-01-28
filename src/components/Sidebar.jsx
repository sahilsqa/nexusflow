import React from 'react';

function Sidebar() {
  const navItems = [
    { icon: '📋', label: 'Board', active: true },
    { icon: '📅', label: 'Timeline', badge: null },
    { icon: '📊', label: 'Dashboard', badge: 3 },
    { icon: '🎯', label: 'Sprints', badge: null },
    { icon: '📁', label: 'Files', badge: null },
  ];

  const teamItems = [
    { icon: '👥', label: 'Members' },
    { icon: '💬', label: 'Discussions' },
  ];

  return (
    <aside className="sidebar">
      <div className="nav-section">
        <div className="nav-title">Workspace</div>
        {navItems.map((item, idx) => (
          <div key={idx} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
      </div>

      <div className="nav-section">
        <div className="nav-title">Team</div>
        {teamItems.map((item, idx) => (
          <div key={idx} className="nav-item">
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="ai-widget">
        <div className="ai-header">
          <div className="ai-avatar">🤖</div>
          <div>
            <div className="ai-title">Nexus AI</div>
            <div className="ai-subtitle">Project Assistant</div>
          </div>
        </div>
        <div className="ai-suggestion">
          💡 3 tasks due today. Should I prioritize them?
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
