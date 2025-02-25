const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const driverSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String, unique: true, required: true },
  email: { type: String },
  password_hash: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  profile_picture: { type: String }, 
  date_of_birth: { type: Date },
  address: { type: String },
  license_number: { type: String },
  id_proof: { type: String },
  id_proof_status: { type: String, enum: ['verified', 'pending'] },
  rejected_reason: { type: String }, 
  online_status: { type: String, enum: ['online', 'offline'] },
  wallet: { type: Number, default: 0 }, 
  zone: { type: String },
  overall_ratings: { type: Number, min: 0, max: 5 },
  no_of_ratings: { type: Number, default: 0 }, 
  otp: { type: String },
  status: { type: String, default: 'inactive', enum: ['active', 'suspended', 'inactive'] },
  referral_code: { type: String },
  referred_by: { type: String }, 
  vehicle_make: { type: String },
  vehicle_model: { type: String },
  vehicle_year: { type: Number },
  vehicle_plate_number: { type: String },
  vehicle_image: { type: String }, 
  idProof: { type: String }, 
  insurance: { type: String }, 
  created_at: { type: Date, default: Date.now }
});


// Pre-save hook to hash password
// driverSchema.pre('save', async function (next) {
//   if (!this.isModified('password_hash')) return next();
//   this.password_hash = await bcrypt.hash(this.password_hash, 10);
//   next();
// });

module.exports = mongoose.model('Drive', driverSchema);