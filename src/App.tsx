import React, { useState } from 'react';
import { Calculator, Home, BookOpen, DollarSign, Building, Briefcase, TrendingUp } from 'lucide-react';
import HomePage from './components/HomePage';
import Introduction from './components/Introduction';
import SalaryIncome from './components/SalaryIncome';
import HouseProperty from './components/HouseProperty';
import BusinessProfession from './components/BusinessProfession';
import CapitalGains from './components/CapitalGains';

const modules = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'introduction', name: 'Introduction', icon: BookOpen },
  { id: 'salary', name: 'Income from Salaries', icon: DollarSign },
  { id: 'house-property', name: 'Income from House Property', icon: Building },
  { id: 'business', name: 'Profits & Gains of Business/Profession', icon: Briefcase },
  { id: 'capital-gains', name: 'Capital Gains & Other Sources', icon: TrendingUp },
];

function App() {
  const [activeModule, setActiveModule] = useState('home');

  const renderModule = () => {
    switch (activeModule) {
      case 'home': return <HomePage />;
      case 'introduction': return <Introduction />;
      case 'salary': return <SalaryIncome />;
      case 'house-property': return <HouseProperty />;
      case 'business': return <BusinessProfession />;
      case 'capital-gains': return <CapitalGains />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="w-80 bg-white shadow-lg fixed h-full overflow-y-auto">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Income Tax Simulator</h1>
          <p className="text-sm text-gray-600">2nd Year - 4th Semester</p>
        </div>
        
        <nav className="p-4">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors mb-2 ${
                  activeModule === module.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{module.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-80">
        <div className="p-8">
          {renderModule()}
        </div>
      </div>
    </div>
  );
}

export default App;