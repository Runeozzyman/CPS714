"use client";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { handleRegister } from "../services/handleRegister"; // Adjust the path as necessary
import RoleSelector from "../components/RoleSelector"; // Adjust the path as necessary

export default function RegisterForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState({ id: 1, name: "Admin" }); // New state for selected role
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");
    handleRegister(
      e,
      fullname,
      email,
      password,
      phone,
      selectedRole.name, // Pass the selected role name
      setErrorMessage,
      router
    );
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-black dark:text-white"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black dark:text-white"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black dark:text-white"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-black dark:text-white"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-black dark:text-white"
          >
            Phone Number:
          </label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>
        <RoleSelector
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        {errorMessage && (
          <p className="text-center text-red-500 dark:text-red-400">
            Error: {errorMessage}
          </p>
        )}
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
}
