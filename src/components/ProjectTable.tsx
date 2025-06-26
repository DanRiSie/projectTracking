import React, { useState } from 'react';
import { Calendar, Edit3, Check, X, Plus } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  previousLeader: string;
  currentLeader: string;
  startDate: string;
  endDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  duration: number;
}

interface ProjectTableProps {
  projects: Project[];
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
  onAddProject: () => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onUpdateProject, onAddProject }) => {
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  const calculateDuration = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleEdit = (id: string, field: string, currentValue: string) => {
    setEditingCell({ id, field });
    setEditValue(currentValue);
  };

  const handleSave = (id: string, field: string) => {
    const updates: Partial<Project> = { [field]: editValue };
    
    // If updating dates, recalculate duration
    if (field === 'startDate' || field === 'endDate') {
      const project = projects.find(p => p.id === id);
      if (project) {
        const startDate = field === 'startDate' ? editValue : project.startDate;
        const endDate = field === 'endDate' ? editValue : project.endDate;
        updates.duration = calculateDuration(startDate, endDate);
      }
    }
    
    onUpdateProject(id, updates);
    setEditingCell(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderEditableCell = (project: Project, field: keyof Project, value: string) => {
    const isEditing = editingCell?.id === project.id && editingCell?.field === field;
    
    if (isEditing) {
      if (field === 'status') {
        return (
          <div className="flex items-center space-x-2">
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              autoFocus
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={() => handleSave(project.id, field)}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      }
      
      if (field === 'startDate' || field === 'endDate') {
        return (
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              autoFocus
            />
            <button
              onClick={() => handleSave(project.id, field)}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      }
      
      return (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm min-w-0 flex-1"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(project.id, field);
              if (e.key === 'Escape') handleCancel();
            }}
          />
          <button
            onClick={() => handleSave(project.id, field)}
            className="p-1 text-green-600 hover:bg-green-100 rounded"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    if (field === 'status') {
      return (
        <button
          onClick={() => handleEdit(project.id, field, value)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-200 hover:shadow-sm ${getStatusColor(value)}`}
        >
          {value}
        </button>
      );
    }

    if (field === 'startDate' || field === 'endDate') {
      return (
        <button
          onClick={() => handleEdit(project.id, field, value)}
          className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-200"
        >
          <Calendar className="w-4 h-4" />
          <span>{value || 'Select date'}</span>
        </button>
      );
    }

    return (
      <button
        onClick={() => handleEdit(project.id, field, value)}
        className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-200 text-left w-full"
      >
        <span className="flex-1">{value || 'Enter ' + field}</span>
        <Edit3 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </button>
    );
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4">
          <Plus className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects yet</h3>
        <p className="text-slate-500 mb-6">Get started by creating your first project</p>
        <button
          onClick={onAddProject}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mx-auto"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create First Project</span>
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Project Name</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Previous Leader</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Current Leader</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Start Date</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">End Date</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Status</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Duration</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50 group transition-colors duration-200">
              <td className="py-4 px-4">
                {renderEditableCell(project, 'name', project.name)}
              </td>
              <td className="py-4 px-4">
                {renderEditableCell(project, 'previousLeader', project.previousLeader)}
              </td>
              <td className="py-4 px-4">
                {renderEditableCell(project, 'currentLeader', project.currentLeader)}
              </td>
              <td className="py-4 px-4">
                {renderEditableCell(project, 'startDate', project.startDate)}
              </td>
              <td className="py-4 px-4">
                {renderEditableCell(project, 'endDate', project.endDate)}
              </td>
              <td className="py-4 px-4">
                {renderEditableCell(project, 'status', project.status)}
              </td>
              <td className="py-4 px-4">
                <span className="text-slate-700 font-medium">
                  {project.duration > 0 ? `${project.duration} days` : '0 days'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <button
          onClick={onAddProject}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Project</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectTable;