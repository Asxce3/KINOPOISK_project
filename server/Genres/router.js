const express = require('express')
const router = express.Router()
const {getAllGenres} = require('./controller')  //Подключение файла controller
const writeDataGenre = require('./seed')    //Подключение файла seed

router.get('/api/genre', getAllGenres)  // Если поступил get запрос то выдает массив getAllGenres
// writeDataGenre()

module.exports = router