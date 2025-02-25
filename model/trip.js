const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  pickup_location: { type: String, required: true },
  dropoff_location: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'started', 'completed'] },
  amount: { type: Number },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);