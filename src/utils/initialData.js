export const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Design system architecture for microservices',
      description: 'Create comprehensive architecture diagram and documentation',
      priority: 'high',
      columnId: 'todo',
      assignee: 'Sarah Kim',
      dueDate: '2026-02-05',
      tags: ['Backend', 'Architecture'],
      estimatedTime: '4h',
      createdAt: new Date().toISOString()
    },
    'task-2': {
      id: 'task-2',
      title: 'Create wireframes for mobile app v2',
      description: 'Design new UI/UX for mobile application',
      priority: 'medium',
      columnId: 'todo',
      assignee: 'John Doe',
      dueDate: '2026-02-03',
      tags: ['Design', 'Mobile'],
      estimatedTime: '6h',
      createdAt: new Date().toISOString()
    },
    'task-3': {
      id: 'task-3',
      title: 'Update API documentation',
      description: 'Document all new endpoints',
      priority: 'low',
      columnId: 'todo',
      assignee: 'Alex Raj',
      dueDate: '2026-02-10',
      tags: ['Docs'],
      estimatedTime: '2h',
      createdAt: new Date().toISOString()
    },
    'task-4': {
      id: 'task-4',
      title: 'Fix authentication bug in production',
      description: 'Critical bug affecting user login',
      priority: 'high',
      columnId: 'todo',
      assignee: 'Sarah Kim',
      dueDate: '2026-01-30',
      tags: ['Bug', 'Backend', 'Urgent'],
      estimatedTime: '1h',
      createdAt: new Date().toISOString()
    },
    'task-5': {
      id: 'task-5',
      title: 'Implement user dashboard analytics',
      description: 'Add charts and metrics to dashboard',
      priority: 'high',
      columnId: 'progress',
      assignee: 'John Doe',
      dueDate: '2026-02-01',
      tags: ['Frontend', 'Analytics'],
      estimatedTime: '8h',
      createdAt: new Date().toISOString()
    },
    'task-6': {
      id: 'task-6',
      title: 'Database optimization for reports',
      description: 'Improve query performance',
      priority: 'medium',
      columnId: 'progress',
      assignee: 'Sarah Kim',
      dueDate: '2026-02-02',
      tags: ['Backend', 'Database'],
      estimatedTime: '5h',
      createdAt: new Date().toISOString()
    },
    'task-7': {
      id: 'task-7',
      title: 'Write unit tests for payment module',
      description: 'Achieve 80% code coverage',
      priority: 'low',
      columnId: 'progress',
      assignee: 'Alex Raj',
      dueDate: '2026-02-04',
      tags: ['Testing'],
      estimatedTime: '3h',
      createdAt: new Date().toISOString()
    },
    'task-8': {
      id: 'task-8',
      title: 'Code review: Payment gateway integration',
      description: 'Review PR #234',
      priority: 'medium',
      columnId: 'review',
      assignee: 'Sarah Kim',
      dueDate: '2026-01-29',
      tags: ['Backend', 'Review'],
      estimatedTime: '2h',
      createdAt: new Date().toISOString()
    },
    'task-9': {
      id: 'task-9',
      title: 'QA testing for new feature release',
      description: 'Complete regression testing',
      priority: 'high',
      columnId: 'review',
      assignee: 'Alex Raj',
      dueDate: '2026-01-31',
      tags: ['QA', 'Testing'],
      estimatedTime: '6h',
      createdAt: new Date().toISOString()
    },
    'task-10': {
      id: 'task-10',
      title: 'Setup CI/CD pipeline',
      description: 'Automated deployment configured',
      priority: 'high',
      columnId: 'done',
      assignee: 'Sarah Kim',
      dueDate: '2026-01-25',
      tags: ['DevOps'],
      estimatedTime: '12h',
      createdAt: new Date().toISOString()
    },
    'task-11': {
      id: 'task-11',
      title: 'User authentication system',
      description: 'JWT-based auth implemented',
      priority: 'medium',
      columnId: 'done',
      assignee: 'John Doe',
      dueDate: '2026-01-24',
      tags: ['Backend', 'Security'],
      estimatedTime: '16h',
      createdAt: new Date().toISOString()
    }
  },
  columns: {
    'todo': {
      id: 'todo',
      title: '📋 To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'progress': {
      id: 'progress',
      title: '⚡ In Progress',
      taskIds: ['task-5', 'task-6', 'task-7']
    },
    'review': {
      id: 'review',
      title: '👀 Review',
      taskIds: ['task-8', 'task-9']
    },
    'done': {
      id: 'done',
      title: '✅ Done',
      taskIds: ['task-10', 'task-11']
    }
  },
  columnOrder: ['todo', 'progress', 'review', 'done']
};
