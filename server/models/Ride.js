const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  route: { type: String, required: true },
  stops: { type: [String], required: true },
  time: { type: String, required: true },
  vehicleName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  date: { type: String, required: true },
  bookings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      seats: { type: Number, required: true },
      bookingDate: { type: Date, default: Date.now },
      bookingTime: { type: Date, default: Date.now } 
    }
  ]
});

module.exports = mongoose.model('Ride', RideSchema);
