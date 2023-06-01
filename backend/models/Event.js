import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: async function (value) {
        // Проверяем, есть ли другие события с перекрытием времени
        const count = await this.model("Event").countDocuments({
          _id: { $ne: this._id }, // Исключаем текущее событие из проверки
          user: this.user, // Проверяем только события этого же пользователя
          startDate: { $lt: this.endDate }, // Проверяем перекрытие времени
          endDate: { $gt: this.startDate },
        });

        return count === 0; // Возвращаем true, если нет перекрытий, иначе false
      },
      message: "Нельзя создавать события на уже занятое время",
    },
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
