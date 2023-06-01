import express from 'express';
import mongoose from 'mongoose';
import auth from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

import cors from "cors"

// Створення інстансу додатку Express
const app = express();
app.use(cors())
// Налаштування парсера JSON для обробки запитів з JSON-даними
app.use(express.json());

// Підключення до бази даних MongoDB


const uri = "mongodb+srv://userDB:QOj7fGVyP5Pvg4w0@cluster0.nxm5qkh.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB', error);
  });

// Реєстрація маршрутів для користувачів
app.use(auth);
app.use(userRoutes);
app.use(eventRoutes);

// Запуск сервера
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
