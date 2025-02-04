import React, { useState, useEffect } from 'react';
import { UserCircle, Calendar, MessageSquare, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("/api/admin/complaints", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setComplaints(data);
        } else {
          toast.error("Failed to fetch complaints");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch complaints");
      }
    };
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admin/complaints/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setComplaints(complaints.filter((complaint) => complaint._id !== id));
        toast.success("Complaint deleted successfully");
      } else {
        toast.error("Failed to delete complaint");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete complaint");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Complaints List</h2>
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <UserCircle className="w-5 h-5" />
                      <span className="font-medium">{complaint.userId.name}</span>
                      <span className="text-gray-400">({complaint.userId.username})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MessageSquare className="w-5 h-5" />
                      <p className="text-sm">{complaint.complaintText}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(complaint._id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
            {complaints.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No complaints found
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComplaintList;