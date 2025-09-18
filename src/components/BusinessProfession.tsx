import React, { useState } from 'react';
import { Calculator, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const BusinessProfession: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'definitions' | 'calculator'>('definitions');
  const [businessData, setBusinessData] = useState({
    incomeType: 'business',
    grossReceipts: '',
    directExpenses: '',
    officeRent: '',
    salariesWages: '',
    interestOnCapital: '',
    depreciation: '',
    badDebts: '',
    advertisement: '',
    insurance: '',
    repairsMaintenance: '',
    professionalFees: '',
    travelExpenses: '',
    otherAllowableExpenses: '',
    disallowedExpenses: ''
  });
  const [calculation, setCalculation] = useState<any>(null);
  const [expandedDef, setExpandedDef] = useState<string>('');

  const definitions = [
    {
      id: 'business-def',
      title: 'Definition of Business and Profession',
      content: `
        Business: Any trade, commerce, or manufacture, or any adventure or concern in the nature of trade, commerce, or manufacture.
        
        Profession: Vocation requiring knowledge of some department of learning or science.
        
        Examples:
        Business: Trading, manufacturing, transport, banking, construction
        Profession: Doctors, lawyers, architects, consultants, chartered accountants
      `
    },
    {
      id: 'computation',
      title: 'Computation Procedure',
      content: `
        Step 1: Calculate Gross Receipts/Turnover
        Step 2: Deduct allowable business expenses (Sections 30-37)
        Step 3: Add disallowed expenses back
        Step 4: Calculate depreciation as per Income Tax rules
        Step 5: Consider deemed profits (Section 44)
        Step 6: Arrive at taxable income from business/profession
      `
    },
    {
      id: 'expenses',
      title: 'Allowable vs Disallowed Expenses',
      content: `
        Allowable Expenses (Sections 30-37):
        • Rent, rates, taxes, repairs of business premises
        • Cost of raw materials and stock-in-trade
        • Salaries and wages to employees
        • Interest on borrowed capital for business
        • Insurance premiums
        • Legal and professional charges
        • Advertisement expenses
        • Bad debts actually written off
        • Depreciation on business assets

        Disallowed Expenses:
        • Personal expenses of proprietor/partners
        • Capital expenditure
        • Expenses not incurred wholly for business
        • Provision for doubtful debts
        • Interest on capital of proprietor/partners
        • Income tax and penalties
        • Expenses related to exempt income
      `
    },
    {
      id: 'depreciation',
      title: 'Depreciation Rules',
      content: `
        Conditions for Depreciation:
        • Asset must be owned by assessee
        • Used for business/profession purposes
        • Depreciation as per prescribed rates

        Common Depreciation Rates:
        • Building: 5% (10% for temporary structures)
        • Plant & Machinery: 15% (general), 30% (computers)
        • Furniture & Fixtures: 10%
        • Motor Cars: 15%
        • Computers: 60%

        Method: Written Down Value (WDV) method
        Formula: (WDV × Rate × Days used in year) / 365
      `
    }
  ];

  const calculateBusinessIncome = () => {
    const grossReceipts = parseFloat(businessData.grossReceipts) || 0;
    const directExpenses = parseFloat(businessData.directExpenses) || 0;
    const officeRent = parseFloat(businessData.officeRent) || 0;
    const salariesWages = parseFloat(businessData.salariesWages) || 0;
    const interestOnCapital = parseFloat(businessData.interestOnCapital) || 0;
    const depreciation = parseFloat(businessData.depreciation) || 0;
    const badDebts = parseFloat(businessData.badDebts) || 0;
    const advertisement = parseFloat(businessData.advertisement) || 0;
    const insurance = parseFloat(businessData.insurance) || 0;
    const repairsMaintenance = parseFloat(businessData.repairsMaintenance) || 0;
    const professionalFees = parseFloat(businessData.professionalFees) || 0;
    const travelExpenses = parseFloat(businessData.travelExpenses) || 0;
    const otherAllowableExpenses = parseFloat(businessData.otherAllowableExpenses) || 0;
    const disallowedExpenses = parseFloat(businessData.disallowedExpenses) || 0;

    const totalAllowableExpenses = directExpenses + officeRent + salariesWages + 
      depreciation + badDebts + advertisement + insurance + repairsMaintenance + 
      professionalFees + travelExpenses + otherAllowableExpenses;

    const netProfit = grossReceipts - totalAllowableExpenses;
    const taxableIncome = netProfit + disallowedExpenses;

    setCalculation({
      grossReceipts,
      totalAllowableExpenses,
      netProfit,
      disallowedExpenses,
      taxableIncome,
      incomeType: businessData.incomeType,
      breakdown: {
        directExpenses, officeRent, salariesWages, depreciation, badDebts,
        advertisement, insurance, repairsMaintenance, professionalFees,
        travelExpenses, otherAllowableExpenses
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Profits & Gains of Business or Profession</h2>
      
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
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Business/Profession Income Calculator</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Income Type</label>
            <select
              value={businessData.incomeType}
              onChange={(e) => setBusinessData({...businessData, incomeType: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="business">Business</option>
              <option value="profession">Profession</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Income & Major Expenses</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gross Receipts/Turnover</label>
                  <input
                    type="number"
                    value={businessData.grossReceipts}
                    onChange={(e) => setBusinessData({...businessData, grossReceipts: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter gross receipts"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Direct Expenses (Materials/Cost of Goods)</label>
                  <input
                    type="number"
                    value={businessData.directExpenses}
                    onChange={(e) => setBusinessData({...businessData, directExpenses: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter direct expenses"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Office Rent</label>
                  <input
                    type="number"
                    value={businessData.officeRent}
                    onChange={(e) => setBusinessData({...businessData, officeRent: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter office rent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salaries & Wages</label>
                  <input
                    type="number"
                    value={businessData.salariesWages}
                    onChange={(e) => setBusinessData({...businessData, salariesWages: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter salaries and wages"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Depreciation</label>
                  <input
                    type="number"
                    value={businessData.depreciation}
                    onChange={(e) => setBusinessData({...businessData, depreciation: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter depreciation amount"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Other Expenses</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bad Debts</label>
                  <input
                    type="number"
                    value={businessData.badDebts}
                    onChange={(e) => setBusinessData({...businessData, badDebts: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter bad debts written off"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advertisement</label>
                  <input
                    type="number"
                    value={businessData.advertisement}
                    onChange={(e) => setBusinessData({...businessData, advertisement: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter advertisement expenses"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
                  <input
                    type="number"
                    value={businessData.insurance}
                    onChange={(e) => setBusinessData({...businessData, insurance: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter insurance premiums"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Fees</label>
                  <input
                    type="number"
                    value={businessData.professionalFees}
                    onChange={(e) => setBusinessData({...businessData, professionalFees: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter professional fees"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Allowable Expenses</label>
                  <input
                    type="number"
                    value={businessData.otherAllowableExpenses}
                    onChange={(e) => setBusinessData({...businessData, otherAllowableExpenses: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter other allowable expenses"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disallowed Expenses</label>
                  <input
                    type="number"
                    value={businessData.disallowedExpenses}
                    onChange={(e) => setBusinessData({...businessData, disallowedExpenses: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter disallowed expenses"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={calculateBusinessIncome}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Calculate {businessData.incomeType === 'business' ? 'Business' : 'Professional'} Income
          </button>
          
          {calculation && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">Calculation Results</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Gross Receipts:</span>
                    <span className="font-semibold">₹{calculation.grossReceipts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Less: Total Allowable Expenses:</span>
                    <span>₹{calculation.totalAllowableExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Profit:</span>
                    <span className="font-semibold">₹{calculation.netProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Add: Disallowed Expenses:</span>
                    <span>₹{calculation.disallowedExpenses.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold text-blue-600">
                    <span>Taxable {calculation.incomeType === 'business' ? 'Business' : 'Professional'} Income:</span>
                    <span>₹{calculation.taxableIncome.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <h5 className="font-semibold mb-2">Expense Breakdown:</h5>
                  <ul className="space-y-1">
                    <li>Direct Expenses: ₹{calculation.breakdown.directExpenses.toLocaleString()}</li>
                    <li>Office Rent: ₹{calculation.breakdown.officeRent.toLocaleString()}</li>
                    <li>Salaries & Wages: ₹{calculation.breakdown.salariesWages.toLocaleString()}</li>
                    <li>Depreciation: ₹{calculation.breakdown.depreciation.toLocaleString()}</li>
                    <li>Other Expenses: ₹{(calculation.breakdown.badDebts + calculation.breakdown.advertisement + 
                      calculation.breakdown.insurance + calculation.breakdown.professionalFees + 
                      calculation.breakdown.otherAllowableExpenses).toLocaleString()}</li>
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

export default BusinessProfession;