import React, { useState, useEffect } from 'react';

function TaskModal({ onClose, onSubmit, onDelete, initialData, columns }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    columnId: 'todo',
    assignee: '',
    dueDate: '',
    tags: '',
    estimatedTime: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags.join(', ')
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    });
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {initialData ? '✏️ Edit Task' : '✨ Create New Task'}
          </h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Task Title *</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Enter task title..."
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="form-textarea" 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Add description..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select 
                  className="form-select"
                  value={formData.priority}
                  onChange={e => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select 
                  className="form-select"
                  value={formData.columnId}
                  onChange={e => setFormData({...formData, columnId: e.target.value})}
                >
                  {Object.values(columns).map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Assignee</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.assignee}
                  onChange={e => setFormData({...formData, assignee: e.target.value})}
                  placeholder="e.g., John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={formData.dueDate}
                  onChange={e => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                placeholder="design, dev, urgent..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Time</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.estimatedTime}
                onChange={e => setFormData({...formData, estimatedTime: e.target.value})}
                placeholder="e.g., 4h, 2d"
              />
            </div>
          </div>

          <div className="modal-footer">
            {onDelete && (
              <button type="button" className="btn btn-danger" onClick={onDelete}>
                🗑️ Delete
              </button>
            )}
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
