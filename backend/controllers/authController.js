import { generateToken } from "../utils/auth.js";

const authController = {
  login: (req, res) => {
    // Проверка логина и пароля пользователя
    // ...
    const { username, password } = req.body;

    if (username !== "admin" || password !== "admin") {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }
    // Если аутентификация успешна, генерируем токен

    const token = generateToken();

    res.json({ token });
  },
};

export default authController;
