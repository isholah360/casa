const Trip = require('../model/trip');

exports.acceptTrip = async (req, res) => {
  try {
    const { trip_id } = req.body;
    const trip = await Trip.findByIdAndUpdate(trip_id, { status: 'accepted' }, { new: true });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.startTrip = async (req, res) => {
  try {
    const { trip_id } = req.body;
    const trip = await Trip.findByIdAndUpdate(trip_id, { status: 'started' }, { new: true });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip started successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.endTrip = async (req, res) => {
  try {
    const { trip_id } = req.body;
    const trip = await Trip.findByIdAndUpdate(trip_id, { status: 'completed' }, { new: true });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip ended successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getActiveTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ driver_id: req.driverId, status: { $in: ['accepted', 'started'] } });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};