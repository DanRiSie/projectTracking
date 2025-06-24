import { Project } from '../types';
import { generateId } from '../utils/projectUtils';

// Sample project data to start with
export const sampleProjects: Project[] = [
  {
    id: generateId(),
    name: 'Website Redesign',
    status: 'Completed',
    previousLeader: 'Alex Johnson',
    currentLeader: 'Maria Garcia',
    startDate: '2025-01-15',
    endDate: '2025-03-01',
  },
  {
    id: generateId(),
    name: 'Mobile App Development',
    status: 'In Progress',
    previousLeader: 'David Kim',
    currentLeader: 'Sarah Chen',
    startDate: '2025-02-10',
    endDate: '',
  },
  {
    id: generateId(),
    name: 'Marketing Campaign',
    status: 'Not Started',
    previousLeader: '',
    currentLeader: 'James Wilson',
    startDate: '2025-04-01',
    endDate: '',
  },
  {
    id: generateId(),
    name: 'Database Migration',
    status: 'Completed',
    previousLeader: 'Emily Davis',
    currentLeader: 'Michael Brown',
    startDate: '2025-01-05',
    endDate: '2025-01-25',
  },
  {
    id: generateId(),
    name: 'Product Launch',
    status: 'In Progress',
    previousLeader: 'Jason Lee',
    currentLeader: 'Jessica Martinez',
    startDate: '2025-03-10',
    endDate: '',
  }
];