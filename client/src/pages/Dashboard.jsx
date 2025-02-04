import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MapPin, Calendar, Users, Clock, Car, Phone, Route } from 'lucide-react';

const Dashboard = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchRides = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/searchRides?departure=${departure}&arrival=${arrival}&date=${date}&seats=${seats}`);
      const data = await response.json();
      if (response.status === 404) {
        toast.error('No rides found');
        setSearchResults([]);
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      toast.error('Server error');
    }
  };

  const bookRide = async (rideId) => {
    try {
      const response = await fetch('/api/bookRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rideId, seats })
      });
      const data = await response.json();
      if (response.status !== 200) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
        searchRides();
      }
    } catch (error) {
      console.error('Error booking ride:', error);
      toast.error('Server error');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Info */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Find Your Ride</h2>
              <p className="text-blue-100 mb-4">Search available rides in your area</p>
              <div className="hidden md:block">
                <p className="mb-2 text-sm">✓ Safe and reliable drivers</p>
                <p className="mb-2 text-sm">✓ Convenient pickup locations</p>
                <p className="text-sm">✓ Affordable shared rides</p>
              </div>
            </div>

            {/* Right Side - Search Form */}
            <div className="p-6">
              <form onSubmit={searchRides} className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-600">Departure</label>
                  </div>
                  <input
                    type="text"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter departure location"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-600">Arrival</label>
                  </div>
                  <input
                    type="text"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter arrival location"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <label className="text-sm font-medium text-gray-600">Date</label>
                    </div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <label className="text-sm font-medium text-gray-600">Seats</label>
                    </div>
                    <input
                      type="number"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Seats needed"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  Search Rides
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Available Rides</h3>
              <div className="space-y-4">
                {searchResults.map((ride) => (
                  <div key={ride._id} className="bg-gray-50 rounded-lg p-6 shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Car className="w-5 h-5" />
                          <span className="font-medium">{ride.vehicleName} ({ride.vehicleNumber})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-5 h-5" />
                          <span>{ride.seatsAvailable} seats available</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="w-5 h-5" />
                          <span>{ride.offeredBy?.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-5 h-5" />
                          <span>{ride.time}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-5 h-5" />
                          <span>{ride.startLocation} → {ride.endLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Route className="w-5 h-5" />
                          <span className="text-sm">Via: {ride.stops.join(', ')}</span>
                        </div>
                        <button
                          onClick={() => bookRide(ride._id)}
                          className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                        >
                          Book Ride
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {searchResults.length === 0 && (
          <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-6 text-center">
            <p className="text-gray-600">No rides found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;