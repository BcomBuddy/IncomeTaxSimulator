import React, { useState } from 'react';
import { Calculator, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const HouseProperty: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'definitions' | 'calculator'>('definitions');
  const [propertyData, setPropertyData] = useState({
    propertyType: 'let-out',
    annualRent: '',
    municipalTaxes: '',
    repairsMaintenanceOwner: '',
    repairsMaintenanceTenant: '',
    vacancyAllowance: '',
    collectionCharges: '',
    interestOnLoan: '',
    otherExpenses: ''
  });
  const [calculation, setCalculation] = useState<any>(null);
  const [expandedDef, setExpandedDef] = useState<string>('');

  const definitions = [
    {
      id: 'house-def',
      title: 'Definition of House Property',
      content: "Any building or land appurtenant thereto, owned by assessee and used for residential or commercial purposes. Includes: Residential houses, commercial buildings, shops, godowns, factories (building portion)."
    },
    {
      id: 'exempted',
      title: 'Exempted House Property Incomes',
      content: `
        • Self-occupied property: No income is taxable (deemed annual value = NIL)
        • One self-occupied house property is completely exempt
        • Second self-occupied property: Deemed annual value = NIL but loan interest up to ₹2,00,000 is deductible
        • Property used for own business/profession: Exempt under this head
      `
    },
    {
      id: 'annual-value',
      title: 'Annual Value Computation',
      content: `
        For Let-out Property:
        Step 1: Determine Fair Rent, Municipal Value, Standard Rent
        Step 2: Expected Rent = Higher of Fair Rent and Municipal Value (subject to Standard Rent limit)
        Step 3: Annual Value = Higher of Expected Rent and Actual Rent received
        Step 4: Less: Municipal taxes paid by owner
        Step 5: Net Annual Value

        For Self-occupied: Annual Value = NIL
      `
    },
    {
      id: 'deductions',
      title: 'Deductions under Section 24',
      content: `
        • Standard Deduction: 30% of Net Annual Value
        • Interest on loan: Actual interest paid
          - Self-occupied: Maximum ₹2,00,000
          - Let-out property: No limit on interest deduction
        • Municipal taxes: Paid by owner (already deducted from Gross Annual Value)
      `
    }
  ];

  const calculateHouseProperty = () => {
    const annualRent = parseFloat(propertyData.annualRent) || 0;
    const municipalTaxes = parseFloat(propertyData.municipalTaxes) || 0;
    const repairsOwner = parseFloat(propertyData.repairsMaintenanceOwner) || 0;
    const vacancyAllowance = parseFloat(propertyData.vacancyAllowance) || 0;
    const collectionCharges = parseFloat(propertyData.collectionCharges) || 0;
    const interestOnLoan = parseFloat(propertyData.interestOnLoan) || 0;

    let grossAnnualValue, netAnnualValue, standardDeduction, totalDeductions, housePropertyIncome;

    if (propertyData.propertyType === 'self-occupied') {
      grossAnnualValue = 0;
      netAnnualValue = 0;
      standardDeduction = 0;
      const maxInterestDeduction = Math.min(interestOnLoan, 200000);
      totalDeductions = maxInterestDeduction;
      housePropertyIncome = 0 - totalDeductions;
    } else {
      grossAnnualValue = annualRent;
      netAnnualValue = grossAnnualValue - municipalTaxes;
      standardDeduction = netAnnualValue * 0.30;
      totalDeductions = standardDeduction + interestOnLoan;
      housePropertyIncome = netAnnualValue - totalDeductions;
    }

    setCalculation({
      grossAnnualValue,
      netAnnualValue,
      standardDeduction,
      interestDeduction: interestOnLoan,
      totalDeductions,
      housePropertyIncome,
      propertyType: propertyData.propertyType
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Income from House Property</h2>
      
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
          <h3 className="text-xl font-semibold text-gray-800 mb-6">House Property Income Calculator</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={propertyData.propertyType}
              onChange={(e) => setPropertyData({...propertyData, propertyType: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="let-out">Let-out Property</option>
              <option value="self-occupied">Self-occupied Property</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Property Details (Annual)</h4>
              <div className="space-y-4">
                {propertyData.propertyType === 'let-out' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Rent Received</label>
                      <input
                        type="number"
                        value={propertyData.annualRent}
                        onChange={(e) => setPropertyData({...propertyData, annualRent: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter annual rent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy Allowance</label>
                      <input
                        type="number"
                        value={propertyData.vacancyAllowance}
                        onChange={(e) => setPropertyData({...propertyData, vacancyAllowance: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter vacancy allowance"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Collection Charges</label>
                      <input
                        type="number"
                        value={propertyData.collectionCharges}
                        onChange={(e) => setPropertyData({...propertyData, collectionCharges: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter collection charges"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Municipal Taxes (paid by owner)</label>
                  <input
                    type="number"
                    value={propertyData.municipalTaxes}
                    onChange={(e) => setPropertyData({...propertyData, municipalTaxes: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter municipal taxes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest on Housing Loan</label>
                  <input
                    type="number"
                    value={propertyData.interestOnLoan}
                    onChange={(e) => setPropertyData({...propertyData, interestOnLoan: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter interest amount"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Additional Information</h4>
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                <h5 className="font-semibold mb-2">Calculation Notes:</h5>
                <ul className="space-y-1">
                  <li>• For self-occupied property, annual value is NIL</li>
                  <li>• Standard deduction is 30% of Net Annual Value</li>
                  <li>• Interest on loan for self-occupied property is limited to ₹2,00,000</li>
                  <li>• Municipal taxes are deducted from Gross Annual Value</li>
                  <li>• Loss from house property can be set-off against other income</li>
                </ul>
              </div>
              
              {propertyData.propertyType === 'self-occupied' && (
                <div className="mt-4 bg-green-50 p-4 rounded-lg text-sm text-green-700">
                  <h5 className="font-semibold mb-2">Self-occupied Property Rules:</h5>
                  <ul className="space-y-1">
                    <li>• Annual Value = NIL</li>
                    <li>• No standard deduction</li>
                    <li>• Interest deduction limited to ₹2,00,000</li>
                    <li>• Usually results in loss (negative income)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={calculateHouseProperty}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Calculate House Property Income
          </button>
          
          {calculation && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">Calculation Results</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {calculation.propertyType === 'let-out' ? (
                    <>
                      <div className="flex justify-between">
                        <span>Gross Annual Value:</span>
                        <span className="font-semibold">₹{calculation.grossAnnualValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Annual Value:</span>
                        <span className="font-semibold">₹{calculation.netAnnualValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Less: Standard Deduction (30%):</span>
                        <span>₹{calculation.standardDeduction.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Less: Interest on Loan:</span>
                        <span>₹{calculation.interestDeduction.toLocaleString()}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Annual Value (Self-occupied):</span>
                        <span className="font-semibold">₹0</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Less: Interest on Loan (max ₹2,00,000):</span>
                        <span>₹{Math.min(calculation.interestDeduction, 200000).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  <hr />
                  <div className={`flex justify-between text-lg font-bold ${
                    calculation.housePropertyIncome >= 0 ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    <span>Income from House Property:</span>
                    <span>₹{calculation.housePropertyIncome.toLocaleString()}</span>
                  </div>
                  {calculation.housePropertyIncome < 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      * This loss can be set-off against income from other heads
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <h5 className="font-semibold mb-2">Step-by-step Calculation:</h5>
                  <ol className="space-y-1 list-decimal list-inside">
                    {calculation.propertyType === 'let-out' ? (
                      <>
                        <li>Determine Gross Annual Value</li>
                        <li>Deduct municipal taxes for Net Annual Value</li>
                        <li>Calculate 30% standard deduction</li>
                        <li>Deduct interest on housing loan</li>
                        <li>Arrive at taxable income</li>
                      </>
                    ) : (
                      <>
                        <li>Annual Value for self-occupied = NIL</li>
                        <li>Deduct interest (limited to ₹2,00,000)</li>
                        <li>Result is usually a loss</li>
                        <li>Loss can be set-off against other income</li>
                      </>
                    )}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HouseProperty;