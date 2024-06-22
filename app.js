const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const agentsRoutes = require("./routes/agentsRoutes");
const showsRoutes = require("./routes/showsRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Use user routes
app.use("/api/users", userRoutes);

// use agents routes
app.use("/api/agents", agentsRoutes);

//use shows routes
app.use("/api/shows", showsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
