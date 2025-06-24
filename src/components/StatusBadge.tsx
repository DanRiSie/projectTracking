import React from 'react';
import { ProjectStatus } from '../types';

interface StatusBadgeProps {
  status: ProjectStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <span 
      className={`px-3 py-1 inline-flex text-sm font-medium rounded-full border ${getStatusStyles()} transition-all duration-200`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;