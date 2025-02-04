import React, { useEffect, useState } from "react";
import { MapPin, Clock, Calendar, Trash2, Navigation, Loader, UserCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("/api/my-rides", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error fetching rides");
        }
        const data = await response.json();
        setRides(data);
      } catch (error) {
        setError("Error fetching rides");
        toast.error("Failed to fetch rides");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const deleteRide = async (rideId) => {
    try {
      const response = await fetch(`/api/rides/${rideId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error deleting ride");
      }
      setRides(rides.filter((ride) => ride._id !== rideId));
      toast.success("Ride deleted successfully");
    } catch (error) {
      console.error("Error deleting ride:", error);
      toast.error("Failed to delete ride");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
        <div className="text-white flex flex-col items-center">
          <Loader className="w-8 h-8 animate-spin mb-2" />
          <span className="text-lg">Loading rides...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">My Offered Rides</h2>
          
          {rides.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <MapPin className="w-12 h-12 mb-4 text-gray-400" />
              <p className="text-lg">No rides offered yet.</p>
              <a 
                href="/offer" 
                className="mt-4 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
              >
                Offer a Ride
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {rides.map((ride) => (
                <div key={ride._id} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Navigation className="w-5 h-5" />
                        <span className="font-medium text-lg">Route: {ride.route}</span>
                      </div>
                      

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>From: {ride.startLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>To: {ride.endLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Date: {ride.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Time: {ride.time}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteRide(ride._id)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>

                  {/* Display users who joined */}
                  <div className="mt-4">
                    <h3 className="text-xl font-medium text-gray-700">Users who joined:</h3>
                    {ride.bookings && ride.bookings.length > 0 ? (
  <ul className="mt-2 space-y-2">
    {ride.bookings.map((booking) => (
      <li key={booking._id} className="flex items-center space-x-3 text-gray-600">
      <span className="font-semibold">{booking.userId ? booking.userId.name : "Unknown User"}</span>
      <span className="text-sm text-gray-500">({booking.userId ? booking.userId.email : "No email provided"})</span>
      <span className="text-sm text-gray-500">
        {booking.userId && booking.userId.phone ? ` | Phone: ${booking.userId.phone}` : " | No phone number provided"}
      </span>
    </li>
    
    ))}
  </ul>
) : (
  <p className="text-gray-500">No users have joined this ride yet.</p>
)}

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyRides;
