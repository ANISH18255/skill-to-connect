const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 4173;
const mongoUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rural_skillconnect";

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

mongoose
    .connect(mongoUrl)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error:", error.message));

// Schemes
const youthSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    village: { type: String, required: true },
    education: { type: String, required: true },
    interest: { type: String, required: true },
    skill: String,
    suggestedCourse: String,
    progressStep: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
    company: { type: String, required: true },
    title: { type: String, required: true },
    sector: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    requiredSkill: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Youth = mongoose.model("Youth", youthSchema);
const Job = mongoose.model("Job", jobSchema);

// Base Page Routing
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API Routes
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "not connected" });
});

app.get("/api/youth", async(req, res) => {
    try {
        const youths = await Youth.find().sort({ createdAt: -1 });
        res.json(youths);
    } catch (error) {
        res.status(500).json({ message: "Could not load youth profiles" });
    }
});

app.post("/api/youth", async(req, res) => {
    try {
        const youth = await Youth.create(req.body);
        res.status(201).json(youth);
    } catch (error) {
        res.status(400).json({ message: "Could not save youth profile", details: error.message });
    }
});

app.get("/api/jobs", async(req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Could not load jobs" });
    }
});

app.post("/api/jobs", async(req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: "Could not save job", details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Rural SkillConnect running at http://localhost:${port}`);
});