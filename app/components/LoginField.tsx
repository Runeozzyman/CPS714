"use client";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "../services/handleLogin"; // Adjust the path as necessary

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <Fragment>
      <form
        onSubmit={(e) =>
          handleLogin(e, username, password, setErrorMessage, router)
        }
        className="space-y-4"
      >
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
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
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
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </Fragment>
  );
}
