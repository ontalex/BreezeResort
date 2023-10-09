# Модуль В. Разработка клиента сервера. BreezeResort

## Подход
- разобраться с базой
    - вычлинить таблицы
        - наименования
        - столбцы
    - продумать связки
- endpoints
    - ссылки
    - доступнось авторизации
    - типы rest api
    - запросы под endpoints
- cors

## База
Таблицы:
users (id, username, password), 
rooms (id, idhotel (hotels), name, desc_data), 
clients (id, fio, email, phone, id_childata (rooms), birth_date)
hotels (id, name, number)

## Endpoint

***Сотрудники***

/signup POST

/login POST

***Комноты***

/room POST

/rooms GET

/room/[id] DELETE

***Клиенты***

/register POST

/userdata/[id] PATCH

/userdata/[id] DELETE

/room/[id]/userdata/[iduser] GET

/usersinroom GET

***Отели***

/hotel POST

/hotels GET

/hotel/[id] DELETE

/hotel/[id]/room/[idroom] GET

/roomsinhotels GET



