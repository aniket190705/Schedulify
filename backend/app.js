require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const scheduleRouter = require("./routes/schedule");

const app = express();

app.use(cors());
app.use(express.json());

// Use environment variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api", scheduleRouter);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
