import User from '../models/User.js';

// Сервіс для бізнес-логіки пов'язаної з користувачами
const userService = {
  // Приклад методу сервісу
  countEvents: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (user) {
        const eventCount = user.events.length;
        return eventCount;
      }
      return 0;
    } catch (error) {
      throw new Error('Failed to count events');
    }
  },
};

export default userService;