"use client";
import React, { useEffect, useState } from "react";

interface CompanyInputProps {
  company: string;
  setCompany: (company: string) => void;
}

const CompanyInput: React.FC<CompanyInputProps> = ({ company, setCompany }) => {
  const [companies, setCompanies] = useState<string[]>([]); // State for list of companies

  useEffect(() => {
    // Fetch the list of companies from the backend
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8080/api/database/companies"
        );
        const data = await response.json();
        setCompanies(data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

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
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
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
