const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/authMiddleware');
const Complaint = require('../models/Complaint');
const mongoose = require('mongoose');

router.get('/offer', verifyToken, async (req, res) => {
  try {
    const details = await Ride.find({});
    res.json(details);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json('Server error');
  }
});

router.post('/offer', verifyToken, async (req, res) => {
  try {
    const data = req.body;
    const result = await Ride.create(data);
    res.status(201).json('Offer created successfully');
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json('Server error');
  }
});

router.get('/searchRides', async (req, res) => {
  const { departure, arrival, date, seats } = req.query;

  try {
    const rides = await Ride.find({
      $and: [
        {
          $or: [
            { startLocation: new RegExp(departure, 'i') },
            { stops: new RegExp(departure, 'i') },
            { route: new RegExp(departure, 'i') }
          ]
        },
        {
          $or: [
            { endLocation: new RegExp(arrival, 'i') },
            { stops: new RegExp(arrival, 'i') },
            { route: new RegExp(arrival, 'i') }
          ]
        },
        { date: new RegExp(date, 'i') },
        { seatsAvailable: { $gte: parseInt(seats, 10) } }
      ]
    }).populate('userId', 'name email phone');

    if (rides.length === 0) {
      return res.status(404).json({ msg: 'No rides found' });
    }

    const results = rides.map(ride => ({
      ...ride._doc,
      offeredBy: ride.userId
    }));

    res.json(results);
  } catch (error) {
    console.error('Error searching for rides:', error);
    res.status(500).json('Server error');
  }
});

router.post('/bookRide', verifyToken, async (req, res) => {
  const { rideId, seats } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ msg: 'Ride not found' });
    }

    const existingBooking = ride.bookings.find(
      booking => booking.userId.toString() === req.user.userId
    );

    if (existingBooking) {
      return res.status(400).json({ msg: 'You have already booked this ride' });
    }

    if (ride.seatsAvailable < seats) {
      return res.status(400).json({ msg: 'Not enough seats available' });
    }

    ride.seatsAvailable -= seats;
    ride.bookings.push({ userId: req.user.userId, seats, bookingTime: new Date() });
    await ride.save();

    res.status(200).json({ msg: 'Ride booked successfully' });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json('Server error');
  }
});

router.post('/cancelRide', verifyToken, async (req, res) => {
  const { rideId } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ msg: 'Ride not found' });
    }

    const bookingIndex = ride.bookings.findIndex(
      booking => booking.userId.toString() === req.user.userId
    );

    if (bookingIndex === -1) {
      return res.status(400).json({ msg: 'Booking not found' });
    }

    const booking = ride.bookings[bookingIndex];
    ride.seatsAvailable += booking.seats;
    ride.bookings.splice(bookingIndex, 1);
    await ride.save();

    res.status(200).json({ msg: 'Ride canceled successfully' });
  } catch (error) {
    console.error('Error canceling ride:', error);
    res.status(500).json('Server error');
  }
});

router.get('/rideHistory', verifyToken, async (req, res) => {
  try {
    const rides = await Ride.find({
      'bookings.userId': req.user.userId
    }).populate('userId', 'name email phone username');

    const results = rides.map(ride => ({
      ...ride._doc,
      offeredBy: ride.userId
    }));

    res.json(results);
  } catch (error) {
    console.error('Error fetching ride history:', error);
    res.status(500).json('Server error');
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password').select('-_id').select('-__v').select('-username').select('-messages');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/profile', verifyToken, async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete("/rides/:id", verifyToken, async (req, res) => {
  try {
    const rideId = req.params.id;
    const userId = req.user.userId;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (ride.userId.toString() !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    for (const booking of ride.bookings) {
      const user = await User.findById(booking.userId);
      if (user) {
        user.messages.push(`The ride from ${ride.startLocation} to ${ride.endLocation} on ${ride.date} has been canceled by the offerer.`);
        await user.save();
      }
    }

    await Ride.findByIdAndDelete(rideId);
    res.json({ message: "Ride deleted successfully" });
  } catch (error) {
    console.error("Error deleting ride:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/my-rides', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const rides = await Ride.find({ userId }).populate('bookings.userId', 'name email phone'); // Now including phone in the populated fields
    res.json(rides);
  } catch (error) {
    console.error('Error retrieving rides:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post("/complaints", verifyToken, async (req, res) => {
  const { complaintText } = req.body;
  const userId = req.user.userId;
  const username = req.user.username;

  try {
    const newComplaint = new Complaint({ userId, username, complaintText });
    await newComplaint.save();
    res.status(201).json({ message: "Complaint registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
