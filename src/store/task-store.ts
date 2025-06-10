import { create } from "zustand";
import { Task, TaskFilter, TaskPriority, TaskSort, TaskStatus } from "@/types/task";
import { v4 as uuidv4 } from "uuid";

interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  sort: TaskSort;
  
  // CRUD Operations
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, task: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>) => void;
  deleteTask: (id: string) => void;
  
  // Filtering and sorting
  setFilter: (filter: TaskFilter) => void;
  setSort: (sort: TaskSort) => void;
  
  // Status changes
  changeTaskStatus: (id: string, status: TaskStatus) => void;
  
  // Getters
  getFilteredAndSortedTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

// Sample initial data for testing purposes
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Create project structure",
    description: "Set up Next.js project and install dependencies",
    status: "Done",
    priority: "High",
    assignee: "John Doe",
    createdAt: new Date(2025, 5, 5),
    updatedAt: new Date(2025, 5, 7),
  },
  {
    id: "2",
    title: "Design UI components",
    description: "Create reusable UI components using Shadcn UI",
    status: "In Progress",
    priority: "Medium",
    assignee: "Jane Smith",
    createdAt: new Date(2025, 5, 7),
    updatedAt: new Date(2025, 5, 7),
  },
  {
    id: "3",
    title: "Implement drag and drop",
    description: "Add drag and drop functionality for tasks",
    status: "To Do",
    priority: "Medium",
    dueDate: new Date(2025, 6, 15),
    assignee: "John Doe",
    createdAt: new Date(2025, 5, 8),
    updatedAt: new Date(2025, 5, 8),
  },
  {
    id: "4",
    title: "Set up state management",
    description: "Implement Zustand store for managing tasks",
    status: "Done",
    priority: "High",
    createdAt: new Date(2025, 5, 6),
    updatedAt: new Date(2025, 5, 6),
  },
  {
    id: "5",
    title: "Write tests",
    description: "Add tests for components and store",
    status: "To Do",
    priority: "Low",
    dueDate: new Date(2025, 6, 20),
    createdAt: new Date(2025, 5, 9),
    updatedAt: new Date(2025, 5, 9),
  },
  {
    id: "6",
    title: "Implement Authentication",
    description: "Set up user authentication with NextAuth.js",
    status: "To Do",
    priority: "High",
    dueDate: new Date(2025, 6, 12),
    assignee: "Jane Smith",
    createdAt: new Date(2025, 5, 8),
    updatedAt: new Date(2025, 5, 8),
  },
  {
    id: "7",
    title: "Create API endpoints",
    description: "Implement API routes for CRUD operations",
    status: "In Progress",
    priority: "Medium",
    dueDate: new Date(2025, 6, 10),
    assignee: "John Doe",
    createdAt: new Date(2025, 5, 7),
    updatedAt: new Date(2025, 5, 9),
  },
  {
    id: "8",
    title: "Add task filtering",
    description: "Implement filters for task status, priority, and assignee",
    status: "Done",
    priority: "Medium",
    assignee: "Jane Smith",
    createdAt: new Date(2025, 5, 6),
    updatedAt: new Date(2025, 5, 8),
  },
  {
    id: "9",
    title: "Optimize performance",
    description: "Implement memoization and lazy loading for better performance",
    status: "To Do",
    priority: "Low",
    dueDate: new Date(2025, 6, 25),
    createdAt: new Date(2025, 5, 9),
    updatedAt: new Date(2025, 5, 9),
  },
  {
    id: "10",
    title: "Add dark mode",
    description: "Implement theme switching functionality",
    status: "In Progress",
    priority: "Low",
    assignee: "John Doe",
    dueDate: new Date(2025, 6, 18),
    createdAt: new Date(2025, 5, 8),
    updatedAt: new Date(2025, 5, 10),
  },
];

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,
  filter: {},
  sort: { option: 'createdAt', direction: 'desc' },
  
  // CRUD Operations
  addTask: (task) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      tasks: [...state.tasks, newTask]
    }));
  },
  
  updateTask: (id, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id 
          ? { ...task, ...updatedTask, updatedAt: new Date() }
          : task
      )
    }));
  },
  
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }));
  },
  
  // Filtering and sorting
  setFilter: (filter) => {
    set({ filter });
  },
  
  setSort: (sort) => {
    set({ sort });
  },
  
  // Status changes
  changeTaskStatus: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id 
          ? { ...task, status, updatedAt: new Date() }
          : task
      )
    }));
  },
  
  // Getters
  getFilteredAndSortedTasks: () => {
    const { tasks, filter, sort } = get();
    
    let filteredTasks = [...tasks];
    
    // Apply filters
    if (filter.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filter.status);
    }
    
    if (filter.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
    }
    
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) || 
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting
    filteredTasks.sort((a, b) => {
      const { option, direction } = sort;
      const multiplier = direction === 'asc' ? 1 : -1;
      
      switch (option) {
        case 'dueDate':
          if (!a.dueDate) return multiplier;
          if (!b.dueDate) return -multiplier;
          return multiplier * (a.dueDate.getTime() - b.dueDate.getTime());
        
        case 'priority': {
          const priorityOrder: Record<TaskPriority, number> = {
            'High': 3,
            'Medium': 2,
            'Low': 1
          };
          return multiplier * (priorityOrder[a.priority] - priorityOrder[b.priority]);
        }
          
        case 'title':
          return multiplier * a.title.localeCompare(b.title);
          
        case 'createdAt':
        default:
          return multiplier * (a.createdAt.getTime() - b.createdAt.getTime());
      }
    });
    
    return filteredTasks;
  },
  
  getTaskById: (id) => {
    return get().tasks.find(task => task.id === id);
  },
  
  getTasksByStatus: (status) => {
    return get().tasks.filter(task => task.status === status);
  },
}));
