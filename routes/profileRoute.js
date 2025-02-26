const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllProfile } = require('../controller/profile');
const { verifyToken } = require('../util/jwt');

router.get('/profile/:id', getProfile);
router.get('/profile/all', getAllProfile);
router.put('/profile/:id', updateProfile);


module.exports = router;