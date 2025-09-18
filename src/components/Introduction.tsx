import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const Introduction: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string>('');

  const sections = [
    {
      id: 'taxes',
      title: 'Direct & Indirect Taxes',
      content: {
        definition: "Direct Tax: Tax levied directly on income or wealth of individuals/entities. Indirect Tax: Tax levied on goods and services, passed to consumers.",
        examples: "Direct: Income Tax, Wealth Tax. Indirect: GST, Customs Duty, Excise Duty."
      }
    },
    {
      id: 'canons',
      title: 'Canons of Taxation',
      content: {
        definition: "Principles of good tax system proposed by Adam Smith: Equity, Certainty, Convenience, Economy.",
        examples: "Equity: Tax based on ability to pay. Certainty: Clear tax rates and rules. Convenience: Easy payment methods. Economy: Low collection costs."
      }
    },
    {
      id: 'history',
      title: 'History & Features of Income Tax in India',
      content: {
        definition: "Income Tax introduced in 1860. Current Act: Income Tax Act, 1961. Features: Progressive taxation, Multiple heads of income, Various exemptions and deductions.",
        examples: "Assessment Year: 2024-25, Previous Year: 2023-24. Tax rates increase with income levels."
      }
    },
    {
      id: 'definitions',
      title: 'Basic Concepts & Definitions',
      content: {
        definition: "Key terms essential for Income Tax understanding:",
        examples: `
          • Assessee: Person liable to pay tax
          • Assessment Year: Year in which income is assessed (follows Previous Year)
          • Previous Year: Year in which income is earned
          • Person: Individual, Company, Firm, AOP, BOI, etc.
          • Agricultural Income: Income from land used for agricultural purposes (exempt)
          • Gross Total Income: Total income under all heads before Chapter VI-A deductions
          • Total Income: Income after all deductions and exemptions
        `
      }
    },
    {
      id: 'residential',
      title: 'Residential Status & Scope',
      content: {
        definition: "Determines tax liability scope. Types: Resident & Ordinarily Resident (ROR), Resident but Not Ordinarily Resident (RNOR), Non-Resident (NR).",
        examples: `
          Conditions for Individual:
          • Resident: In India for 182+ days OR 60+ days (with 365+ days in 4 preceding years)
          • Ordinarily Resident: Resident in India in 2 out of 10 preceding years AND 730+ days in 7 preceding years
          
          Tax Scope:
          • ROR: Taxed on worldwide income
          • RNOR: Indian income + foreign income received/accrued in India
          • NR: Only Indian income taxed
        `
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Introduction to Income Tax</h2>
      
      <div className="space-y-4 mb-8">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border">
            <button
              className="w-full flex items-center justify-between p-4 text-left"
              onClick={() => setExpandedSection(expandedSection === section.id ? '' : section.id)}
            >
              <span className="text-lg font-semibold text-gray-800">{section.title}</span>
              {expandedSection === section.id ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {expandedSection === section.id && (
              <div className="px-4 pb-4">
                <div className="bg-blue-50 p-4 rounded-lg mb-3">
                  <h4 className="font-semibold text-blue-800 mb-2">Definition:</h4>
                  <p className="text-blue-700">{section.content.definition}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-green-700 whitespace-pre-line">{section.content.examples}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Introduction;