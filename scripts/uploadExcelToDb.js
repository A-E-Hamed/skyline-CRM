require("dotenv").config();
const mongoose = require("mongoose");
const xlsx = require("xlsx");
const Agent = require("../models/agent");

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Function to upload Excel data to MongoDB (Change the path to the requeired excel sheet)
const uploadExcelToMongo = async () => {
  const filePath =
    "E:/skyline/crm-project(m)/crm-project(m)/backend/raw-data/Copy of Leads Assign - April 25, 5_06 PM.xlsx";

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const result = await Agent.insertMany(jsonData);
    console.log("Data successfully uploaded to MongoDB", result);
    mongoose.disconnect();
  } catch (error) {
    console.error("Error uploading data to MongoDB", error);
    mongoose.disconnect();
  }
};

uploadExcelToMongo();
