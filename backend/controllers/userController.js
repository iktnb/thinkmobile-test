import User from "../models/User.js";

// Контролер для операцій з користувачами
const userController = {
  // Операція створення користувача
  create: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a user" });
    }
  },

  // Операція отримання всіх користувачів
  getAll: async (req, res) => {
    try {
      const users = await User.find().populate("events"); // Получение всех пользователей и связанных с ними событий
      const usersWithEventData = users.map((user) => {
        const eventData = {
          eventCount: user.events.length,
          nextEventDate: null, // Инициализация поля для даты следующего события
        };

        // Поиск следующего события пользователя
        const sortedEvents = user.events.sort(
          (a, b) => a.startDate - b.startDate
        );
        const currentDate = new Date();

        for (let i = 0; i < sortedEvents.length; i++) {
          const event = sortedEvents[i];
          if (event.startDate > currentDate) {
            eventData.nextEventDate = event.startDate;
            break;
          }
        }

        return { ...user._doc, ...eventData };
      });

      res.json(usersWithEventData); // Отправка пользователей с данными о событиях в качестве ответа на запрос
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Не удалось получить пользователей и данные о событиях.",
        });
    }
  },

  // Операція отримання користувача за ідентифікатором
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch the user" });
    }
  },

  // Операція оновлення користувача
  update: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update the user" });
    }
  },

  // Операція видалення користувача
  delete: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (deletedUser) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the user" });
    }
  },
};

export default userController;
