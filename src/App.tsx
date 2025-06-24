import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProjectTable from './components/ProjectTable';
import StatsSection from './components/StatsSection';
import { Project } from './types';
import { calculateProjectStats } from './utils/projectUtils';
import { sampleProjects } from './data/sampleProjects';

function App() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [showStats, setShowStats] = useState(true);
  
  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('payevoProjects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Failed to parse saved projects:', error);
      }
    }
  }, []);
  
  // Save projects to localStorage when they change
  useEffect(() => {
    localStorage.setItem('payevoProjects', JSON.stringify(projects));
  }, [projects]);
  
  const stats = calculateProjectStats(projects);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showStats={showStats}
        setShowStats={setShowStats}
      />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {showStats && <StatsSection stats={stats} />}
          
          <ProjectTable 
            projects={projects} 
            setProjects={setProjects} 
            searchTerm={searchTerm} 
          />
        </div>
      </main>
      
      <footer className="bg-white mt-12 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PAYEVO Project Tracking
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;