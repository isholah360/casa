const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllProfile } = require('../controller/profile');
const { verifyToken } = require('../util/jwt');
const upload = require('../util/multerConfig');

router.get('/profile/:id', getProfile);
router.get('/profiles/all', getAllProfile);
router.put('/profile/:id', upload, updateProfile);


module.exports = router;