const Drive = require('../model/drivers');
const cloudinary = require('cloudinary').v2;  
const bcrypt = require('bcrypt');  
const multer = require('multer');
const { Readable } = require('stream');

cloudinary.config({
  cloud_name: 'dalgtgsxy',
  api_key: '219775147234353',
  api_secret: '_8q-PKXH1qBruizGs7__oIqHSzo',
});


// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'vehicle_image', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
  { name: 'insurance', maxCount: 1 },
]);

// Helper function to upload image to Cloudinary
const uploadImageToCloudinary = async (file) => {
  const bufferStream = new Readable();
  bufferStream.push(file.buffer);
  bufferStream.push(null);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'drivers' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    bufferStream.pipe(uploadStream);
  });
};



exports.getProfile = async (req, res) => {
  const id =req.params 
  try {
    const driver = await Drive.findById(req.params.id).select('-password_hash');
    
    console.log(driver)
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const drivers = await Drive.find().select('-password_hash');  
    if (!drivers || drivers.length === 0) {
      return res.status(404).json({ error: 'No drivers found' });
    }
    res.status(200).json(drivers)
  } catch (error) {
    console.error('Error fetching drivers:', error);  
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};


// exports.updateProfile = async (req, res) => {
//   try {
//     const updates = {};

    
//     if (req.body.phone_number) {
//       const existingDriverWithPhoneNumber = await Drive.findOne({ phone_number: req.body.phone_number });
//       if (existingDriverWithPhoneNumber && existingDriverWithPhoneNumber._id.toString() !== req.params.id) {
//         return res.status(400).json({ error: 'Phone number is already registered with another driver' });
//       }
//       updates.phone_number = req.body.phone_number; 
//     }

    
//     if (req.body.first_name) updates.first_name = req.body.first_name;
//     if (req.body.last_name) updates.last_name = req.body.last_name;
//     if (req.body.email) updates.email = req.body.email;

    
//     if (req.body.password) {
//       try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         updates.password_hash = hashedPassword;
//       } catch (passwordError) {
//         console.error("Error hashing password:", passwordError);
//         return res.status(500).json({ error: 'Failed to hash password' });
//       }
//     }

   
//     if (req.body.gender) updates.gender = req.body.gender;
//     if (req.body.date_of_birth) updates.date_of_birth = req.body.date_of_birth;
//     if (req.body.address) updates.address = req.body.address;
//     if (req.body.license_number) updates.license_number = req.body.license_number;
//     if (req.body.id_proof) updates.id_proof = req.body.id_proof;

   
//     if (req.body.vehicle_make) updates.vehicle_make = req.body.vehicle_make;
//     if (req.body.vehicle_model) updates.vehicle_model = req.body.vehicle_model;
//     if (req.body.vehicle_year) updates.vehicle_year = req.body.vehicle_year;
//     if (req.body.vehicle_plate_number) updates.vehicle_plate_number = req.body.vehicle_plate_number;
//     if (req.body.wallet) updates.wallet = req.body.wallet;
//     if (req.body.overall_ratings) updates.overall_ratings = req.body.overall_ratings;
//     if (req.body.no_of_ratings) updates.no_of_ratings = req.body.no_of_ratings;

   
//     console.log('Received files:', req.files); // Log files received from Postman

//     const imageFields = ['profile_picture', 'vehicle_image', 'idProof', 'insurance'];
    
//     for (let field of imageFields) {
//       if (req.files && req.files[field] && req.files[field][0]) {
//         try {
//           // Upload image to Cloudinary
//           const uploadResult = await uploadImageToCloudinary(req.files[field][0]);
//           updates[field] = uploadResult.secure_url;
//         } catch (uploadError) {
//           console.error(`Error uploading ${field}:`, uploadError);
//           return res.status(500).json({ error: `Failed to upload ${field}` });
//         }
//       }
//     }

   
//     if (!req.body.id_proof_status) updates.id_proof_status = 'pending';  
//     if (!req.body.online_status) updates.online_status = 'offline';     
//     if (req.body.status) updates.status = req.body.status;

   
//     if (!req.body.wallet) updates.wallet = 0;
//     if (!req.body.no_of_ratings) updates.no_of_ratings = 0;
//     if (!req.body.overall_ratings) updates.overall_ratings = 0;

   
//     const driver = await Drive.findByIdAndUpdate(req.params.id, updates, { new: true });

//     if (!driver) {
//       return res.status(404).json({ error: 'Driver not found' });
//     }

//     res.json({ message: 'Profile updated successfully', driver });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.updateProfile = async (req, res) => {

  console.log('Request Body:', req.body);
  console.log('Files in request:', req.files);
  
  try {
    const updates = {};

    // Check if there are updates for phone_number
    if (req.body.phone_number) {
      const existingDriverWithPhoneNumber = await Drive.findOne({ phone_number: req.body.phone_number });
      if (existingDriverWithPhoneNumber && existingDriverWithPhoneNumber._id.toString() !== req.params.id) {
        return res.status(400).json({ error: 'Phone number is already registered with another driver' });
      }
      updates.phone_number = req.body.phone_number; 
    }

    // Check other fields for updates
    if (req.body.first_name) updates.first_name = req.body.first_name;
    if (req.body.last_name) updates.last_name = req.body.last_name;
    if (req.body.email) updates.email = req.body.email;

    if (req.body.password) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        updates.password_hash = hashedPassword;
      } catch (passwordError) {
        console.error("Error hashing password:", passwordError);
        return res.status(500).json({ error: 'Failed to hash password' });
      }
    }

    // Handle other fields for update
    if (req.body.gender) updates.gender = req.body.gender;
    if (req.body.date_of_birth) updates.date_of_birth = req.body.date_of_birth;
    if (req.body.address) updates.address = req.body.address;
    if (req.body.license_number) updates.license_number = req.body.license_number;

    if (req.body.vehicle_make) updates.vehicle_make = req.body.vehicle_make;
    if (req.body.vehicle_model) updates.vehicle_model = req.body.vehicle_model;
    if (req.body.vehicle_year) updates.vehicle_year = req.body.vehicle_year;
    if (req.body.vehicle_plate_number) updates.vehicle_plate_number = req.body.vehicle_plate_number;
    if (req.body.wallet) updates.wallet = req.body.wallet;
    if (req.body.overall_ratings) updates.overall_ratings = req.body.overall_ratings;
    if (req.body.no_of_ratings) updates.no_of_ratings = req.body.no_of_ratings;

    // Initialize the upload promises array
    let uploadPromises = [];

    console.log('Received files:', req.files);


    const imageFields = ['profile_picture', 'vehicle_image', 'idProof', 'insurance'];

    for (let field of imageFields) {
      if (req.files && req.files[field] && req.files[field][0]) {
        console.log(`Uploading ${field}:`, req.files[field][0].originalname);  // Log file being uploaded
        uploadPromises.push(
          uploadImageToCloudinary(req.files[field][0]).then(uploadResult => {
            updates[field] = uploadResult.secure_url;
          }).catch(uploadError => {
            console.error(`Error uploading ${field}:`, uploadError);
            return res.status(500).json({ error: `Failed to upload ${field}` });
          })
        );
      }
    }

    await Promise.all(uploadPromises); 

    // Wait for all the file uploads to complete
    await Promise.all(uploadPromises);

    // Handle the other fields and set defaults if necessary
    if (!req.body.id_proof_status) updates.id_proof_status = 'pending';  
    if (!req.body.online_status) updates.online_status = 'offline';     
    if (req.body.status) updates.status = req.body.status;

    if (!req.body.wallet) updates.wallet = 0;
    if (!req.body.no_of_ratings) updates.no_of_ratings = 0;
    if (!req.body.overall_ratings) updates.overall_ratings = 0;

    // Update the driver profile in the database
    const driver = await Drive.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json({ message: 'Profile updated successfully', driver });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



