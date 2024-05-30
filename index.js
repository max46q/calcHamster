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
app.get("/", function (req, res) {
  let error = "";
  res.render("login", { error });
});

app.get("/registration", function (req, res) {
  let error = "";
  res.render("register", { error });
});

app.get("/namek", function (req, res) {
  let error = "";
  res.render("namek", { error });
});

const PORT = process.env.PORT || 3000;

// Експортуємо функцію, яка створює сервер
module.exports = app;

// Функція, яка запускає сервер
const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
