const express = require('express')
const session = require('express-session')  // Сессия 
const mongooseStore = require('connect-mongo')  //Сохранение сесиии
const passport = require('passport')

const app = express()

require('./server/config/db')   // Подключение к базе 
require('./server/config/passport')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded())
app.use(express.json())
app.use(session({   // Используем пакет express-session для управления сессиями в Express.js
    name: 'kinopoisk.session',  // Устанавливаем имя сессии
    secret: 'keyboard cat', // Устанавливаем секретное ключевое слово для подписи данных сессии
    maxAge: 1000 * 60 * 60 * 7, // Устанавливаем максимальное время жизни сессии 7 часов
    resave : false, // Данные сессии будут перезаписываться только при изменении
    store: mongooseStore.create({   // Хранилище для данных сессии в MongoDB с помощью mongooseStore
        mongoUrl: 'mongodb://localhost:27017'   // URL-адрес MongoDB, где будут храниться данные сессий
    })
}))
// Инициализация Passport.js
app.use(passport.initialize());

// Настройка поддержки сессий для Passport.js
app.use(passport.session());

app.set('view engine', 'ejs')
app.use(require('./server/pages/router')) // Подключение к роутеру страниц    
app.use(require('./server/Genres/router')) // Подключение к роутеру с базой жарнов
app.use(require('./server/Country/router')) // Подключение к роутеру с базой Стран
app.use(require('./server/auth/router')) // Подключение к роутеру с базой Регистрации
app.use(require('./server/films/router'))
app.use(require('./server/Rates/router'))

const PORT = 8000
app.listen(PORT, ()=>{
    console.log(`Server  listening on port : ${PORT}`)
})

