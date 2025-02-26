const Drive = require('../model/drivers');
const cloudinary = require('cloudinary').v2;  
const bcrypt = require('bcryptjs');  // For password hashing


cloudinary.config({
  cloud_name: 'dalgtgsxy',
  api_key: '219775147234353',
  api_secret: '_8q-PKXH1qBruizGs7__oIqHSzo',
});

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
  const id =req.params 
  try {
    const driver = await Drive.find().select('-password_hash');
    
    console.log(driver)
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.updateProfile = async (req, res) => {
//   try {
//     const updates = req.body;
    
   
//     const imageFields = ['profile_picture', 'vehicle_image', 'idProof', 'insurance'];

//     for (let field of imageFields) {
//       if (req.body[field]) {
//         try {
//           const uploadResult = await cloudinary.uploader.upload(req.body[field], {
//             folder: 'drivers', // You can modify the folder as per your needs
//           });
//           updates[field] = uploadResult.secure_url; // Storing Cloudinary URL in the field
//         } catch (uploadError) {
//           console.error(`Error uploading ${field}:`, uploadError);
//           return res.status(500).json({ error: `Failed to upload ${field}` });
//         }
//       }
//     }

  
//     if (req.body.password) {
//       try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         updates.password_hash = hashedPassword; // Store the hashed password
//       } catch (passwordError) {
//         console.error("Error hashing password:", passwordError);
//         return res.status(500).json({ error: 'Failed to hash password' });
//       }
//     }

    
//     const driver = await Drive.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password_hash');
    
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
  try {
    const updates = {};

    // Check if the phone number is being updated and if it already exists
    if (req.body.phone_number) {
      const existingDriverWithPhoneNumber = await Drive.findOne({ phone_number: req.body.phone_number });
      if (existingDriverWithPhoneNumber && existingDriverWithPhoneNumber._id.toString() !== req.params.id) {
        return res.status(400).json({ error: 'Phone number is already registered with another driver' });
      }
      updates.phone_number = req.body.phone_number; // Proceed with updating the phone number
    }

    // Conditionally update other fields
    if (req.body.first_name) updates.first_name = req.body.first_name;
    if (req.body.last_name) updates.last_name = req.body.last_name;
    if (req.body.email) updates.email = req.body.email;

    // If password is provided, hash it and update
    if (req.body.password) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        updates.password_hash = hashedPassword;
      } catch (passwordError) {
        console.error("Error hashing password:", passwordError);
        return res.status(500).json({ error: 'Failed to hash password' });
      }
    }

    if (req.body.gender) updates.gender = req.body.gender;
    if (req.body.date_of_birth) updates.date_of_birth = req.body.date_of_birth;
    if (req.body.address) updates.address = req.body.address;
    if (req.body.license_number) updates.license_number = req.body.license_number;
    if (req.body.id_proof) updates.id_proof = req.body.id_proof;

    // Default fields
    if (req.body.vehicle_make) updates.vehicle_make = req.body.vehicle_make;
    if (req.body.vehicle_model) updates.vehicle_model = req.body.vehicle_model;
    if (req.body.vehicle_year) updates.vehicle_year = req.body.vehicle_year;
    if (req.body.vehicle_plate_number) updates.vehicle_plate_number = req.body.vehicle_plate_number;
    if (req.body.vehicle_image) updates.vehicle_image = req.body.vehicle_image;

    // Image upload to Cloudinary
    const imageFields = ['profile_picture', 'vehicle_image', 'idProof', 'insurance'];
    for (let field of imageFields) {
      if (req.body[field]) {
        try {
          const uploadResult = await cloudinary.uploader.upload(req.body[field], {
            folder: 'drivers',
          });
          updates[field] = uploadResult.secure_url;
        } catch (uploadError) {
          console.error(`Error uploading ${field}:`, uploadError);
          return res.status(500).json({ error: `Failed to upload ${field}` });
        }
      }
    }

    // Set default values
    if (!req.body.id_proof_status) updates.id_proof_status = 'pending';  // Default value
    if (!req.body.online_status) updates.online_status = 'offline';      // Default value
    if (req.body.status) updates.status = req.body.status;

    if (!req.body.wallet) updates.wallet = 0;
    if (!req.body.no_of_ratings) updates.no_of_ratings = 0;
    if (!req.body.overall_ratings) updates.overall_ratings = 0;

    // Update driver profile in the database
    const driver = await Drive.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password_hash',);

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json({ message: 'Profile updated successfully', driver });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


