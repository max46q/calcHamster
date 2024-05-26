const { Schema, model } = require("mongoose");

const Cards = new Schema({
  nameCard: { type: String, required: true, unique: true },
  level: { type: Number, required: true },
  price: { type: Number, required: true },
  incomeInHour: { type: Number, required: true },
});

module.exports = model("Cards", Cards);