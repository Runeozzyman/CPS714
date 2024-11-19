import { Fragment } from "react";
import Link from "next/link";
import LoginField from "./components/LoginField";

export default function Login() {
  return (
    <Fragment>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="w-full max-w-xs p-6 bg-white bg-opacity-80 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Login
          </h2>
          <LoginField />
          <a href="/register">
            <button className="w-full px-4 py-2  text-white bg-yellow-500 rounded hover:bg-yellow-800 focus:outline-none focus:ring focus:ring-yellow-900">
              Sign Up
            </button>
          </a>
          <br />
        </div>
      </div>
    </Fragment>
  );
}
