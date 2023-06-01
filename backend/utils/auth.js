import jwt from "jsonwebtoken";
const secretKey = "7F18C2441D1582488B87E6DB9081818FC1C9B8A734B1FF4B41F0313F4B146527"; // Замените на ваш секретный ключ

function generateToken() {
    const token = jwt.sign({ username: 'admin' }, secretKey, { expiresIn: '1h' });
    return token;
  }

const verifyToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Недействительный токен авторизации");
  }
};

export { generateToken, verifyToken };
