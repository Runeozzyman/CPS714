"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    router.push("/loginSuccess");
  };

  const handleRegister = (e: React.FormEvent) =>{
  e.preventDefault();  
  router.push("/register"); 


  }

  return (


    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/background.jpg')"}}>
      <div className="w-full max-w-xs p-6 bg-white bg-opacity-80 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>

        

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black">
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
            <label htmlFor="password" className="block text-sm font-medium text-black">
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


          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        <form onSubmit={handleRegister} className="space-y-4">
        
        <button
            type="submit"
            className="w-full py-2 text-white bg-yellow-500 rounded hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
}
