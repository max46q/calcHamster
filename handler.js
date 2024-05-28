// handler.js
const express = require("express");
const app = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const ejs = require("ejs");

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////













// Обробка маршрутів та налаштування додатку Express
app.get("/login", function (req, res) {
  let error = "";
  res.render("login", { error });
});

app.get("/namek", (req, res) => {
  res.render("namek");
});
// Експортуємо функцію-обработчик для AWS Lambda
exports.handler = async (event, context) => {
  // Запускаємо додаток Express, щоб обробити подію Lambda
  const response = await new Promise((resolve, reject) => {
    app(event, context, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  return response;
};
