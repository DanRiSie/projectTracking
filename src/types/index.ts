export type ProjectStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  previousLeader: string;
  currentLeader: string;
  startDate: string;
  endDate: string;
}

export interface ProjectStats {
  completed: number;
  inProgress: number;
  notStarted: number;
  averageCompletionTime: number;
  fastestProject: {
    name: string;
    days: number;
  } | null;
  slowestProject: {
    name: string;
    days: number;
  } | null;
}