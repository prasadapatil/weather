const timeE1 = document.getElementById('time');
const Date1=document.getElementById('date');
const currentWeatherItems=document.getElementById('current_weather_items');
const timezone=document.getElementById('time_zone');
const countryE1=document.getElementById('country');
const weatherForecastE1=document.getElementById('weather_forecast');
const currentTempE1=document.getElementById('current_temp');
const body=document.getElementById('body');
const days=['SUNDAY','MONDAY','THUESDAY','WEDENSDAY','THURSDAY','FRIDAY','SATURDAY'];
const months=['JAN','FEB','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPT','OCT','NOV','DEC'];
const API_KEY='12f969083cffbf4acfc4a4d3efb83a09';

function opennext(){
    window.open("main.html");
}

setInterval(() => {
    const time =new Date();
    const month=time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const hoursIn12hrsFormat = hour>=13 ? hour%12 :hour
    const minutes =time.getMinutes();
    const ampm= hour>=12 ?'PM' :'AM'
    timeE1.innerHTML=(hoursIn12hrsFormat<10?'0'+hoursIn12hrsFormat:hoursIn12hrsFormat)+':'+(minutes<10?'0'+minutes:minutes)+''+'<span id="am-pm">'+ampm+'</span>'
    Date1.innerHTML=days[day]+','+date+' '+months[month]
}, 1000);


getWeatherData()


function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        var{latitude,longitude} =success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(data=>{
        showWeatherData(data);
        })   
    })
}


function showWeatherData(data){
    let{feels_like,humidity,pressure,sunrise,sunset,wind_speed}= data.current;
    console.log(data);
    currentWeatherItems.innerHTML=`
    <div class="weather_items">
    <div>HUMIDITY</div>
    <div>${humidity} g/m<sup>3</div>
</div>
<div class="weather_items">
    <div>PRESSURE</div>
    <div>${pressure} Pa</div>
</div>
<div class="weather_items">
    <div>WIND SPEED</div>
    <div>${wind_speed}m/hr</div>
</div>
<div class="weather_items">
    <div>SUNRISE</div>
    <div>${window.moment(sunrise *1000).format('HH:mm a')}</div>
</div>
<div class="weather_items">
    <div>SUNSET</div>
    <div>${window.moment(sunset *1000).format('HH:mm a')}</div>
</div>
<div class="weather_items">
<div>TEMP. FEEL</div>
<div>${feels_like}&#176; C</div>
</div>
`;

let otherDayForcast=''
data.daily.forEach((day,idx) => {
    if(idx==0){
        currentTempE1.innerHTML=`
        <div class="today" id="current_temp">   
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather_icon" class="w-icon">
        <div class="others"> 
        <div class="day">${window.moment(day.dt *1000).format('ddd')}</div>
        <div class="temp">NIGHT-${day.temp.night}&#176; C</div>
        <div class="temp">DAY-${day.temp.day}&#176; C</div>
    </div>
        `;   
    }else{
        otherDayForcast+=`
        <div class="weather_forecast_item">
        <div class="day">${window.moment(day.dt *1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weatherU_icon" class="w-icon">
        <div class="temp">NIGHT-${day.temp.night}&#176; C</div>
        <div class="temp">DAY-${day.temp.day}&#176; C</div>
    </div>
        `;
    }
 })

 weatherForecastE1.innerHTML=otherDayForcast;
let loc="https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en"

}
getAddrsData()
function getAddrsData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        var{latitude,longitude} =success.coords;
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`).then(res=>res.json()).then(data1=>{
        let{countryName,locality}=data1;
        let{name}=data1.localityInfo.administrative[1];
        countryE1.innerHTML=name+'/'+countryName;
        timezone.innerHTML=locality;
        })   
    })

}


styleselector()
function styleselector(){
    const time =new Date();
    const hour=time.getHours();
    const hoursIn12hrsFormat = hour>=13 ? hour%12 :hour
    //const hoursIn12hrsFormat=9;
    const ampm= hour>=12 ?'PM' :'AM'
    //const ampm='PM';
    if(hoursIn12hrsFormat==12 || hoursIn12hrsFormat<6 && ampm=="PM")
          body.style["background"]="url('https://img.wallpapersafari.com/desktop/1680/1050/1/84/MDyLf6.jpg')";
    else if((hoursIn12hrsFormat<=4 && ampm=="AM")||(hoursIn12hrsFormat>=8 && ampm=="PM"))
            body.style["background"]="url('https://wallpapercave.com/uwp/uwp448975.jpeg')";
    else if(hoursIn12hrsFormat>=6 && ampm=="PM"&& hoursIn12hrsFormat<8)
            body.style["background"]="url('https://img.wallpapersafari.com/desktop/1920/1080/55/95/uo1BqS.jpg')";          
    else if(hoursIn12hrsFormat>=5 && ampm=="AM"&& hoursIn12hrsFormat<8)
            body.style["background"]="url('https://img.wallpapersafari.com/desktop/1680/1050/93/75/bazxhP.jpg')";          
    else if(hoursIn12hrsFormat>=5 && ampm=="AM"&& hoursIn12hrsFormat<12)                 
            body.style["background"]="url('https://img.wallpapersafari.com/desktop/1920/1080/84/53/r6Z8Du.jpeg')";
 }   
