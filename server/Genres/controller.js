const Genres = require('./Genres')   //Подключение файла Genres

const getAllGenres = async(req, res)=> {    // Получение всей коллекции
    const data = await Genres.find()    // Поиск объектов
    res.send({data})
}

module.exports = {getAllGenres} // Экспорт полученного результата 