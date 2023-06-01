import axios from "axios";
import router from "@/router";

export const ApiService = axios.create({
  baseURL: "http://localhost:8080", // Замените на ваш базовый URL API
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавьте функцию для установки токена авторизации
export function setAuthToken(token) {
  if (token) {
    ApiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete ApiService.defaults.headers.common["Authorization"];
  }
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

// Добавьте перехватчики для обработки ошибок или манипуляции данными запросов и ответов
ApiService.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Обработка ошибок запросов
    return Promise.reject(error);
  }
);

let isRedirected = false;

ApiService.interceptors.response.use(
  (response) => {
    const token = response.headers.authorization;
    if (token) {
      setToken(token);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Если получен ответ с кодом 401 и редирект еще не выполнялся
      if (!isRedirected && router.currentRoute.value.path !== "/login") {
        // Установите флаг редиректа на true
        isRedirected = true;
        // Выполните редирект на страницу /login
        router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

// Создайте экспорт для использования в компонентах Vue
export default {
  install(app) {
    app.config.globalProperties.$api = ApiService;
  },
};
