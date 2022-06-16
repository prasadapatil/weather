const timeE1 = document.getElementById('time');
const Date1=document.getElementById('date');
const mega=document.getElementById('mega');
const currentWeatherItems=document.getElementById('current_weather_items');
const timezone=document.getElementById('time_zone');
const countryE1=document.getElementById('country');
const weatherForecastE1=document.getElementById('weather_forecast');
const currentTempE1=document.getElementById('current_temp');
const body=document.getElementById('body');
const todayall=document.getElementById('todayall');
const next_hour=document.getElementById('next_hour');
const current_hour=document.getElementById('current_hour');
const days=['SUNDAY','MONDAY','THUESDAY','WEDENSDAY','THURSDAY','FRIDAY','SATURDAY'];
const months=['JAN','FEB','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPT','OCT','NOV','DEC',];
const API_KEY='12f969083cffbf4acfc4a4d3efb83a09';

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
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily,minutely&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(data=>{
        console.log(data);
        showWeatherData(data);
        })   
    })
}

function opennext(){
    window.open("model.html");
}


function showWeatherData(data){
    let{main,description,icon}= data.hourly[0].weather[0];
    let{temp,feels_like}=data.hourly[0];    
    mega.innerHTML=`<div class="mega">
    <div class="megatop">
        <div class="topimg">
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weatherU_icon" class="w-icon">
        </div>   
            <div class="megatopdata">${main}<br>
            <div class="megatopdatamini">${description}</div><br>
        </div>
    </div>
    <div class="megatemp">
        ${temp}&#176C
    </div>
    <div class="megafeel">
        it feels like ${feels_like}&#176C
    </div>
</div>`;
    let{clouds,dew_point,pop,humidity,pressure,uvi,visibility,wind_speed,wind_gust,wind_deg}=data.hourly[0];
    todayall.innerHTML=`
    <div class="content">
    <div class="content1u">Cloud Cover : ${clouds}</div>
    <hr><div class="content1d">Dew Cover : ${dew_point}</div>      
    </div><hr>
<div class="content">
    <div class="content2u">Precipitation : ${pop} %</div>
    <hr><div class="content2d">humidity : ${humidity} %</div>            
</div><hr>
<div class="content">
    <div class="content3u">pressure: ${pressure}</div>
    <hr><div class="content3d">UV Index : ${uvi}</div>      
</div><hr>
<div class="content">
    <div class="content4u">visibility: ${visibility} Units</div>
    <hr><div class="content4d">Wind Speed : ${wind_speed} km/hr</div>      
</div><hr>
<div class="content">
    <div class="content5u">Direction : ${wind_deg} &#176</div>
    <hr><div class="content5d">Wind Gust : ${wind_gust}</div>            
</div>
</div>
    `;

let{dt}=data.hourly[0];
const date1 =new Date(dt*1000);
const month=date1.getMonth()+1;
const date=date1.getDate();
const hour=date1.getHours();
const hoursIn12hrsFormat = hour>=13 ? hour%12 :hour
const minutes =date1.getMinutes();
const ampm= hour>=12 ?'PM' :'AM'
current_hour.innerHTML=`
<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather_icon" class="w-icon">
<div class="others"> 
<div class="date">${hoursIn12hrsFormat}:${minutes}&nbsp;${ampm}(${date}/${month})</div>
<div class="mintemp">TEMP.-${temp}&#176C</div>
<div class="maxtemp">POP-${pop}%</div>
</div>
</div>
`;
var i=1;
var otherhours='';
for(i=1;i<25;i++)
{
    let{dt}=data.hourly[i];
    const date1 =new Date(dt*1000);
    const month=date1.getMonth()+1;
    const date=date1.getDate();
    const hour=date1.getHours();
    const hoursIn12hrsFormat = hour>=13 ? hour%12 :hour
    const minutes =date1.getMinutes();
    const ampm= hour>=12 ?'PM' :'AM'
    let{icon}= data.hourly[i].weather[0];
    let{temp,pop}=data.hourly[i];
    otherhours+=`
    <div class="next_hour_item">
    <div class="day">${hoursIn12hrsFormat}:${minutes}&nbsp;${ampm}(${date}/${month})</div>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather_icon" class="w-icon">
    <div class="temp">NIGHT-${temp}&#176; C</div>
    <div class="temp">POP -${pop}</div>
</div>
    `
}
next_hour.innerHTML=otherhours;

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
    //const hoursIn12hrsFormat=6;
    const ampm= hour>=12 ?'PM' :'AM'
    //const ampm='AM';
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
