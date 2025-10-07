import React, { useState, useEffect } from 'react';
import { Calculator, Home, BookOpen, DollarSign, Building, Briefcase, TrendingUp, LogOut, User } from 'lucide-react';
import HomePage from './components/HomePage';
import Introduction from './components/Introduction';
import SalaryIncome from './components/SalaryIncome';
import HouseProperty from './components/HouseProperty';
import BusinessProfession from './components/BusinessProfession';
import CapitalGains from './components/CapitalGains';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { CombinedAuthService } from './services/authService';

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
  const { user, loading, isAuthenticated, authType, logout, isSSO, isFirebase } = useAuth();

  const handleLogin = () => {
    // This will be handled by the useAuth hook automatically
  };

  const handleLogout = async () => {
    try {
      await logout();
      setActiveModule('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated (only for Firebase auth)
  if (!isAuthenticated && !isSSO) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Fixed Sidebar */}
        <div className="w-80 bg-white shadow-lg fixed h-full overflow-y-auto">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Income Tax Simulator</h1>
            <p className="text-sm text-gray-600">2nd Year - 4th Semester</p>
            {user && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-800 font-medium">
                    {user.name || 'Welcome back!'}
                  </p>
                  {isSSO && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      SSO
                    </span>
                  )}
                  {isFirebase && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Firebase
                    </span>
                  )}
                </div>
                <p className="text-xs text-blue-600 truncate">{user.email}</p>
                {user.yearOfStudy && (
                  <p className="text-xs text-blue-500 mt-1">{user.yearOfStudy}</p>
                )}
                {user.role && (
                  <p className="text-xs text-blue-500">{user.role}</p>
                )}
              </div>
            )}
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
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors mb-2 text-gray-700 hover:bg-red-50 hover:text-red-600 mt-4"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">
                {isSSO ? 'Return to BcomBuddy' : 'Logout'}
              </span>
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-80">
          <div className="p-8">
            {renderModule()}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default App;