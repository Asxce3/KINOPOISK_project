const mongoose = require('mongoose')    //Подключение базы 
const Schema = mongoose.Schema

// Создание схемы для базы : какие будет принимать данные, какие будут ключи и тд
const RateSchema = new mongoose.Schema({
    rate: Number,
    text : String,
    filmId : {type: Schema.Types.ObjectId, ref: 'film'},
    authorId : {type: Schema.Types.ObjectId, ref: 'user'},
    date : {
        type: 'date',
        default: Date.now()
    }
})
// экспорт модели 
module.exports = mongoose.model('rate', RateSchema)
