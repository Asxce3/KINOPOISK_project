// Подключаем библиотеки и модули, необходимые для аутентификации
const passport = require('passport'); // Подключаем Passport.js
const User = require('../auth/user'); // Подключаем модель пользователя
const bcrypt = require('bcrypt'); // Подключаем библиотеку для хэширования паролей
const localStrategy = require('passport-local'); // Подключаем локальную стратегию аутентификации

// Настраиваем локальную стратегию аутентификации с использованием Passport.js
passport.use(new localStrategy(
    {
        usernameField: 'email' // Указываем, что имя пользователя будет в поле 'email'
    },
    function(email, password, done) {
        User.findOne({ email }).then(user => {
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {return done(err)}
                    if (result) {return done(null, user)}
                });
            }else {
                return done('Пользователь не найден')
            }

        }).catch(e => {
            return done(e); // Ошибка при поиске пользователя в базе данных
        })
    }
));

// Сериализация пользователя (сохранение в сессии)
passport.serializeUser(function(user, done) {
    // console.log(user);
    done(null, user._id); // Сохраняем идентификатор пользователя в сессии
});

// Десериализация пользователя (восстановление из сессии)
passport.deserializeUser(function(id, done) {
    // console.log(id);
    // Находим пользователя по идентификатору в базе данных
    User.findById(id).then((user, err) => {
        done(err, user); // Передаем пользователя в десериализатор
    })
});
