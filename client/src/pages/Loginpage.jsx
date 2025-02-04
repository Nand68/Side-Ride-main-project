import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { username, password };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    if (res.ok) {
      const data = await res.json();
      toast.success(`Login successful`);
      return navigate("/dashboard");
    } else {
      toast.error(`Please check your credentials`);
      return navigate("/login");
    }
  };

  return (
    <main className="h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Header and Info */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-blue-100 mb-4">Sign in to your SideRide account</p>
            <div className="hidden md:block">
              <p className="mb-2 text-sm">✓ Access your ride history</p>
              <p className="mb-2 text-sm">✓ Manage your preferences</p>
              <p className="text-sm">✓ Get exclusive offers</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6">
            <form onSubmit={loginSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  maxLength="30"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  maxLength="30"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Sign In
              </button>

              {/* Signup Link */}
              <div className="text-center text-xs text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loginpage;