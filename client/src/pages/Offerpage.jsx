import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const Offerpage = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [route, setRoute] = useState('');
  const [stops, setStops] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const token = Cookies.get('Authtoken');
    if (!token) {
      toast.error("You need to login first");
      navigate('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const newOffer = {
      userId,
      startLocation,
      endLocation,
      route,
      stops: stops.split(','),
      vehicleName,
      vehicleNumber,
      seatsAvailable,
      date,
      time,
    };

    const res = addOffer(newOffer);
    toast.success("Offer added successfully");
    navigate('/dashboard');
    console.log(res);
  };

  const addOffer = async (newOffer) => {
    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOffer),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Header and Info */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">Offer a Ride</h2>
            <p className="text-blue-100 mb-4">Share your journey with others</p>
            <div className="hidden md:block">
              <p className="mb-2 text-sm">✓ Help reduce carbon footprint</p>
              <p className="mb-2 text-sm">✓ Share travel costs</p>
              <p className="text-sm">✓ Meet new people</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6">
            <form onSubmit={submitForm} className="space-y-4">
              {/* Start Location */}
              <input
                type="text"
                placeholder="Start Location"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                required
              />

              {/* End Location */}
              <input
                type="text"
                placeholder="End Location"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                required
              />

              {/* Route */}
              <input
                type="text"
                placeholder="Route"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                required
              />

              {/* Stops */}
              <input
                type="text"
                placeholder="Stops (comma separated)"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={stops}
                onChange={(e) => setStops(e.target.value)}
                required
              />

              {/* Vehicle Details */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Vehicle Name"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Vehicle Number"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  required
                />
              </div>

              {/* Seats Available */}
              <input
                type="number"
                placeholder="Passenger Capacity"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={seatsAvailable}
                onChange={(e) => setSeatsAvailable(e.target.value)}
                required
              />

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <input
                  type="time"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Offer Ride
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offerpage;