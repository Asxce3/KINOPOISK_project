const Film = require('./film')
const User = require('../auth/user')
const fs = require('fs')
const path = require('path')

const createFilm = async (req, res)=>{
    if(req.file && req.body.titleRus.length > 2 &&
        req.body.titleEng.length > 2 &&
        req.body.time > 10 &&
        req.body.year > 0 &&
        req.body.country.length > 2 &&
        req.body.genre.length > 2)
    {
        if(req.body.video && req.body.video.length > 2){
            await new Film({
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year : req.body.year,
                time: req.body.time,
                video: req.body.video,
                country: req.body.country,
                genre: req.body.genre,
                image: `/images/films/${req.file.filename}`,
                author : req.user._id,
                rates : 0,
                total_rate : 0
            }).save()
        }   else if (req.body.series && req.body.series.length > 0){
            await new Film({
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year : req.body.year,
                time: req.body.time,
                series: req.body.series,
                country: req.body.country,
                genre: req.body.genre,
                image: `/images/films/${req.file.filename}`,
                author : req.user._id,
                rates : 0,
                total_rate : 0
            }).save()
        }
        res.redirect(`/admin/${req.user._id}`)
    }else {
        res.redirect('/new?error=1')

    }
}


const editFilm = async(req, res)=>{
    if(req.file && req.body.titleRus.length > 2 &&
        req.body.titleEng.length > 2 &&
        req.body.time > 10 &&
        req.body.year > 0 &&
        req.body.country.length > 2 &&
        req.body.genre.length > 2)
        {
            const films = await Film.findById(req.body.id)
            fs.unlinkSync(path.join(__dirname + '../../../public' + films.image))
            if (req.body.video && req.body.video.length > 2){
                await Film.findByIdAndUpdate(req.body.id, {
                    titleRus:req.body.titleRus,
                    titleEng:req.body.titleEng,
                    time:req.body.time,
                    video: req.body.video,
                    year:req.body.year,
                    country:req.body.country,
                    genre:req.body.genre,
                    image:`/images/films/${req.file.filename}`,
                    author : req.user._id
                })
            }   else if (req.body.series && req.body.series.length > 0){
                    await Film.findByIdAndUpdate(req.body.id, {
                        titleRus:req.body.titleRus,
                        titleEng:req.body.titleEng,
                        time:req.body.time,
                        series: req.body.series,
                        year:req.body.year,
                        country:req.body.country,
                        genre:req.body.genre,
                        image:`/images/films/${req.file.filename}`,
                        author : req.user._id
                    })
            }
            res.redirect('/admin/' + req.user._id)
        }else{
            res.redirect(`/edit/${req.body.id}`)
        }
}


const deleteFilm = async(req, res) => {
    const film = await Film.findById(req.params.id)
    if (film){
        fs.unlinkSync(path.join(__dirname + '../../../public' + film.image))
        await Film.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(400).send('Not found')
    }
}


const saveFilm = async(req, res) => {
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        const findFilm = user.toWatch.filter(item => item._id == req.body.id)
        console.log(user)
        if(findFilm.length == 0){
            user.toWatch.push(req.body.id)
            user.save()
            res.send('Фильм успешно сохранен')
        }else {
            res.send('Фильм уже сохранен')
        }
    }
    
}

const deleteFromToWatch = async(req, res) => {
    if(req.user && req.params.id){
        const user = await User.findById(req.user.id)
        for(let i = 0; i < user.toWatch.length; i ++){
            if(user.toWatch[i] == req.params.id){
                user.toWatch.splice(i, 1)
                user.save()
                res.send('Успешно удалено')
            } 
        }
        // res.send('данные не найдены')
    }
}
module.exports = {
    createFilm,
    editFilm,
    deleteFilm,
    saveFilm,
    deleteFromToWatch

}