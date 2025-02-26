const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllProfile } = require('../controller/profile');
const { verifyToken } = require('../util/jwt');

router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.put('/profile/all', getAllProfile);

module.exports = router;