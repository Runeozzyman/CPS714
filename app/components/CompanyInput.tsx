"use client";
import React from "react";

interface CompanyInputProps {
  company: string;
  setCompany: (company: string) => void;
  companies: string[]; // List of companies
}

const CompanyInput: React.FC<CompanyInputProps> = ({
  company,
  setCompany,
  companies,
}) => {
  return (
    <div>
      <label htmlFor="company" className="block text-sm font-medium text-black">
        Company Name:
      </label>
      <input
        list="company-list"
        type="text"
        id="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black "
        required
      />
      <datalist id="company-list">
        {companies.map((company, index) => (
          <option key={index} value={company} />
        ))}
      </datalist>
    </div>
  );
};

export default CompanyInput;
