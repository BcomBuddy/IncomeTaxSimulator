import React, { useState } from 'react';
import { Calculator, BookOpen, Users, Target } from 'lucide-react';

const HomePage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const videoUrls = {
    english: 'https://www.youtube.com/embed/tPAtISMbBI8?rel=0&modestbranding=1',
    hindi: 'https://www.youtube.com/embed/9jVhB2Bv5wQ?rel=0&modestbranding=1',
    telugu: 'https://www.youtube.com/embed/PyLTC5aP7nA?rel=0&modestbranding=1'
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 flex flex-col items-center justify-center text-center py-10 mb-8">
        <h2 className="text-4xl font-bold text-white">Income Tax Simulator</h2>
        <p className="text-lg text-white mt-2 max-w-2xl">
          A comprehensive learning platform for B.Com students to understand Income Tax concepts, 
          calculations, and practical applications.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">🎥 Learn about this simulator</h3>
        
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-md">
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Video Language
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-colors duration-200"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi/Urdu</option>
              <option value="telugu">Telugu</option>
            </select>
          </div>
        </div>

        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src={videoUrls[selectedLanguage as keyof typeof videoUrls]}
            title="Income Tax Simulator Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <Calculator className="text-blue-600 mb-3" size={32} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Calculators</h3>
          <p className="text-gray-600">
            Step-by-step calculators for Salary, House Property, Business Income, and Capital Gains computations.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <BookOpen className="text-green-600 mb-3" size={32} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Concept Definitions</h3>
          <p className="text-gray-600">
            Clear definitions and examples for all Income Tax concepts as per your syllabus.
          </p>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <Users className="text-orange-600 mb-3" size={32} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Practice Problems</h3>
          <p className="text-gray-600">
            Sample problems with detailed solutions to help you practice and understand concepts better.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <Target className="text-purple-600 mb-3" size={32} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Self-Learning</h3>
          <p className="text-gray-600">
            Designed for independent study with comprehensive coverage of 2nd Year, 4th Semester syllabus.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use This Simulator</h3>
        <ol className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
            <span>Navigate through modules using the sidebar - each module covers specific topics from your syllabus.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
            <span>Start with definitions to understand key concepts, then use calculators for practical applications.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
            <span>Practice with sample problems and review step-by-step solutions to reinforce learning.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
            <span>All input fields are empty by default - simply click and type your values directly.</span>
          </li>
        </ol>
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Course Coverage</h3>
        <p className="mb-4">This simulator covers all major topics from your Income Tax syllabus:</p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Theory & Concepts:</h4>
            <ul className="space-y-1 opacity-90">
              <li>• Basic definitions and terminology</li>
              <li>• Residential status determination</li>
              <li>• Tax computation methods</li>
              <li>• Exemptions and deductions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Practical Applications:</h4>
            <ul className="space-y-1 opacity-90">
              <li>• Salary income calculations</li>
              <li>• House property computations</li>
              <li>• Business income determination</li>
              <li>• Capital gains assessments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;