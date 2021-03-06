const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl= document.getElementById('current-weather-items');
const timezone =document.getElementById('time-zone');
const countryEl= document.getElementById('country');
const weatherforecastEl=document.getElementById('weather-forecast');
const currentTempEl= document.getElementById('current-temp');

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "saturday"]
const months = ['Jan','Feb','Mar','Apr','May','June','jul','Aug','Sep','Oct','Nov','Dec']
const API_KEY ="378a07a7862dc854a6f7db187093ce32"

setInterval(() => {
    const time= new Date();
    const month= time.getMonth();
    const date =time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat=hour >> 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' :'AM'
    timeEl.innerHTML =hoursIn12HrFormat + ':' + minutes + ' ' + ampm
    dateEl.innerHTML = days[day]+','+date+' '+months[month]
},1000);
getweatherData()
function getweatherData(){
    navigator.geolocation.getCurrentPosition((success)=> {
        
        let {latitude, longitude}= success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data=>{

            console.log(data)
            showWeatherData(data);
        })
    })
}
function showWeatherData (data){

    let {humidity,pressure,sunrise,sunset,wind_speed}= data.current;

    currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>wind speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise*1000).format('hh:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('hh:mm a')}</div>
    </div>
    
    
    
    
    
    
    
    
    
    `;
    

    
}
