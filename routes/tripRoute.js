const express = require('express');
const router = express.Router();
const { acceptTrip, startTrip, endTrip, getActiveTrips } = require('../controller/trips');
const { verifyToken } = require('../util/jwt');

router.post('/trips/accept', verifyToken, acceptTrip);
router.post('/trips/start', verifyToken, startTrip);
router.post('/trips/end', verifyToken, endTrip);
router.get('/trips/active', verifyToken, getActiveTrips);

module.exports = router;