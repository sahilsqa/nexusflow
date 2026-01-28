import React from 'react';

function TaskCard({ task, onClick }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const today = new Date();
    const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff < 0) return 'Overdue';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const gradients = [
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  ];

  const avatarGradient = gradients[task.id.charCodeAt(0) % gradients.length];

  return (
    <div className="task-card" onClick={onClick}>
      <span className={`task-priority priority-${task.priority}`}>
        {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </span>
      
      <div className="task-title">{task.title}</div>
      
      {task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.map((tag, idx) => (
            <span key={idx} className={`tag ${tag.toLowerCase()}`}>{tag}</span>
          ))}
        </div>
      )}
      
      <div className="task-footer">
        <div className="task-meta">
          {task.dueDate && (
            <span className={`task-meta-item ${formatDate(task.dueDate) === 'Overdue' ? 'overdue' : ''}`}>
              📅 {formatDate(task.dueDate)}
            </span>
          )}
          {task.estimatedTime && (
            <span className="task-meta-item">⏱️ {task.estimatedTime}</span>
          )}
        </div>
        
        {task.assignee && (
          <div className="task-assignees">
            <div className="avatar" style={{ background: avatarGradient }}>
              {getInitials(task.assignee)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
