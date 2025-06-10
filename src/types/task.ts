export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskFilter = {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
};

export type SortOption = 'dueDate' | 'priority' | 'title' | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export type TaskSort = {
  option: SortOption;
  direction: SortDirection;
};
