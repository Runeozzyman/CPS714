import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import Link from "next/link";
import LoginField from "./components/LoginField";

export default function Login() {
  /*const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/register");
  };*/

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
          <button className="w-full py-2 text-white bg-yellow-500 rounded hover:bg-yellow-800 focus:outline-none focus:ring focus:ring-yellow-900">
            <Link href={"/register"}>Register</Link>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
