/* Global Variables */
const appBaseUrl = 'http://localhost:3000';
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const country = 'us';
const apiKey = '73959e4866e9c4a923d16f622ba8c9ab';

//ADD Event to Generate
const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener("click",postUserData);

function postUserData(){
    const zipElement = document.querySelector("#zip");
    const feelingElement = document.querySelector("#feelings");
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    let newTime = d.getTime();
    getWeather(weatherUrl,zipElement.value,country,apiKey)
        .then(function(temp){
            const newEntry = {
                temp : temp,
                date : newDate,
                res : feelingElement.value
            };
            postData('/add',newEntry)
                .then(function(){
                    getData('/recent')
                        .then(function(data){
                            updateUI(data);
                        })
                });
        })
}

function updateUI(data){
    const dateElement = document.querySelector("#date");
    const tempElement = document.querySelector("#temp");
    const contentElement = document.querySelector("#content");
    dateElement.innerHTML = `Today is ${data.date}.`;
    tempElement.innerHTML = `Temperature is ${data.temp}.`
    contentElement.innerHTML = data.res;
}
// POST To APP Server
const postData = async (url, data )=>{
    const res = await fetch(
        appBaseUrl+url,
        {method: 'POST',
            credentials: 'same-origin',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(data)}
    );
    try{
        return await res.json();
    } catch(e){
        console.log("error", e);
    }
}

//GET from APP Server
const getData = async (url)=>{
    // const res = await fetch(baseURL+animal+key);
    const res = await fetch(appBaseUrl+url);
    try{
        return await res.json();
    } catch(error){
        console.log("error",error);
    }
}

//GET from weather API
const getWeather = async (weatherUrl,zipcode,country,apiKey)=>{
    // const res = await fetch(baseURL+animal+key);
    const res = await fetch(`${weatherUrl}${zipcode},${country}&units=metric&appid=${apiKey}`);
    try{
        const data = await res.json();
        return data.main.temp;
    } catch(error){
        console.log("error",error);
    }
}

getData('/recent')
    .then(function(data){
        updateUI(data);
    });


/*
//FOR TEST
const data = {temp : 23, date:'09.24.2020',res:'WOW!!!'};
postData('http://localhost:3000/add',data);

const zipcode = 94040;
console.log(`${weatherUrl}${zipcode},${country}&units=metric&appid=${apiKey}`);
getWeather(weatherUrl,zipcode,country,apiKey);*/
