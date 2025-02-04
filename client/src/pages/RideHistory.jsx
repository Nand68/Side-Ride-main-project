import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Calendar, User, Phone, MapPin, Car, Users } from 'lucide-react';

const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [messages, setMessages] = useState([]);

  const fetchRideHistory = async () => {
    try {
      const response = await fetch('/api/rideHistory');
      const data = await response.json();

      if (response.status !== 200) {
        toast.error(data.msg);
      } else {
        setRideHistory(data);
      }
    } catch (error) {
      console.error('Error fetching ride history:', error);
      toast.error('Server error');
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/profile2');
      const contentType = response.headers.get('Content-Type');
  
      // Log the response for debugging
      console.log('Response:', response);
  
      // If the response is not JSON, show a fallback message but don't throw an error
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setMessages(data.messages || []);
      } else {
        console.warn('Unexpected response format');
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      // If there's an error, show a simple fallback message
      toast.error('Unable to fetch messages');
      setMessages([]); // Optional: Reset messages if error occurs
    }
  };
  
  
  

  const cancelRide = async (rideId) => {
    try {
      const response = await fetch('/api/cancelRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rideId })
      });
      const data = await response.json();

      if (response.status !== 200) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
        fetchRideHistory();
      }
    } catch (error) {
      console.error('Error canceling ride:', error);
      toast.error('Server error');
    }
  };

  useEffect(() => {
    fetchRideHistory();
    fetchMessages();
  }, []);

  const isCancelAllowed = (bookingDate) => {
    if (!bookingDate) return false; // Added safety check
    const bookingTime = new Date(bookingDate);
    const currentTime = new Date();
    const diffInMs = currentTime - bookingTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours <= 6;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Messages Section */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-4">Messages</h3>
              <div className="space-y-3">
                {messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-3 text-sm">
                      {message}
                    </div>
                  ))
                ) : (
                  <p className="text-blue-100">No messages found</p>
                )}
              </div>
            </div>
          </div>

          {/* Ride History Section */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ride History</h2>
            <div className="space-y-6">
              {rideHistory.length > 0 ? (
                rideHistory.map((ride) => (
                  <div key={ride._id} className="bg-gray-50 rounded-xl p-6 shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-5 h-5" />
                          <span className="font-medium">Seats Available: {ride.seatsAvailable}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Car className="w-5 h-5" />
                          <span>{ride.vehicleName} - {ride.vehicleNumber}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-5 h-5" />
                          <span>{ride.date} at {ride.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-5 h-5" />
                          <span>Route: {ride.route}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <User className="w-5 h-5" />
                          <span>Driver: {ride.offeredBy?.name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <User className="w-5 h-5" />
                          <span>Username: {ride.offeredBy?.username || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="w-5 h-5" />
                          <span>Phone: {ride.offeredBy?.phone || 'N/A'}</span>
                        </div>
                        {isCancelAllowed(ride.bookings?.[0]?.bookingDate) && (
                          <button
                            onClick={() => cancelRide(ride._id)}
                            className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-colors duration-300"
                          >
                            Cancel Ride
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No ride history found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RideHistory;
