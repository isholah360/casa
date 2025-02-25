const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controller/notification');
const { verifyToken } = require('../util/jwt');

router.get('/notifications', verifyToken, getNotifications);
router.post('/notifications/mark-as-read', verifyToken, markAsRead);

module.exports = router;