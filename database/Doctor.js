const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: String,
    password: String,
    price: Number,
    state: String,
    yearexp: Number,
    votes: String,
    PatientStories: String,
    department: String,
    hospital: String,
    gender: String,
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", DoctorSchema); // collection - posts

module.exports = {
  Doctor,
};
