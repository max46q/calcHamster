// handler.js
const express = require('express');
const app = express();

// Обробка маршрутів та налаштування додатку Express
app.get('/', (req, res) => {
  res.send('Hello from AWS Lambda!');
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
