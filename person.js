const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  language: String,
  city: String,
  salary: Number,
  isExperienced: Boolean,
});

const Person = new mongoose.model("Person", personSchema);
module.exports = Person;
