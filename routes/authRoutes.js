// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { setOtp, getOtp, clearOtp } = require("../otpStore");

// Generate 4-digit OTP
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// POST /send-otp
router.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const otp = generateOtp();
  setOtp(phone, otp);
  console.log(`Generated OTP for ${phone}: ${otp}`); // simulate SMS

  res.json({ success: true, message: "OTP sent (mocked)" });
});

// POST /verify-otp
router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone and OTP are required" });
  }

  const storedOtp = getOtp(phone);

  if (storedOtp === otp) {
    clearOtp(phone);
    res.json({ success: true, userId: `phone_${phone}` });
  } else {
    res.status(401).json({ error: "Invalid OTP" });
  }
});

module.exports = router;
