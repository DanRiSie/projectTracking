import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import StatusBadge from './StatusBadge';
import { calculateDuration } from '../utils/projectUtils';

interface ProjectRowProps {
  project: Project;
  onUpdate: (updatedProject: Project) => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project>(project);
  
  const statusOptions: ProjectStatus[] = ['Not Started', 'In Progress', 'Completed'];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBlur = () => {
    onUpdate(editedProject);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };
  
  const duration = calculateDuration(project.startDate, project.endDate);
  
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
      <td className="px-4 py-3">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedProject.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div 
            className="font-medium text-gray-900 cursor-pointer" 
            onClick={() => setIsEditing(true)}
          >
            {project.name || <span className="text-gray-400 italic">Untitled Project</span>}
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <select
            name="status"
            value={editedProject.status}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        ) : (
          <div onClick={() => setIsEditing(true)}>
            <StatusBadge status={project.status} />
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <input
            type="text"
            name="previousLeader"
            value={editedProject.previousLeader}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div 
            className="text-gray-700 cursor-pointer" 
            onClick={() => setIsEditing(true)}
          >
            {project.previousLeader || <span className="text-gray-400 italic">None</span>}
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <input
            type="text"
            name="currentLeader"
            value={editedProject.currentLeader}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div 
            className="text-gray-700 cursor-pointer" 
            onClick={() => setIsEditing(true)}
          >
            {project.currentLeader || <span className="text-gray-400 italic">Unassigned</span>}
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <input
            type="date"
            name="startDate"
            value={editedProject.startDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div 
            className="text-gray-700 cursor-pointer" 
            onClick={() => setIsEditing(true)}
          >
            {project.startDate ? new Date(project.startDate).toLocaleDateString() : '—'}
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <input
            type="date"
            name="endDate"
            value={editedProject.endDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div 
            className="text-gray-700 cursor-pointer" 
            onClick={() => setIsEditing(true)}
          >
            {project.endDate ? new Date(project.endDate).toLocaleDateString() : '—'}
          </div>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <span className="text-gray-700 font-medium">
          {duration > 0 ? `${duration} days` : '—'}
        </span>
      </td>
    </tr>
  );
};

export default ProjectRow;