import { verifyToken } from "../utils/auth.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Недействительный токен авторизации" });
  }

  const token = authHeader.split(" ")[1];
  const secretKey = "7F18C2441D1582488B87E6DB9081818FC1C9B8A734B1FF4B41F0313F4B146527"; // Замените на ваш секретный ключ

  try {
    const decodedToken = verifyToken(token, secretKey);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Недействительный токен авторизации" });
  }
};

export default authMiddleware;
