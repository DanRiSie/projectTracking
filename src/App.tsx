import React, { useState, useMemo } from 'react';
import { BarChart3, Plus, Search, Calendar, Users, TrendingUp } from 'lucide-react';
import ProjectTable, { Project } from './components/ProjectTable';
import EmployeeTable, { Employee } from './components/EmployeeTable';

function App() {
  const [showStats, setShowStats] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Generate unique ID for new projects and employees
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add new project
  const handleAddProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      previousLeader: '',
      currentLeader: '',
      startDate: '',
      endDate: '',
      status: 'Not Started',
      duration: 0
    };
    setProjects([...projects, newProject]);
  };

  // Update project
  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  // Add new employee
  const handleAddEmployee = () => {
    const newEmployee: Employee = {
      id: generateId(),
      name: '',
      position: '',
      hireDate: '',
      observations: ''
    };
    setEmployees([...employees, newEmployee]);
  };

  // Update employee
  const handleUpdateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(employees.map(employee => 
      employee.id === id ? { ...employee, ...updates } : employee
    ));
  };

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;
    
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.previousLeader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.currentLeader.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const completedProjects = projects.filter(p => p.status === 'Completed');
    const inProgressProjects = projects.filter(p => p.status === 'In Progress');
    const totalDuration = completedProjects.reduce((sum, p) => sum + p.duration, 0);
    const averageDays = completedProjects.length > 0 ? Math.round(totalDuration / completedProjects.length) : 0;
    
    // Get unique team members
    const teamMembers = new Set([
      ...projects.map(p => p.previousLeader).filter(Boolean),
      ...projects.map(p => p.currentLeader).filter(Boolean)
    ]);

    return {
      completed: completedProjects.length,
      inProgress: inProgressProjects.length,
      averageDays,
      teamMembers: teamMembers.size
    };
  }, [projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  QA-TRACK
                </h1>
                <p className="text-sm text-slate-500">Project Tracking Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowStats(!showStats)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 border-2 cursor-pointer ${
                  showStats
                    ? 'bg-blue-100 text-blue-700 shadow-sm border-blue-300'
                    : 'text-slate-600 hover:bg-slate-100 border-transparent hover:border-slate-300'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Statistics</span>
              </button>
              <div className="w-px h-6 bg-slate-300"></div>
              <button
                onClick={() => setShowEmployees(!showEmployees)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 border-2 cursor-pointer ${
                  showEmployees
                    ? 'bg-purple-100 text-purple-700 shadow-sm border-purple-300'
                    : 'text-slate-600 hover:bg-slate-100 border-transparent hover:border-slate-300'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Team Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {showEmployees ? 'Team Management' : 'Project Overview'}
            </h2>
            <p className="text-slate-600">
              {showEmployees ? 'Manage your team members and their information' : 'Track and manage your team\'s project progress'}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {!showEmployees && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-64 hover:border-slate-400"
                />
              </div>
            )}
            <button 
              onClick={showEmployees ? handleAddEmployee : handleAddProject}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-transparent hover:border-blue-300 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">{showEmployees ? 'New Employee' : 'New Project'}</span>
            </button>
          </div>
        </div>

        {/* Stats Cards (when enabled) */}
        {showStats && !showEmployees && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-slate-900">{stats.completed}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Completed Projects</h3>
              <p className="text-sm text-slate-500">Projects finished this month</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-slate-900">{stats.inProgress}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">In Progress</h3>
              <p className="text-sm text-slate-500">Active projects</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-slate-900">{stats.averageDays}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Average Days</h3>
              <p className="text-sm text-slate-500">To complete projects</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-slate-900">{stats.teamMembers}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Team Members</h3>
              <p className="text-sm text-slate-500">Active contributors</p>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 hover:border-slate-300 transition-all duration-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {showEmployees ? 'Team Members' : 'Projects'}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {showEmployees 
                    ? 'Manage team member information and details'
                    : 'Manage and track all your team projects'
                  }
                </p>
              </div>
              {((showEmployees && employees.length > 0) || (!showEmployees && projects.length > 0)) && (
                <div className="text-sm text-slate-500">
                  {showEmployees 
                    ? `${employees.length} team member${employees.length !== 1 ? 's' : ''}`
                    : `${filteredProjects.length} of ${projects.length} projects${searchTerm ? ` matching "${searchTerm}"` : ''}`
                  }
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6">
            {showEmployees ? (
              <EmployeeTable
                employees={employees}
                onUpdateEmployee={handleUpdateEmployee}
                onAddEmployee={handleAddEmployee}
              />
            ) : (
              <ProjectTable
                projects={filteredProjects}
                onUpdateProject={handleUpdateProject}
                onAddProject={handleAddProject}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;