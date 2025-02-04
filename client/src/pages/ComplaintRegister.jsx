import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

const ComplaintRegister = () => {
  const [complaintText, setComplaintText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ complaintText }),
      });

      if (response.ok) {
        toast.success("Complaint registered successfully");
        setComplaintText("");
      } else {
        toast.error("Failed to register complaint");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to register complaint");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Header */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">Register Complaint</h2>
            <p className="text-blue-100 mb-4">Share your concerns with us</p>
            <div className="hidden md:block">
              <p className="mb-2 text-sm">✓ We value your feedback</p>
              <p className="mb-2 text-sm">✓ Quick response guaranteed</p>
              <p className="text-sm">✓ Your voice matters</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Your Complaint</span>
                </div>
                <textarea
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  placeholder="Please describe your concern..."
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  rows="6"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComplaintRegister;