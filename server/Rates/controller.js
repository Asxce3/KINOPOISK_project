const Rate = require('./Rates')
const Film = require('../films/film')
const saveRate = async(req, res)=>{
    if(req.body.authorId && req.body.filmId && req.body.rate)
    await new Rate({
        rate: req.body.rate,
        text : req.body.text,
        filmId : req.body.filmId,
        authorId : req.body.authorId,
    }).save()
    const film_count_rate = await Film.findById(req.body.filmId)
    const count_rate = film_count_rate.rates
    const total_rate = film_count_rate.total_rate
    await Film.findByIdAndUpdate(req.body.filmId,{
        rates : count_rate + 1,
        total_rate : total_rate + req.body.rate
    })

    res.status(200).send(true)
}

module.exports = {
    saveRate
}