# RS School TypeScript basics

Привет!

Разрабатывается и тестируется в последней Ubuntu LTS.

Если вы работаете windows и есть gmail аккаунт, работу можно протестировать в бесплатных облаках google.
https://shell.cloud.google.com/

<br/>

### Запуск

Запушить контейнер.


$ docker-compose up --build

http://localhost:4000/doc/


$ docker network ls


$ docker exec -it app sh

psql -h postgres -p 5432 -d db -U user -W


postgres=# \l


$ docker network inspect rs-network -f "{{json .Containers }}" \
| python -m json.tool


```
{
    "15e00cc6e52c0f86742d77540ff637e995281dc0ee30d597d4d117e7ec163527": {
        "EndpointID": "51475a2c37bd2ebf27b1019f86e2be88227023b1d1ea7adbf49c9690c2e046d9",
        "IPv4Address": "172.22.0.2/16",
        "IPv6Address": "",
        "MacAddress": "02:42:ac:16:00:02",
        "Name": "postgres"
    },
    "ef0aecae430c7ae6a3794d8c2af5ed1e08ca35e21aa84456b872585cae6fd524": {
        "EndpointID": "aab33f1d5e6b0038d78d2f3e92a54d2f408255d214196b9fb26f8399b55c7d4e",
        "IPv4Address": "172.22.0.3/16",
        "IPv6Address": "",
        "MacAddress": "02:42:ac:16:00:03",
        "Name": "app"
    }
}
```


Добавить NYX


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
app.use((req: Request, _res: Response, next: NextFunction) => {
  writeAccessLog(req);
  next();
});
```

2. добавлена централизованная обработка всех ошибок, которая включает отправку респонса с соответствующим кодом http статуса и их логирование с использованием middleware

<br/>

Реализовано в файле app.js

```js
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  writeErrorLog(err, req);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    error: err.name,
    message: err.message,
  });
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
    --request GET 'http://localhost:4000/users?user=admin&pass=admin'
```

<br/>

**результат:**

```
[Sat, 05 Jun 2021 22:12:27 GMT] info: ----------------------------
[Sat, 05 Jun 2021 22:12:27 GMT] info: method = "GET"
[Sat, 05 Jun 2021 22:12:27 GMT] info: url = "/users?user=admin&pass=admin"
[Sat, 05 Jun 2021 22:12:27 GMT] info: body = {}
[Sat, 05 Jun 2021 22:12:27 GMT] info: query = {"user":"admin","pass":"admin"}
[Sat, 05 Jun 2021 22:12:27 GMT] info: ----------------------------
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
[Sat, 05 Jun 2021 22:11:31 GMT] error: ----------------------------
[Sat, 05 Jun 2021 22:11:31 GMT] error: error = {"name":"Not Found"}
[Sat, 05 Jun 2021 22:11:31 GMT] error: method = "GET"
[Sat, 05 Jun 2021 22:11:31 GMT] error: statusCode = "Not Found"
[Sat, 05 Jun 2021 22:11:31 GMT] error: statusCode = "Can't find /user on this server!"
[Sat, 05 Jun 2021 22:11:31 GMT] error: params = {}
[Sat, 05 Jun 2021 22:11:31 GMT] error: url = "/user"
[Sat, 05 Jun 2021 22:11:31 GMT] error: body = {}
[Sat, 05 Jun 2021 22:11:31 GMT] error: query = {}
[Sat, 05 Jun 2021 22:11:31 GMT] error: stack = "Not Found: Can't find /user on this server!\n    at /home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/src/app.ts:38:15\n    at Layer.handle [as handle_request] (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:137:13)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at next (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:131:14)\n    at Route.dispatch (/home/marley/projects/dev/rsschool/Rolling-Scopes-School-Nodejs-Course-Task-5-Logging-Error-Handling/node_modules/express/lib/router/route.js:112:3)"
[Sat, 05 Jun 2021 22:11:31 GMT] error: ----------------------------

```
