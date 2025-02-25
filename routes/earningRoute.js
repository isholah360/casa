const express = require('express');
const router = express.Router();
const { getEarnings } = require('../controller/earning');
const { verifyToken } = require('../util/jwt');

router.get('/earnings', verifyToken, getEarnings);

module.exports = router;