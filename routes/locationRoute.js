const express = require('express');
const router = express.Router();
const { updateLocation, toggleAvailability } = require('../controller/location');
const { verifyToken } = require('../util/jwt');

router.post('/location', verifyToken, updateLocation);
router.post('/toggle-availability', verifyToken, toggleAvailability);

module.exports = router;