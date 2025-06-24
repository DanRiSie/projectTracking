import React from 'react';
import { ProjectStats } from '../types';

interface StatsSectionProps {
  stats: ProjectStats;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const { completed, inProgress, notStarted, averageCompletionTime, fastestProject, slowestProject } = stats;
  
  // For the chart, calculate percentages
  const total = completed + inProgress + notStarted;
  const completedPercent = total > 0 ? (completed / total) * 100 : 0;
  const inProgressPercent = total > 0 ? (inProgress / total) * 100 : 0;
  const notStartedPercent = total > 0 ? (notStarted / total) * 100 : 0;
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Project Statistics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Project Status</h3>
          <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden mt-2">
            {completedPercent > 0 && (
              <div 
                className="absolute h-full bg-emerald-500 left-0 top-0"
                style={{ width: `${completedPercent}%` }}
              ></div>
            )}
            {inProgressPercent > 0 && (
              <div 
                className="absolute h-full bg-amber-500 left-0 top-0"
                style={{ width: `${inProgressPercent}%`, marginLeft: `${completedPercent}%` }}
              ></div>
            )}
            {notStartedPercent > 0 && (
              <div 
                className="absolute h-full bg-gray-400 left-0 top-0"
                style={{ width: `${notStartedPercent}%`, marginLeft: `${completedPercent + inProgressPercent}%` }}
              ></div>
            )}
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block mr-1"></span>
              <span className="text-gray-600">Completed ({completed})</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-amber-500 rounded-full inline-block mr-1"></span>
              <span className="text-gray-600">In Progress ({inProgress})</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-gray-400 rounded-full inline-block mr-1"></span>
              <span className="text-gray-600">Not Started ({notStarted})</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Time Statistics</h3>
          <div className="mt-3">
            <div className="mb-2">
              <span className="text-gray-600 text-sm">Average Completion Time:</span>
              <span className="text-gray-900 font-medium ml-2">
                {averageCompletionTime ? `${averageCompletionTime} days` : '—'}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600 text-sm">Fastest Project:</span>
              <span className="text-gray-900 font-medium ml-2">
                {fastestProject ? `${fastestProject.name} (${fastestProject.days} days)` : '—'}
              </span>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Slowest Project:</span>
              <span className="text-gray-900 font-medium ml-2">
                {slowestProject ? `${slowestProject.name} (${slowestProject.days} days)` : '—'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Progress Summary</h3>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Projects:</span>
              <span className="text-gray-900 font-medium">{total}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Completion Rate:</span>
              <span className="text-gray-900 font-medium">
                {total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Projects In Progress:</span>
              <span className="text-gray-900 font-medium">
                {total > 0 ? `${Math.round((inProgress / total) * 100)}%` : '0%'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;