const otpGenerator = require('otp-generator');

exports.generateOTP = () => {
  return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
};

exports.validateOTP = (userOTP, generatedOTP) => {
  return userOTP === generatedOTP;
};