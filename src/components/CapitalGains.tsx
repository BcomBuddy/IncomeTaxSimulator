import React, { useState } from 'react';
import { Calculator, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const CapitalGains: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'definitions' | 'calculator'>('definitions');
  const [capitalGainsData, setCapitalGainsData] = useState({
    assetType: 'STCA',
    salePrice: '',
    purchasePrice: '',
    improvementCost: '',
    transferExpenses: '',
    purchaseDate: '',
    saleDate: ''
  });
  const [otherSourcesData, setOtherSourcesData] = useState({
    dividends: '',
    interestOnSecurities: '',
    winnings: '',
    gifts: '',
    familyPension: '',
    casualIncome: '',
    otherIncome: ''
  });
  const [calculation, setCalculation] = useState<any>(null);
  const [expandedDef, setExpandedDef] = useState<string>('');
  const [calculatorType, setCalculatorType] = useState<'capital-gains' | 'other-sources'>('capital-gains');

  const definitions = [
    {
      id: 'capital-gains-def',
      title: 'Capital Gains - Meaning & Scope',
      content: `
        Capital Gains: Profit arising from transfer of capital asset.
        
        Scope: Includes gains from sale, exchange, relinquishment, or transfer of capital assets.
        
        Capital Asset: Any property held by assessee (except stock-in-trade, personal effects worth ≤₹50,000, agricultural land in rural areas, gold deposit bonds, etc.)
      `
    },
    {
      id: 'asset-types',
      title: 'Short-term vs Long-term Assets',
      content: `
        Short-term Capital Asset (STCA):
        • Held for ≤ 36 months (≤ 24 months for shares & securities from FY 2023-24)
        • Gains taxed at normal slab rates
        
        Long-term Capital Asset (LTCA):
        • Held for > 36 months (> 24 months for shares & securities from FY 2023-24)
        • Gains taxed at 20% with indexation benefit
        • Equity shares/units: 10% without indexation if > ₹1 lakh
      `
    },
    {
      id: 'computation',
      title: 'Computation of Capital Gains',
      content: `
        Formula: Sale Price - (Cost of Acquisition + Improvement Cost + Transfer Expenses)
        
        For LTCG: Indexation benefit available
        Indexed Cost = (Cost × CII of sale year) / CII of purchase year
        
        Exemptions u/s 54: Available for LTCG on residential house property
        • Section 54: Reinvestment in residential property
        • Section 54F: Investment in residential property (other assets)
        • Section 54EC: Investment in specified bonds
      `
    },
    {
      id: 'other-sources-def',
      title: 'Income from Other Sources',
      content: `
        Definition: Residual head of income - income not falling under other four heads.
        
        General [Section 56(1)]: Any income not chargeable under other heads
        
        Specific [Section 56(2)]:
        • Dividends (except exempt dividends)
        • Interest on securities
        • Winnings from lotteries, crossword puzzles, races, etc.
        • Gifts exceeding ₹50,000 (from non-relatives)
        • Family pension (after deduction of ₹15,000 or 1/3rd, whichever is less)
        • Casual and non-recurring receipts
        • Income from letting of plant, machinery, furniture
      `
    }
  ];

  const calculateCapitalGains = () => {
    const salePrice = parseFloat(capitalGainsData.salePrice) || 0;
    const purchasePrice = parseFloat(capitalGainsData.purchasePrice) || 0;
    const improvementCost = parseFloat(capitalGainsData.improvementCost) || 0;
    const transferExpenses = parseFloat(capitalGainsData.transferExpenses) || 0;

    const totalCost = purchasePrice + improvementCost + transferExpenses;
    const capitalGain = salePrice - totalCost;
    
    // Simplified tax calculation (without actual indexation)
    let taxableGain = capitalGain;
    let taxRate = '';
    
    if (capitalGainsData.assetType === 'STCA') {
      taxRate = 'Normal slab rates';
    } else {
      taxRate = '20% (with indexation) or 10% (equity shares > ₹1 lakh)';
    }

    setCalculation({
      salePrice,
      totalCost,
      capitalGain,
      taxableGain,
      taxRate,
      assetType: capitalGainsData.assetType
    });
  };

  const calculateOtherSources = () => {
    const dividends = parseFloat(otherSourcesData.dividends) || 0;
    const interestOnSecurities = parseFloat(otherSourcesData.interestOnSecurities) || 0;
    const winnings = parseFloat(otherSourcesData.winnings) || 0;
    const gifts = parseFloat(otherSourcesData.gifts) || 0;
    const familyPension = parseFloat(otherSourcesData.familyPension) || 0;
    const casualIncome = parseFloat(otherSourcesData.casualIncome) || 0;
    const otherIncome = parseFloat(otherSourcesData.otherIncome) || 0;

    // Family pension deduction
    const familyPensionDeduction = Math.min(15000, familyPension / 3);
    const taxableFamilyPension = Math.max(0, familyPension - familyPensionDeduction);

    // Gift exemption (assuming from non-relatives)
    const taxableGifts = Math.max(0, gifts - 50000);

    const totalOtherSources = dividends + interestOnSecurities + winnings + taxableGifts + 
                              taxableFamilyPension + casualIncome + otherIncome;

    setCalculation({
      dividends,
      interestOnSecurities,
      winnings,
      gifts,
      taxableGifts,
      familyPension,
      familyPensionDeduction,
      taxableFamilyPension,
      casualIncome,
      otherIncome,
      totalOtherSources
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Capital Gains & Income from Other Sources</h2>
      
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
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCalculatorType('capital-gains')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                calculatorType === 'capital-gains' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Capital Gains
            </button>
            <button
              onClick={() => setCalculatorType('other-sources')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                calculatorType === 'other-sources' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Other Sources
            </button>
          </div>

          {calculatorType === 'capital-gains' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Capital Gains Calculator</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
                <select
                  value={capitalGainsData.assetType}
                  onChange={(e) => setCapitalGainsData({...capitalGainsData, assetType: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="STCA">Short-term Capital Asset</option>
                  <option value="LTCA">Long-term Capital Asset</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                    <input
                      type="number"
                      value={capitalGainsData.salePrice}
                      onChange={(e) => setCapitalGainsData({...capitalGainsData, salePrice: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter sale price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price (Cost of Acquisition)</label>
                    <input
                      type="number"
                      value={capitalGainsData.purchasePrice}
                      onChange={(e) => setCapitalGainsData({...capitalGainsData, purchasePrice: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter purchase price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Improvement Cost</label>
                    <input
                      type="number"
                      value={capitalGainsData.improvementCost}
                      onChange={(e) => setCapitalGainsData({...capitalGainsData, improvementCost: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter improvement cost"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Expenses</label>
                    <input
                      type="number"
                      value={capitalGainsData.transferExpenses}
                      onChange={(e) => setCapitalGainsData({...capitalGainsData, transferExpenses: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter transfer expenses"
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                  <h5 className="font-semibold mb-2">Calculation Notes:</h5>
                  <ul className="space-y-1">
                    <li>• STCA: Held ≤ 24 months (shares) or ≤ 36 months (other assets)</li>
                    <li>• LTCA: Held {'>'} 24 months (shares) or {'>'} 36 months (other assets)</li>
                    <li>• STCG: Taxed at normal slab rates</li>
                    <li>• LTCG: 20% with indexation or 10% for equity ({'>'} ₹1 lakh)</li>
                    <li>• Transfer expenses include brokerage, registration, etc.</li>
                  </ul>
                </div>
              </div>
              
              <button
                onClick={calculateCapitalGains}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Calculate Capital Gains
              </button>
              
              {calculation && !calculation.totalOtherSources && (
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-4">Calculation Results</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sale Price:</span>
                      <span className="font-semibold">₹{calculation.salePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Less: Total Cost:</span>
                      <span>₹{calculation.totalCost.toLocaleString()}</span>
                    </div>
                    <hr />
                    <div className={`flex justify-between text-lg font-bold ${
                      calculation.capitalGain >= 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      <span>{calculation.assetType} Gain:</span>
                      <span>₹{calculation.capitalGain.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-3">
                      <p><strong>Tax Rate:</strong> {calculation.taxRate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {calculatorType === 'other-sources' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Income from Other Sources Calculator</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dividends</label>
                    <input
                      type="number"
                      value={otherSourcesData.dividends}
                      onChange={(e) => setOtherSourcesData({...otherSourcesData, dividends: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter dividend income"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest on Securities</label>
                    <input
                      type="number"
                      value={otherSourcesData.interestOnSecurities}
                      onChange={(e) => setOtherSourcesData({...otherSourcesData, interestOnSecurities: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter interest on securities"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Winnings (Lottery/Races)</label>
                    <input
                      type="number"
                      value={otherSourcesData.winnings}
                      onChange={(e) => setOtherSourcesData({...otherSourcesData, winnings: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter winnings"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gifts from Non-relatives</label>
                    <input
                      type="number"
                      value={otherSourcesData.gifts}
                      onChange={(e) => setOtherSourcesData({...otherSourcesData, gifts: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter gift amount"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Family Pension</label>
                    <input
                      type="number"
                      value={otherSourcesData.familyPension}
                      onChange={(e) => setOtherSourcesData({...otherSourcesData, familyPension: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter family pension"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Casual Income</label>
                    <input
                      type="number"
                      value={otherSourcesData.casualIncome}
                      onChange={(e) => setOtherSourcesData({...otherSourcesData, casualIncome: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter casual income"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Other Income</label>
                    <input
                      type="number"
                      value={otherSourcesData.otherIncome}
                      onChange={(e) => setOtherSourcesData({...otherSourcesData, otherIncome: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter other income"
                    />
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg text-sm text-green-700">
                    <h5 className="font-semibold mb-2">Exemptions & Deductions:</h5>
                    <ul className="space-y-1">
                      <li>• Gifts: ₹50,000 exemption from non-relatives</li>
                      <li>• Family Pension: ₹15,000 or 1/3rd deduction</li>
                      <li>• Winnings: Fully taxable at source</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <button
                onClick={calculateOtherSources}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Calculate Other Sources Income
              </button>
              
              {calculation && calculation.totalOtherSources !== undefined && (
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-4">Calculation Results</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Dividends:</span>
                        <span>₹{calculation.dividends.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest on Securities:</span>
                        <span>₹{calculation.interestOnSecurities.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Winnings:</span>
                        <span>₹{calculation.winnings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Gifts:</span>
                        <span>₹{calculation.taxableGifts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Family Pension:</span>
                        <span>₹{calculation.taxableFamilyPension.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other Income:</span>
                        <span>₹{(calculation.casualIncome + calculation.otherIncome).toLocaleString()}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold text-green-600">
                        <span>Total Other Sources Income:</span>
                        <span>₹{calculation.totalOtherSources.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <h5 className="font-semibold mb-2">Applied Deductions:</h5>
                      <ul className="space-y-1">
                        <li>Family Pension deduction: ₹{calculation.familyPensionDeduction.toLocaleString()}</li>
                        <li>Gift exemption: ₹{Math.min(50000, calculation.gifts).toLocaleString()}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CapitalGains;