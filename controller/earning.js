const Trip = require('../model/trip');

exports.getEarnings = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const trips = await Trip.find({
      driver_id: req.driverId,
      status: 'completed',
      created_at: { $gte: start_date, $lte: end_date }
    }).select('amount created_at');

    const totalEarnings = trips.reduce((sum, trip) => sum + (trip.amount || 0), 0);
    res.json({ total_earnings: totalEarnings, details: trips });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};