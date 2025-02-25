const Driver = require('../model/driver');

exports.updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    await Driver.findByIdAndUpdate(req.driverId, { latitude, longitude }, { new: true });
    res.json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.toggleAvailability = async (req, res) => {
  try {
    const { status } = req.body;
    await Driver.findByIdAndUpdate(req.driverId, { status }, { new: true });
    res.json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};