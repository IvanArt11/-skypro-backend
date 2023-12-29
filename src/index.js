const http = require("http");
const getUsers = require("./modules/users");
const hostname = "http://127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, hostname);
  const params = url.searchParams;

  // если параметры переданы...
  if (params.toString() !== "") {
    // строка поиска не пуста
    if (params.has("hello")) {
      //если в запросе параметр: "hello" (вернет Boolean)
      const name = params.get("hello"); // возвращаем первое значение, связанное с заданным параметром поиска
      if (name) {
        response.status = 200;
        response.header = "Content-Type: text/plain";
        response.write(`Hello, ${name}.`);
        response.end();
        return;
      } else {
        response.status = 400;
        response.header = "Content-Type: text/plain";
        response.write("Enter a name");
        response.end();
        return;
      }
    } else if (params.has("users")) {
      response.status = 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: application/json";
      response.write(getUsers());
      response.end();
      return;
    } else {
      response.status = 500;
      response.header = "Content-Type: text/plain";
      response.write("");
      response.end();
      return;
    }
  }

  // Если никакие параметры не переданы...
  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello, world!");
  response.end();
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу ${hostname}:${port}`);
});
