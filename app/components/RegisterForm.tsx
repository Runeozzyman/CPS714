"use client";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { handleRegister } from "../services/handleRegister"; // Adjust the path as necessary
import RoleSelector from "../components/RoleSelector"; // Adjust the path as necessary
import CompanyInput from "../components/CompanyInput"; // Import the CompanyInput component

export default function RegisterForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState({ id: 1, name: "Driver" }); // New state for selected role
  const [company, setCompany] = useState(""); // State for company name
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");

    const newUser = {
      fullname,
      username,
      email,
      password,
      phone,
      role: selectedRole.name,
      loyaltypoints: 0,
      company,
    };

    try {
      const response = await fetch("http://127.0.0.1:8080/api/database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        router.push("/Home");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Registration failed");
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-xs p-6 bg-white bg-opacity-90 rounded shadow-md "
      >
        <h1 className="text-center text-4xl font-bold text-black">Sign Up</h1>
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-black"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-black"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-black"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-black"
          >
            Phone Number:
          </label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>
        <RoleSelector
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        {selectedRole.name === "Fleet Manager" && (
          <CompanyInput company={company} setCompany={setCompany} />
        )}
        {errorMessage && (
          <p className="text-center text-red-500">Error: {errorMessage}</p>
        )}
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
}
