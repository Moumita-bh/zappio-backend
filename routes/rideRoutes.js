// routes/rideRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../firestore");
const authMiddleware = require("../middleware/authMiddleware");

// POST /ride-request
router.post("/ride-request", authMiddleware, async (req, res) => {
  const { userId, pickup, drop, timestamp } = req.body;

  if (!userId || !pickup || !drop || !timestamp) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const rideData = {
    userId,
    pickup,
    drop,
    timestamp,
    status: "requested",
  };

  try {
    await db.collection("rideRequests").add(rideData);
    res.json({ success: true, message: "Ride request saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save ride", details: err.message });
  }
});

module.exports = router;
