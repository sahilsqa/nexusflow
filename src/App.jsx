import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AnalyticsPanel from './components/AnalyticsPanel';
import TaskModal from './components/TaskModal';
import { initialData } from './utils/initialData';
import './App.css';

function App() {
  const [data, setData] = useState(initialData);
  const [theme, setTheme] = useState('dark');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('board');

  useEffect(() => {
    const saved = localStorage.getItem('nexusflow-data');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nexusflow-data', JSON.stringify(data));
  }, [data]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      const column = data.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      const [moved] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, moved);

      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [source.droppableId]: {
            ...column,
            taskIds: newTaskIds
          }
        }
      }));
    } else {
      const sourceColumn = data.columns[source.droppableId];
      const destColumn = data.columns[destination.droppableId];
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      const destTaskIds = Array.from(destColumn.taskIds);
      const [moved] = sourceTaskIds.splice(source.index, 1);
      destTaskIds.splice(destination.index, 0, moved);

      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [source.droppableId]: {
            ...sourceColumn,
            taskIds: sourceTaskIds
          },
          [destination.droppableId]: {
            ...destColumn,
            taskIds: destTaskIds
          }
        }
      }));
    }
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [newTask.id]: newTask
      },
      columns: {
        ...prev.columns,
        [task.columnId]: {
          ...prev.columns[task.columnId],
          taskIds: [...prev.columns[task.columnId].taskIds, newTask.id]
        }
      }
    }));
    setModalOpen(false);
  };

  const updateTask = (updatedTask) => {
    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [updatedTask.id]: updatedTask
      }
    }));
    setModalOpen(false);
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newColumns = { ...data.columns };
    Object.keys(newColumns).forEach(colId => {
      newColumns[colId] = {
        ...newColumns[colId],
        taskIds: newColumns[colId].taskIds.filter(id => id !== taskId)
      };
    });

    setData(prev => ({
      ...prev,
      tasks: newTasks,
      columns: newColumns
    }));
    setModalOpen(false);
    setEditingTask(null);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const filteredData = {
    ...data,
    tasks: Object.keys(data.tasks).reduce((acc, key) => {
      const task = data.tasks[key];
      if (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        acc[key] = task;
      }
      return acc;
    }, {})
  };

  return (
    <div className={`app ${theme}`}>
      <div className="bg-animation"></div>
      
      <Header 
        toggleTheme={toggleTheme}
        toggleAnalytics={() => setShowAnalytics(!showAnalytics)}
        openModal={() => setModalOpen(true)}
        theme={theme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="app-container">
        <Sidebar />
        
        <main className="main-content">
          {activeView === 'board' && (
            <Board 
              data={filteredData}
              onDragEnd={onDragEnd}
              onEditTask={openEditModal}
            />
          )}
          {activeView === 'list' && (
            <ListView data={filteredData} onEditTask={openEditModal} />
          )}
          {activeView === 'analytics' && (
            <AnalyticsDashboard data={data} />
          )}
        </main>

        <AnalyticsPanel 
          isOpen={showAnalytics}
          onClose={() => setShowAnalytics(false)}
          data={data}
        />
      </div>

      {modalOpen && (
        <TaskModal
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? updateTask : addTask}
          onDelete={editingTask ? () => deleteTask(editingTask.id) : null}
          initialData={editingTask}
          columns={data.columns}
        />
      )}
    </div>
  );
}

// Placeholder components for views
function ListView({ data, onEditTask }) {
  const allTasks = Object.values(data.tasks);
  return (
    <div className="list-view">
      <h2>List View</h2>
      <div className="task-list">
        {allTasks.map(task => (
          <div key={task.id} className="list-item" onClick={() => onEditTask(task)}>
            <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
            <span className="task-title">{task.title}</span>
            <span className="task-assignee">{task.assignee}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsDashboard({ data }) {
  const tasks = Object.values(data.tasks);
  const completed = tasks.filter(t => {
    const col = Object.values(data.columns).find(c => c.taskIds.includes(t.id));
    return col?.id === 'done';
  }).length;

  return (
    <div className="analytics-dashboard">
      <h2>📊 Analytics Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card large">
          <h3>Total Tasks</h3>
          <div className="stat-value">{tasks.length}</div>
        </div>
        <div className="stat-card large">
          <h3>Completed</h3>
          <div className="stat-value">{completed}</div>
        </div>
        <div className="stat-card large">
          <h3>Progress</h3>
          <div className="stat-value">{Math.round((completed / tasks.length) * 100)}%</div>
        </div>
      </div>
    </div>
  );
}

export default App;
