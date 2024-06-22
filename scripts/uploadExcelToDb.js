// require("dotenv").config();
// const mongoose = require("mongoose");
// const xlsx = require("xlsx");
// const Agent = require("../models/agent");
// const Shows = require("../models/shows");

// const mongoUri = process.env.MONGO_URI;
// mongoose
//   .connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // Function to upload Excel data to MongoDB (Change the path to the requeired excel sheet)
// const uploadExcelToMongo = async () => {
//   const filePath = "raw-data/shows.xlsx";

//   try {
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     const result = await Shows.insertMany(jsonData);
//     console.log("Data successfully uploaded to MongoDB", result);
//     mongoose.disconnect();
//   } catch (error) {
//     console.error("Error uploading data to MongoDB", error);
//     mongoose.disconnect();
//   }
// };

// uploadExcelToMongo();


require("dotenv").config();
const mongoose = require("mongoose");
const xlsx = require("xlsx");
const Shows = require("../models/shows");

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

// Function to upload Excel data to MongoDB (Change the path to the required excel sheet)
const uploadExcelToMongo = async () => {
  const filePath = "raw-data/shows.xlsx";

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Transform data to group companies by Show
    const showsMap = new Map();

    jsonData.forEach((entry) => {
      const { Show, Company, Phone, Timezone, ...rest } = entry;
      if (!showsMap.has(Show)) {
        showsMap.set(Show, {
          Show,
          Companies: [],
          ...rest,
        });
      }
      showsMap.get(Show).Companies.push({ Company, Phone, Timezone });
    });

    const transformedData = Array.from(showsMap.values());

    const result = await Shows.insertMany(transformedData);
    console.log("Data successfully uploaded to MongoDB", result);
    mongoose.disconnect();
  } catch (error) {
    console.error("Error uploading data to MongoDB", error);
    mongoose.disconnect();
  }
};

uploadExcelToMongo();
