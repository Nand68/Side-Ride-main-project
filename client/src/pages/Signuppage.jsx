import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signuppage = () => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (res.ok) {
      toast.success(`Signup success`);
      return navigate("/login");
    } else {
      toast.error(`Please check the input data`);
      return navigate("/signup");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = {
      userName,
      name,
      gender,
      age,
      email,
      phone,
      password
    };

    signupSubmit(userDetails);
  };

  return (
    <main className="h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Header and Info */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">Welcome to SideRide</h2>
            <p className="text-blue-100 mb-4">Join our community of riders and drivers</p>
            <div className="hidden md:block">
              <p className="mb-2 text-sm">✓ Quick and easy registration</p>
              <p className="mb-2 text-sm">✓ Access to exclusive deals</p>
              <p className="text-sm">✓ 24/7 customer support</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6">
            <form onSubmit={submitForm} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Username */}
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Username"
                    maxLength="30"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                {/* Full Name */}
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    maxLength="30"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Gender and Age */}
                <div>
                  <select
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Age"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="col-span-2">
                  <input
                    type="email"
                    placeholder="Email"
                    maxLength="30"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    maxLength="10"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="col-span-2">
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
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Create Account
              </button>

              {/* Login Link */}
              <div className="text-center text-xs text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signuppage;