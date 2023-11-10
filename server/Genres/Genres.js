const mongoose = require('mongoose')    //Подключение базы 

// Создание схемы для базы : какие будет принимать данные, какие будут ключи и тд
const GenreSchema = new mongoose.Schema({
    name: String,
    key : Number,

})
// экспорт модели 
module.exports = mongoose.model('genre', GenreSchema)
