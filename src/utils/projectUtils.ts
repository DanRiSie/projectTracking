import { Project, ProjectStats } from '../types';

/**
 * Calculate the duration in days between two dates
 */
export const calculateDuration = (startDate: string, endDate: string): number => {
  if (!startDate || !endDate) return 0;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - start.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
  return differenceInDays > 0 ? differenceInDays : 0;
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Generate a new unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Create a new empty project
 */
export const createEmptyProject = (): Project => {
  return {
    id: generateId(),
    name: '',
    status: 'Not Started',
    previousLeader: '',
    currentLeader: '',
    startDate: getTodayDate(),
    endDate: '',
  };
};

/**
 * Calculate statistics from project data
 */
export const calculateProjectStats = (projects: Project[]): ProjectStats => {
  const completed = projects.filter(p => p.status === 'Completed').length;
  const inProgress = projects.filter(p => p.status === 'In Progress').length;
  const notStarted = projects.filter(p => p.status === 'Not Started').length;
  
  // Calculate average completion time for completed projects
  const completedProjects = projects.filter(p => p.status === 'Completed' && p.startDate && p.endDate);
  
  const completionTimes = completedProjects.map(p => calculateDuration(p.startDate, p.endDate));
  const averageCompletionTime = completionTimes.length > 0 
    ? Math.round(completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length) 
    : 0;
  
  // Find fastest and slowest projects
  let fastestProject = null;
  let slowestProject = null;
  
  if (completedProjects.length > 0) {
    const projectsWithDuration = completedProjects.map(p => ({
      name: p.name,
      days: calculateDuration(p.startDate, p.endDate)
    }));
    
    fastestProject = projectsWithDuration.reduce((fastest, current) => 
      (fastest.days === 0 || (current.days > 0 && current.days < fastest.days)) ? current : fastest,
      { name: '', days: Infinity }
    );
    
    slowestProject = projectsWithDuration.reduce((slowest, current) => 
      current.days > slowest.days ? current : slowest, 
      { name: '', days: 0 }
    );
    
    // Handle edge case where only one project exists
    if (fastestProject.days === Infinity) {
      fastestProject = projectsWithDuration[0];
    }
  }
  
  return {
    completed,
    inProgress,
    notStarted,
    averageCompletionTime,
    fastestProject,
    slowestProject
  };
};