import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <svg 
                className="h-8 w-8 text-gray-600"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
              <h1 className="text-2xl font-semibold text-gray-800">
                User Management
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg 
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr 
                  key={user._id}
                  className={`
                    border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  `}
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{user.username || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="inline-flex items-center space-x-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <svg 
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;