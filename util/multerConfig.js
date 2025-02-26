const multer = require('multer');

// Set up multer storage (use memoryStorage or diskStorage depending on your use case)
const storage = multer.memoryStorage(); // Store images temporarily in memory

// Configure the upload middleware
const upload = multer({ storage: storage }).fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'vehicle_image', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
  { name: 'insurance', maxCount: 1 },
]);

// Export the upload middleware
module.exports = upload;
