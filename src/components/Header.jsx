import React, { useState, useEffect } from 'react';

function Header({ 
  toggleTheme, 
  toggleAnalytics, 
  openModal, 
  theme,
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView
}) {
  const [time, setTime] = useState({ h: 2, m: 34, s: 18, active: false });

  useEffect(() => {
    let interval;
    if (time.active) {
      interval = setInterval(() => {
        setTime(prev => {
          let { h, m, s } = prev;
          s++;
          if (s >= 60) { s = 0; m++; }
          if (m >= 60) { m = 0; h++; }
          return { ...prev, h, m, s };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [time.active]);

  const formatTime = (val) => val.toString().padStart(2, '0');

  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo">⚡</div>
        <div className="brand-text">
          <div className="brand-name">NexusFlow</div>
          <div className="brand-tagline">Project Intelligence</div>
        </div>
      </div>
      
      <div className="header-actions">
        <div className="view-toggle">
          {['board', 'list', 'analytics'].map(view => (
            <button 
              key={view}
              className={`view-btn ${activeView === view ? 'active' : ''}`}
              onClick={() => setActiveView(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        <div className="time-tracker">
          <span>⏱️</span>
          <span className="timer-display">
            {formatTime(time.h)}:{formatTime(time.m)}:{formatTime(time.s)}
          </span>
          <button 
            className="timer-btn"
            onClick={() => setTime(prev => ({ ...prev, active: !prev.active }))}
          >
            {time.active ? '⏸' : '▶'}
          </button>
        </div>

        <button className="btn btn-secondary btn-icon" onClick={toggleTheme}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        
        <button className="btn btn-secondary btn-icon" onClick={toggleAnalytics}>
          📊
        </button>
        
        <button className="btn btn-primary" onClick={openModal}>
          <span>✨</span> New Task
        </button>
      </div>
    </header>
  );
}

export default Header;
