const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const ejs = require("ejs");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use("/auth", authRouter);

// Налаштування шаблонізатора EJS
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);

// Роут для сторінки логіну
app.get("/login", function (req, res) {
  let error = "";
  res.render("login", { error });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
