
// global variables

let todaydate = new Date();
let newDate = (todaydate.getMonth()+1) +'.'+ todaydate.getDate()+'.'+ todaydate.getFullYear();
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=10ffbfc3e596c9d4151a0c7090860a78&units=metric';          // Personal API Key for OpenWeatherMap API
const zipcode = document.getElementById('zip');
const button = document.getElementById('generate');
const result = document.getElementById('entryHolder');
const weather = document.getElementById('weather');






// Event listener to add function to existing HTML DOM element

button.addEventListener('click', function (event){
    const feeling = document.getElementById('feelings').value;
    if (zipcode.value == false || feeling == false){                  // if statement to stop the event if the fields are empty             
        alert('Please insert Zipcode and your feeling :)')
        return 
        
    } else {
    getdata (baseURL,zipcode.value,apiKey)
    .then(function(keyValue){
        storedata('/addData',{newdate: newDate, temp: keyValue.main.temp, userfeeling: feeling , city: keyValue.name, descreption: keyValue.weather[0].main })
         updateData('/weatherData')
    })
       result.style.display ='block'; 
    }
    
});


/* Function to GET Web API Data*/

const getdata = async function (url,value,key){
    const request = await fetch (url+value+key);
    try{
        const response = await request.json();
        console.log(response);
       return response;
    } catch (error){
        console.log('Warning!', error);
    }
};

/* Function to POST data */

const storedata = async function (url = '', data = {}){
    console.log(data);
    const obj = await fetch (url ,{
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const postdata = await obj.json();
        console.log (postdata);
        return postdata;
    }
    catch(error){
        consol.log('Warning!',error)
    }
};


/* Function to GET Project Data */

const updateData = async function (url) {
    const UI = await fetch (url);
    try{
        const output = await UI.json()
        document.getElementById('date').value = output.newdate;
        document.getElementById('temp').value = output.temp +'°C';
        document.getElementById('content').value = output.userfeeling;
        document.getElementById('city').value = output.city;
        document.getElementById('weather').value= output.descreption;
        
        if (weather.value === "Clouds"){                                                // if statement to change background 
    document.body.setAttribute('class', 'clouds') }
        
        else if (weather.value === "Thunderstorm"){
    document.body.setAttribute('class', 'thunder') }
        
        else if (weather.value === "Drizzle"){
    document.body.setAttribute('class', 'drizzle') }
        
        else if (weather.value === "Rain"){
    document.body.setAttribute('class', 'rain') }
        
        else if (weather.value === "Snow"){
    document.body.setAttribute('class', 'snow') }
        
        else if (weather.value === "Clear"){
    document.body.setAttribute('class', 'clear') }
                
        console.log (output);
        return output;
    } catch(error){
        console.log('Warning!', error);
    }
};
