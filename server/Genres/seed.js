const Genres = require('./Genres')  //Подключение файла Genres

// Массив с жанрами 
const data = [
    'Комедии',
    'Мультфильмы',
    'Ужасы',
    'Фантастика',
    'Триллеры',
    'Боевики',
    'Мелодрамы',
    'Детективы',
    'Приключения',
    'Фэнтези'
]
// Записать в колекцию жанра если она пустая 
async function writeDataGenre() {
    const length = await Genres.count() //Проверка на длину базы
    if (length == 0){   //Если коллекция пуста то заполняет ее объектами
        data.map((item, index) =>{  // Занесению в колекцию объекта
            new Genres({
                name: item,
                key:index
            }).save()   //Сохранение объекта
        })
    }
}

module.exports = writeDataGenre //Экспорт полученного результата