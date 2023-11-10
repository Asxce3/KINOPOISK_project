const Country = require('./Country')  //Подключение файла Genres

const data = [
    'Россия',
    'СССР',
    'США',
    'Франция',
    'Южная Корея',
    'Великобритания',
    'Япония',
    'Италия',
    'Испания',
    'Германия',
    'Турция',
    'Швеция',
    'Дания',
    'Норвегия',
    'Гонконг',
    'Австралия',
    'Бельгия',
    'Нидерланды',
    'Греция',
    'Австрия'
]
// Записать в колекцию Стран если она пустая 
async function writeDataCountry() {
    const length = await Country.count() //Проверка на длину базы
    if (length == 0){   //Если коллекция пуста то заполняет ее объектами
        data.map((item, index) =>{  // Занесению в колекцию объекта
            new Country({
                name: item,
                key:index
            }).save()   //Сохранение объекта
        })
    }
}

module.exports = writeDataCountry //Экспорт полученного результата
