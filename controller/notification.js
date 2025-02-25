const Driver = require('../model/driver');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = [
      { notification_id: '1', message: 'New trip request received', timestamp: new Date() },
      { notification_id: '2', message: 'Your account has been verified', timestamp: new Date() }
    ];
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { notification_id } = req.body;
    // Simulate marking as read logic
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};