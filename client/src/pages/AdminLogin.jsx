import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Connection error. Please try again.");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="bg-gray-800 text-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-orange-500">Side</span>
            <span className="text-white">Ride</span>
          </h1>
          <h2 className="text-xl text-gray-400">Admin Portal</h2>
        </div>

        <form onSubmit={loginSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white 
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                         transition-all duration-200"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white 
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                         transition-all duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                     text-white font-semibold rounded-lg shadow-lg
                     transform transition-all duration-200 hover:scale-[1.02]
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;