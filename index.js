const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;

const app = express();

require("dotenv").config();

app.use(express.json());
app.use("/auth", authRouter);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.engine("ejs", require("ejs").renderFile);
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/namek", (req, res) => {
  res.render("namek");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
