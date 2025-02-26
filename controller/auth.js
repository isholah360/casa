const Drive = require("../model/drivers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { generateToken } = require("../util/jwt");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      gender,
      date_of_birth,
      address,
      license_number,
      id_proof,
      vehicle_make,
      vehicle_model,
      vehicle_year,
      vehicle_plate_number,
      vehicle_image,
    } = req.body;


    const existingDriver = await Drive.findOne({ phone_number });
    if (existingDriver)
      return res.status(400).json({ message: "Phone number already registered", id: existingDriver._id });


    const driver = new Drive({
      first_name,
      last_name,
      phone_number,
      email,
      gender,
      date_of_birth,
      address,
      license_number,
      id_proof,
      id_proof_status: "pending", // You can update this later once the proof is verified
      online_status: "offline", // Default to offline when first registered
      wallet: 0, // Default wallet balance is 0
      no_of_ratings: 0, // No ratings initially
      overall_ratings: 0, // Default to no ratings
      status: "inactive", // Default to inactive status
      vehicle_make,
      vehicle_model,
      vehicle_year,
      vehicle_plate_number,
      vehicle_image,
      created_at: new Date(), // Current timestamp
    });


    await driver.save();

    res.json({
      message: "Driver registered successfully",
      driver_id: driver._id,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    console.log(phone_number); // Only log necessary data
    const driver = await Drive.findOne({ phone_number });

    console.log(driver)

    if (!driver) {
      return res.status(401).json({ error: "Invalid phone number or password" });
    }
    bcrypt.compareSync(password, driver.password_hash);
    const isMatch = await bcrypt.compare(password, driver.password_hash);
    console.log(isMatch);
    console.log(driver._id);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid phone number or password" });
    }

    // Generate token
    const token = generateToken(driver._id);

    res.json({
      message: "Login successful",
      token,
      id: driver._id
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { phone_number, otp } = req.body;
    if (otp === "123456") {
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
