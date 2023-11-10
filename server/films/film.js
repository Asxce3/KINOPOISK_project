const mongoose = require('mongoose')    //Подключение базы 
const Schema = mongoose.Schema

// Создание схемы для базы : какие будет принимать данные, какие будут ключи и тд
const FilmSchema = new mongoose.Schema({
    titleRus: String,
    titleEng: String,
    year : Number,
    time: Number,
    video: String,
    series : [],
    country: {type: Schema.Types.ObjectId, ref: 'country'},
    genre: {type: Schema.Types.ObjectId, ref: 'genre'},
    image: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    rates : Number,
    total_rate : Number
})
// экспорт модели 
module.exports = mongoose.model('film', FilmSchema)
