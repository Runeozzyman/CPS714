"use client";

import { useState, FormEvent, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    topic: "",
    explanation: "",
    userID: "",
  });
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);

  // Fetch topics from the new API route on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/getTopics");
        if (response.ok) {
          const data = await response.json();
          setTopics(data);
        } else {
          console.error("Failed to fetch topics");
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  // Fetch userID from the /api/username endpoint on component mount
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/username", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setFormData((prevFormData) => ({
            ...prevFormData,
            userID: data.username,
          }));
        } else {
          console.error("Failed to fetch user ID");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserID();
  }, []);

  // Update state when input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submitFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message);
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          topic: "",
          explanation: "",
          userID: "",
        });
      } else {
        setResponseMessage("Failed to submit data.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResponseMessage("An error occurred.");
    }
  };

  return (
    <div className="App flex items-center justify-center min-h-screen">
      <section className="p-8 rounded-lg shadow-md w-96 space-y-4 bg-white">
        <h1 className="text-center text-2xl font-medium">Feedback Form</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="leading-7 text-sm text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter your Phone Number"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="topic" className="leading-7 text-sm text-gray-600">
              Topic / Issue Of Concern
            </label>
            <select
              id="topic"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.topic}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              id="explanation"
              placeholder="Explanation / Reasoning"
              className="w-full p-2 h-32 border border-gray-300 rounded placeholder-gray-400 resize-none"
              value={formData.explanation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-2 w-full">
            <button
              type="submit"
              className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </div>
        </form>
        {responseMessage && <p style={{ color: '#4CAF50' }} className="text-center mt-4">{responseMessage}</p>}
      </section>
    </div>
  );
}
