// otpStore.js
const otpStore = {};

function setOtp(phone, otp) {
  otpStore[phone] = otp;
}

function getOtp(phone) {
  return otpStore[phone];
}

function clearOtp(phone) {
  delete otpStore[phone];
}

module.exports = { setOtp, getOtp, clearOtp };
