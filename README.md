## GALAXY TEST

Тестовое задание.
```text
Сделать, форму на Angular, так, чтобы 
при открытии из формы отправлялся POST запрос {“action”: “params”}, который вернет JSON, содержащий данные о количестве запросов (count) и задержек (delay) между ними
по нажатии на кнопку Отправить нужно чтобы отправлялось необходимое количество (count) параллельных POST запросов с указанной задержкой (delay) между ними. Формат запроса {“action”: “process”}
вывести в список в этой форме ответы от backend - каждый ответ, отдельная строка


Запускать backend 
java -jar ServerTest.jar <parameters>

parameters:
-h help
-p port
-c count
-d delay ms
-t timeout ms

Например:
java -jar ServerTest.jar -p 4521 -c 10 -d 1000
```

# Запуск приложения

```bash
$ docker-compose up
```

В хостах указываем

```text
192.168.160.10 test.galaxy.ru
```

После запуска docker приложение доступно по адресу [https://test.galaxy.ru/](https://test.galaxy.ru/)
