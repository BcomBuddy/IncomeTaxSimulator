import React, { useState } from 'react';
import { Calculator, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const SalaryIncome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'definitions' | 'calculator'>('definitions');
  const [salaryData, setSalaryData] = useState({
    basicSalary: '',
    hra: '',
    specialAllowance: '',
    bonus: '',
    commission: '',
    perquisites: '',
    profitsInLieu: '',
    entertainmentAllowance: '',
    professionalTax: '',
    providentFund: ''
  });
  const [calculation, setCalculation] = useState<any>(null);
  const [expandedDef, setExpandedDef] = useState<string>('');

  const definitions = [
    {
      id: 'salary-def',
      title: 'Definition & Characteristics of Salary',
      content: "Salary includes all forms of remuneration received by an employee from employer. Characteristics: Regular payment, employer-employee relationship, for services rendered."
    },
    {
      id: 'components',
      title: 'Components of Salary [Section 17(1)]',
      content: `
        • Basic Salary: Fixed monthly remuneration
        • Dearness Allowance: Cost of living adjustment
        • Bonus: Additional payment based on performance
        • Commission: Percentage-based earnings
        • House Rent Allowance (HRA): For accommodation
        • Special Allowances: Transport, medical, etc.
        • Perquisites: Benefits in kind (company car, accommodation)
        • Profits in lieu of salary: Compensation instead of salary
      `
    },
    {
      id: 'deductions',
      title: 'Deductions under Section 16',
      content: `
        • Entertainment Allowance: Maximum ₹5,000 or 20% of salary
        • Professional Tax: State-levied tax on professions
        • Employee's Provident Fund: Statutory contribution
        • Standard Deduction: ₹50,000 (for FY 2023-24)
      `
    }
  ];

  const calculateSalary = () => {
    const basic = parseFloat(salaryData.basicSalary) || 0;
    const hra = parseFloat(salaryData.hra) || 0;
    const special = parseFloat(salaryData.specialAllowance) || 0;
    const bonus = parseFloat(salaryData.bonus) || 0;
    const commission = parseFloat(salaryData.commission) || 0;
    const perquisites = parseFloat(salaryData.perquisites) || 0;
    const profitsInLieu = parseFloat(salaryData.profitsInLieu) || 0;
    const entAllowance = parseFloat(salaryData.entertainmentAllowance) || 0;
    const profTax = parseFloat(salaryData.professionalTax) || 0;
    const pf = parseFloat(salaryData.providentFund) || 0;

    const grossSalary = basic + hra + special + bonus + commission + perquisites + profitsInLieu;
    
    // HRA Exemption calculation (simplified)
    const hraExemption = Math.min(hra, basic * 0.5, hra - basic * 0.1);
    
    // Entertainment Allowance exemption
    const entExemption = Math.min(entAllowance, 5000, basic * 0.2);
    
    const totalDeductions = profTax + pf + entExemption + 50000; // Including standard deduction
    const netSalaryIncome = grossSalary - hraExemption - totalDeductions;

    setCalculation({
      grossSalary,
      hraExemption,
      entExemption,
      totalDeductions,
      netSalaryIncome,
      breakdown: {
        basic, hra, special, bonus, commission, perquisites, profitsInLieu,
        entAllowance, profTax, pf, standardDeduction: 50000
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Income from Salaries</h2>
      
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'definitions', label: 'Definitions', icon: FileText },
          { key: 'calculator', label: 'Calculator', icon: Calculator }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'definitions' && (
        <div className="space-y-4">
          {definitions.map((def) => (
            <div key={def.id} className="bg-white rounded-lg shadow-sm border">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpandedDef(expandedDef === def.id ? '' : def.id)}
              >
                <span className="text-lg font-semibold text-gray-800">{def.title}</span>
                {expandedDef === def.id ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {expandedDef === def.id && (
                <div className="px-4 pb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700 whitespace-pre-line">{def.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'calculator' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Salary Income Calculator</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Income Components (Annual)</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                  <input
                    type="number"
                    value={salaryData.basicSalary}
                    onChange={(e) => setSalaryData({...salaryData, basicSalary: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter basic salary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">House Rent Allowance (HRA)</label>
                  <input
                    type="number"
                    value={salaryData.hra}
                    onChange={(e) => setSalaryData({...salaryData, hra: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter HRA amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Allowance</label>
                  <input
                    type="number"
                    value={salaryData.specialAllowance}
                    onChange={(e) => setSalaryData({...salaryData, specialAllowance: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter special allowance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
                  <input
                    type="number"
                    value={salaryData.bonus}
                    onChange={(e) => setSalaryData({...salaryData, bonus: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter bonus amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commission</label>
                  <input
                    type="number"
                    value={salaryData.commission}
                    onChange={(e) => setSalaryData({...salaryData, commission: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter commission"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Deductions & Other Components</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Perquisites</label>
                  <input
                    type="number"
                    value={salaryData.perquisites}
                    onChange={(e) => setSalaryData({...salaryData, perquisites: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter perquisites value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entertainment Allowance</label>
                  <input
                    type="number"
                    value={salaryData.entertainmentAllowance}
                    onChange={(e) => setSalaryData({...salaryData, entertainmentAllowance: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter entertainment allowance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Tax</label>
                  <input
                    type="number"
                    value={salaryData.professionalTax}
                    onChange={(e) => setSalaryData({...salaryData, professionalTax: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter professional tax paid"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provident Fund (Employee's Contribution)</label>
                  <input
                    type="number"
                    value={salaryData.providentFund}
                    onChange={(e) => setSalaryData({...salaryData, providentFund: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter PF contribution"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={calculateSalary}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Calculate Taxable Salary Income
          </button>
          
          {calculation && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">Calculation Results</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Gross Salary:</span>
                    <span className="font-semibold">₹{calculation.grossSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Less: HRA Exemption:</span>
                    <span>₹{calculation.hraExemption.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Less: Entertainment Allowance Exemption:</span>
                    <span>₹{calculation.entExemption.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Less: Other Deductions:</span>
                    <span>₹{(calculation.totalDeductions - calculation.entExemption).toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold text-blue-600">
                    <span>Taxable Salary Income:</span>
                    <span>₹{calculation.netSalaryIncome.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <h5 className="font-semibold mb-2">Calculation Notes:</h5>
                  <ul className="space-y-1">
                    <li>• HRA exemption is least of actual HRA, 50% of basic, or excess over 10% of basic</li>
                    <li>• Entertainment allowance exemption is least of actual, ₹5,000, or 20% of salary</li>
                    <li>• Standard deduction of ₹50,000 is automatically applied</li>
                    <li>• Professional tax and PF contributions are fully deductible</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SalaryIncome;