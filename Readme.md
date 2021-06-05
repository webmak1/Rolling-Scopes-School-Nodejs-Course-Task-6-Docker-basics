# RS School TypeScript basics

Привет!

Разрабатывается и тестируется в последней Ubuntu LTS.

Если вы работаете windows и есть gmail аккаунт, работу можно протестировать в бесплатных облаках google.
https://shell.cloud.google.com/

<br/>

### Результаты тестов

<br/>

![Application](/img/pic-01.png?raw=true)

<br/>

### Результаты линтреа

<br/>

![Application](/img/pic-02.png?raw=true)

<br/>

В **.eslintrc.json** прописано

```
"@typscript-eslint/no-unused-vars": "off",
"@typscript-eslint/no-unused-params": "off",
```

т.к. данные правила проверяются комилятором tsc и нет необходимости делать проверку еще и linter.

<br/>

<br/>

### Комментарии к задачам:

Логгирование в консоль и в файлы. В файлы логов создаются в app/logs.

<br/>

1. реализовано логирование (url, query parameters, body) для всех запросов к серверу с использованием middleware

<br/>

Реализовано в файле app.js

```js
app.use((req, res, next) => {
  writeAccessLog(req);
  next();
});
```

2. добавлена централизованная обработка всех ошибок, которая включает отправку респонса с соответствующим кодом http статуса и их логирование с использованием middleware

<br/>

Реализовано в файле app.js

```js
app.use((err, req, res, next) => {
  writeErrorLog(err, req, res);
  return res
    .status(INTERNAL_SERVER_ERROR)
    .send(getStatusText(INTERNAL_SERVER_ERROR));
  next();
});
```

3. добавлены обработка и логирование ошибок на событие `uncaughtException

<br/>

Реализовано в файле loggingConfig.js

<br/>

Можно разкомментировать в файле app.js

// uncaughtException
// throw Error('Oops!');

чтобы вызвать ошибку.

```js
process.on('uncaughtException', (error) => {
  logger.error('----------------------------');
  logger.error('CRITICAL - UNCOUGHT EXCEPTION!');
  logger.error('----------------------------');
  logger.error(error.stack);
});
```

4. добавлены обработка и логирование ошибок на событие `unhandledRejection

<br/>

Реализовано в файле loggingConfig.js

Можно разкомментировать в файле app.js

// unhandledRejection
// Promise.reject(Error('Oops!'));

чтобы вызвать ошибку.

```js
process.on('unhandledRejection', (error) => {
  logger.error('----------------------------');
  logger.error('CRITICAL - UNHANDLED REJECTION!');
  logger.error('----------------------------');
  logger.error(error.stack);
});
```

5. процесс логирования осуществляется единственным модулем

Все в файле loggingConfig.js

<br/>

### Проверки:

Проверка получения query параметров:

```
$ curl \
    --header "Content-Type: application/json" \
    --request GET http://localhost:4000/users?user=admin&pass=admin
```

**результат:**

```
[6/5/2021, 7:36:36 AM] info: ----------------------------
[6/5/2021, 7:36:36 AM] info: method = "GET"
[6/5/2021, 7:36:36 AM] info: url = "/users?user=admin"
[6/5/2021, 7:36:36 AM] info: body = {}
[6/5/2021, 7:36:36 AM] info: query = {"user":"admin"}
[6/5/2021, 7:36:36 AM] info: ----------------------------
```

<br/>

Проверку остальных параметров можно посмотреть при запуске тестов.

<br/>

```
// Обращение к несуществующему ресурсу
$ curl \
    --header "Content-Type: application/json" \
    --request GET http://localhost:4000/user \
    | python -m json.tool
```

**returns**

```
{
    "error": "Not Found",
    "message": "Can't find /user on this server!"
}
```

<br/>

**Результат в error.log**

```
[6/5/2021, 7:37:19 AM] error: ----------------------------
[6/5/2021, 7:37:19 AM] error: error = {"name":"Not Found"}
[6/5/2021, 7:37:19 AM] error: method = "GET"
[6/5/2021, 7:37:19 AM] error: statusCode = "Not Found"
[6/5/2021, 7:37:19 AM] error: statusCode = "Can't find /user on this server!"
[6/5/2021, 7:37:19 AM] error: params = {}
[6/5/2021, 7:37:19 AM] error: url = "/user"
[6/5/2021, 7:37:19 AM] error: body = {}
[6/5/2021, 7:37:19 AM] error: query = {}
[6/5/2021, 7:37:19 AM] error: stack = "Not Found: Can't find /user on this server!\n    at /home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/src/app.ts:38:15\n    at Layer.handle [as handle_request] (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:137:13)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at Route.dispatch (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:112:3)"
[6/5/2021, 7:37:19 AM] error: ----------------------------

```
