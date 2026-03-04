require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// ------------------ CORS ------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://prancevia.com",
  "https://www.prancevia.com",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(cors());
}

// ------------------ Middleware ------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------ DB ------------------
connectDB();

// ------------------ API Routes ------------------
app.use("/api", applicationRoutes);
app.use("/api/upload", require("./routes/uploadRoutes"));

// ------------------ Serve React Build ------------------
app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ------------------ Server ------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));