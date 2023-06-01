import Event from "../models/Event.js";
import User from "../models/User.js";

// Создать новое событие
export const createEvent = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, startDate, endDate } = req.body;
    // Проверяем существование пользователя
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const event = new Event({
      title,
      description,
      startDate,
      endDate,
      user: userId,
    });
    const createdEvent = await event.save();
    user.events.push(event);
    await user.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить информацию о конкретном событии
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { title, description, startDate, endDate } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, startDate, endDate },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить конкретное событие
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserEvents = async (req, res) => {
    try {
      const user = req.params.userId; // Получение ID пользователя из параметров запроса
      const userEvents = await Event.find({ user }); // Поиск всех событий с соответствующим ID пользователя
      res.json(userEvents); // Отправка событий в качестве ответа на запрос
    } catch (error) {
      res.status(500).json({ error: 'Не удалось получить события пользователя.' });
    }
  };
