const http = require("http");
const getUsers = require("./modules/users");
const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer(async (request, response) => {
  // Парсим URL запроса
  const url = new URL(request.url, `http://${hostname}:${port}`);

  // Возвращаем 404, если путь не тот
  if (url.pathname !== "/") {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain");
    response.write("Not Found");
    response.end();
    return;
  }

  // Проверяем наличие параметров запроса
  if (url.searchParams.toString() !== "") {
    if (url.searchParams.has("hello")) {
      // Если есть параметр hello, формируем соответствующий ответ
      const name = url.searchParams.get("hello");
      if (name) {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.write(`Hello, ${name}.`);
        response.end();
      } else {
        // Если параметр hello указан, но отсутствует значение
        response.statusCode = 400;
        response.setHeader("Content-Type", "text/plain");
        response.write("Enter a name");
        response.end();
      }
    } else if (url.searchParams.has("users")) {
      // Если есть параметр users, возвращаем данные пользователей
      const users = await getUsers();
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(users));
      response.end();
    } else {
      // Если переданы другие параметры запроса
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.write("Bad Request");
      response.end();
    }
  } else {
    // Если параметры не переданы, возвращаем приветственное сообщение
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, world!");
    response.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
