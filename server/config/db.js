const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/kinopoisk').then(() => {
    console.log('Connected to Mongodb')
}).catch((e) => {
    console.log('Failed to connect to Mongodb')
})