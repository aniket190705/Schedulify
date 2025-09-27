const express = require("express");
const axios = require("axios");
const router = express.Router();

// POST /api/generate — Send scheduling data to Python service and return timetable
router.post("/generate", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:8000/generate", req.body);
        res.json(response.data);

    } catch (error) {
        console.error("Scheduler service error:", error.message);
        res.status(500).json({ error: "Failed to generate timetable" });
    }
});

module.exports = router;
