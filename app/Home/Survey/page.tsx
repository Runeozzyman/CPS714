"use client";

import { useState, useEffect } from 'react';
import { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup } from 'pdf-lib';

type FormData = {
  [key: string]: string;
};

// List of required fields
const REQUIRED_FIELDS = [
  "Name",
  "DayOB",
  "MonthOB",
  "YearOB",
  "Civil Status",
  "Gender",
  "Gender_NotListed",
  "Address_Unit",
  "Address_StreetNo",
  "Address_Street",
  "Address_Town",
  "Address_State",
  "Address_Zip",
  "Address_Country",
  "Satasfied",
  "Recommend",
  "Navigate",
  "ClearInstructions",
  "SatasfiedRewards",
  "Quality",
  "SatasfiedRedeeming",
  "SatasfiedResponse",
  "Informed",
  "Improvement",
  "userID"
];

export default function UploadPage() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [userID, setUserID] = useState<string | null>(null);

  // Fetch userID from the API on component mount
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/username", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setUserID(data.username); 
        } else {
          console.error("Failed to fetch user ID");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserID();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Extract fields from the PDF
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      const data: FormData = { userID: userID || '' }; // Start with userID if it's available

      fields.forEach((field) => {
        const fieldName = field.getName();

        // Retrieve field value based on type
        if (field instanceof PDFTextField) {
          data[fieldName] = field.getText() || '';  // Text field value
        } else if (field instanceof PDFCheckBox) {
          data[fieldName] = field.isChecked() ? 'Checked' : 'Unchecked';  // Checkbox value
        } else if (field instanceof PDFRadioGroup) {
          data[fieldName] = field.getSelected() || '';  // Selected radio button value
        } else {
          data[fieldName] = '';  // Default for unsupported types
        }
      });

     // Validate the fields against the required fields
      const missing = REQUIRED_FIELDS.filter(field => !(field in data));
      if (missing.length > 0) {
        setMissingFields(["Missing required fields"]);
        setFormData(null);  // Clear formData if there are missing fields
      } else {
        setMissingFields([]);
        setFormData(data);
      }
    }
  };

  const handleSubmit = async () => {
    if (formData) {
      try {
        const response = await fetch('/api/submitSurvey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setResponseMessage('Data submitted successfully.');
        } else {
          setResponseMessage('Failed to submit data.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setResponseMessage('An error occurred while submitting.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Upload PDF</h1>
        <p className="text-gray-600 mb-4">Submit your survey data by uploading a PDF file.</p>
  
        {/* Link to download the PDF template */}
        <a
          href="/FleetOptics_Survey.pdf"
          download
          className="inline-block text-blue-500 hover:underline"
        >
          Download PDF Template
        </a>
  
        {/* Horizontal line to create a row and provide visual separation */}
        <hr className="my-6 border-gray-300" />
  
        <label className="cursor-pointer inline-block mb-6">
          <span className="block bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">
            Choose PDF File
          </span>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
  
        {missingFields.length > 0 && (
          <div className="text-red-500 mb-4">
            <h2 className="font-semibold">Error: Missing required fields</h2>
            <ul className="list-disc list-inside">
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        )}
  
        {formData && (
          <>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit Data
            </button>
            {responseMessage && <p className="text-green-600 mt-4">{responseMessage}</p>}
            {/* <div className="mt-6 p-4 bg-gray-100 rounded text-left max-h-80 overflow-auto">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Data:</h2>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap">{JSON.stringify(formData, null, 2)}</pre>
            </div> */}
          </>
        )}
      </div>
    </div>
  );  
}