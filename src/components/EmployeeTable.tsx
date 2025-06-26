import React, { useState } from 'react';
import { Calendar, Edit3, Check, X, Plus, User } from 'lucide-react';

export interface Employee {
  id: string;
  name: string;
  position: string;
  hireDate: string;
  observations: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onUpdateEmployee: (id: string, updates: Partial<Employee>) => void;
  onAddEmployee: () => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onUpdateEmployee, onAddEmployee }) => {
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (id: string, field: string, currentValue: string) => {
    setEditingCell({ id, field });
    setEditValue(currentValue);
  };

  const handleSave = (id: string, field: string) => {
    const updates: Partial<Employee> = { [field]: editValue };
    onUpdateEmployee(id, updates);
    setEditingCell(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const renderEditableCell = (employee: Employee, field: keyof Employee, value: string) => {
    const isEditing = editingCell?.id === employee.id && editingCell?.field === field;
    
    if (isEditing) {
      if (field === 'hireDate') {
        return (
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all duration-200"
              autoFocus
            />
            <button
              onClick={() => handleSave(employee.id, field)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg border border-green-200 hover:border-green-300 transition-all duration-200"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      }
      
      if (field === 'observations') {
        return (
          <div className="flex items-start space-x-2">
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm min-w-0 flex-1 resize-none transition-all duration-200"
              rows={2}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSave(employee.id, field);
                }
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleSave(employee.id, field)}
                className="p-2 text-green-600 hover:bg-green-100 rounded-lg border border-green-200 hover:border-green-300 transition-all duration-200"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      }
      
      return (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="px-3 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm min-w-0 flex-1 transition-all duration-200"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(employee.id, field);
              if (e.key === 'Escape') handleCancel();
            }}
          />
          <button
            onClick={() => handleSave(employee.id, field)}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg border border-green-200 hover:border-green-300 transition-all duration-200"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    if (field === 'hireDate') {
      return (
        <button
          onClick={() => handleEdit(employee.id, field, value)}
          className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200"
        >
          <Calendar className="w-4 h-4" />
          <span>{value || 'Select date'}</span>
        </button>
      );
    }

    if (field === 'observations') {
      return (
        <button
          onClick={() => handleEdit(employee.id, field, value)}
          className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 text-left w-full border border-transparent hover:border-blue-200"
        >
          <span className="block truncate">{value || 'Add observations...'}</span>
        </button>
      );
    }

    return (
      <button
        onClick={() => handleEdit(employee.id, field, value)}
        className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 text-left w-full group border border-transparent hover:border-blue-200"
      >
        <span className="flex-1">{value || `Enter ${field}`}</span>
        <Edit3 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </button>
    );
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4">
          <User className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No employees yet</h3>
        <p className="text-slate-500 mb-6">Get started by adding your first team member</p>
        <button
          onClick={onAddEmployee}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mx-auto border-2 border-transparent hover:border-blue-300"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add First Employee</span>
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Name</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Position</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Hire Date</th>
            <th className="text-left py-4 px-4 font-semibold text-slate-900">Observations</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-slate-100 hover:bg-slate-50 group transition-colors duration-200">
              <td className="py-4 px-4">
                {renderEditableCell(employee, 'name', employee.name)}
              </td>
              <td className="py-4 px-4">
                {renderEditableCell(employee, 'position', employee.position)}
              </td>
              <td className="py-4 px-4">
                {renderEditableCell(employee, 'hireDate', employee.hireDate)}
              </td>
              <td className="py-4 px-4 max-w-xs">
                {renderEditableCell(employee, 'observations', employee.observations)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <button
          onClick={onAddEmployee}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium border-2 border-transparent hover:border-blue-200"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Employee</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;