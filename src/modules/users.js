const fs = require("fs").promises; // Используем промисы для асинхронных вызовов
const path = require("path");

const getUsers = async () => {
  const filePath = path.join(__dirname, "../data/users.json");
  try {
    const jsonData = await fs.readFile(filePath, "utf8");
    return JSON.parse(jsonData); // Парсим файл JSON и возвращаем объект
  } catch (err) {
    console.error("Error reading or parsing users file", err);
    return []; // В случае ошибки чтения файла или парсинга, возвращаем пустой массив
  }
};

module.exports = getUsers;
