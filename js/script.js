const time = document.querySelector('.time')
const date = document.querySelector('.date')
const greeting = document.querySelector ('.greeting')
const name = document.querySelector('.name')
const body = document.body

const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description') 
const city = document.querySelector('.city')

const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

const playBt = document.querySelector('.play.player-icon')
const audio = new Audio()
const playNext = document.querySelector('.play-next')
const playPrev = document.querySelector('.play-prev')

const li = document.createElement('li')
//document.querySelector('ul').appendChild(li)
console.log()



import playList from './playList.js';







let playNum = 0
let isPlay = false
let randomNum
city.value = 'Izhevsk'

console.log(playList[playNum])




function showTime(){
    const date1 = new Date();
    time.textContent = date1.toLocaleTimeString()
    showDate ()
    showGreeting ()
    setTimeout(showTime , 1000);
}

function showDate (){
    const date2 = new Date()
    const options = {weekday: 'long' , month: 'long' , day: 'numeric' ,  timeZone: 'UTC'};
    const currentDate = date2.toLocaleDateString('en-En', options);
    date.textContent = currentDate

}

function getTimeOfDay () {
    const date = new Date()
    const hours = date.getHours()
    if (hours >= 6 && hours < 12){
        return ('morning')
    } else if (hours >= 12 && hours < 18){
        return ('afternoon')
    } else if (hours >= 18 && hours < 24){
        return ('evening')
    } else {
        return ('night')
    }
}

function showGreeting (){
    const timeOfDay = getTimeOfDay()
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText
}

showTime()


function setLocalStorage () {
    localStorage.setItem('name' , name.value);
}

window.addEventListener ('beforeunload' , setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    } 
}

window.addEventListener('load' , getLocalStorage)

function getRandomNum (min , max ) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNum
}

getRandomNum(1 , 20)

function setBg () {
    let timeOfDay = getTimeOfDay ()
    let bgNum = String(randomNum).padStart(2 , '0')
    const img = new Image ()
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    }
    console.log(bgNum)

}

setBg()

function getSlideNext(){
    if(randomNum == 20){
        randomNum = 1
    } else {
        randomNum +=1 
    }
    setBg()
}

function getSlidePrev(){
    if(randomNum == 1){
        randomNum = 20
    } else {
        randomNum -=1 
    }
    setBg()   
}

slideNext.addEventListener('click' , getSlideNext)

slidePrev.addEventListener('click' , getSlidePrev)

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=7fd1e3c589dee832b1ba53fced9fe9cf&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}

getWeather()

city.addEventListener('change' , getWeather)

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    
    const random = getRandomNum(0 , 5)
    quote.textContent = data[random].text
    author.textContent = data[random].author
    console.log(data);
}

getQuotes()

changeQuote.addEventListener('click' , getQuotes)

function audioPlayer () {
    function playAudio (){
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
    }
    function pauseAudio(){
        audio.pause()
    }
    if(isPlay === false){
        isPlay = true
        playAudio()
    } else {
        isPlay = false
        pauseAudio()
    }
    console.log(isPlay)
}

playBt.addEventListener('click' , audioPlayer)

function toggleBtn(){
    playBt.classList.toggle('pause');
}

playBt.addEventListener('click' , toggleBtn)

function nextBtn(){
    if(isPlay === false){
        
         playBt.classList.add('pause')
         
    } else if(isPlay === true){
        isPlay = false
        return isPlay
    }

}

function playN (){
    if(playNum === 3){
        playNum = 0
    }else{
        ++playNum
    }
    
    nextBtn()
    audioPlayer()
}

function playP (){
    if(playNum === 0){
        playNum = 3
    }else{
        --playNum
    }
    
    nextBtn()
    audioPlayer()
}

playNext.addEventListener('click' , playN)

playPrev.addEventListener('click' , playP)

