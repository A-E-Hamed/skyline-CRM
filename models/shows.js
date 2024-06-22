const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  Company: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Timezone: {
    type: String,
  },
});

const showsSchema = new mongoose.Schema(
  {
    Show: {
      type: String,
    },
    Companies: [companySchema],

    Status: {
      type: String,
    },
    "Rejection Reason": {
      type: String,
    },
    Notes: {
      type: String,
    },
    "Contact Name": {
      type: String,
    },
    "DM Rating": {
      type: String,
    },
    Email: {
      type: String,
    },
    "Closer Assigned": {
      type: String,
    },
    "Closer Note": {
      type: String,
    },
    "Days to Call": {
      type: String,
    },
    "Last Contact": {
      type: String,
    },
    "Next Contact": {
      type: String,
    },
    "Closing Date": {
      type: String,
    },
    Hotel: {
      type: String,
    },
    Budget: {
      type: String,
    },
    "Max. Distance": {
      type: String,
    },
    Rooms: {
      type: String,
    },
    "Check-in": {
      type: String,
    },
    "Check-out": {
      type: String,
    },
    Preferences: {
      type: String,
    },
    Amenities: {
      type: String,
    },
    Activities: {
      type: String,
    },
    Request: {
      type: String,
    },
    "/ Room Stay": {
      type: Number,
    },
    "Total Stay": {
      type: Number,
    },
    "Lead Date": {
      type: Date,
    },
    "Email Type": {
      type: String,
    },
    "Email Status": {
      type: String,
    },
  },
  { timestamps: true }
);

const Shows = mongoose.model("Shows", showsSchema);

module.exports = Shows;
