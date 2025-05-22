// index.js
const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const rideRoutes = require("./routes/rideRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", authRoutes);
app.use("/", rideRoutes);
app.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  // Logic to send OTP here
  res.json({ message: 'OTP sent to ' + phone });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Zappio backend running on port ${PORT}`);
});
