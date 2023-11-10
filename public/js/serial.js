let addFilmUrlBtn = document.querySelector('#addFilmUrlBtn')
let addSeriesBtn = document.querySelector('#addSeriesBtn')
let urls = document.querySelector('#urls')
function addSeries(){
    if (addFilmUrlBtn){
        addFilmUrlBtn.style.display = 'none'
    }   

    let series = document.createElement('div')
    series.classList.add("series")
    let number = document.querySelectorAll('.series')

    let title = document.createElement('p')
    let input = document.createElement('input')

    title.innerHTML = number.length + 1 + ' Серия'
    input.name = "series" 
    input.placeholder = "Введите ссылку на видео"
    series.append(title)
    series.append(input)
    urls.append(series)
}

function addFilmUrl(){
    if (addSeriesBtn){
        addSeriesBtn.style.display = 'none'
    }   
    
    let filmUrl = document.querySelectorAll('#filmUrl')
    if(filmUrl.length <= 0){
        urls.innerHTML = 
        `<fieldset class="fieldset">
            <label for="">Ссылка на фильм</label>
            <input type="text" placeholder="Введите ссылку на фильм" name="video">
        </fieldset>`
    }
}
