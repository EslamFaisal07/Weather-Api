

let input = document.getElementById("location-input");
let searchButton = document.getElementById("find-btn");


let loading = document.querySelector(".loader")
let apiKey = "4f15abbdf9804b4eb88130837241306";
let locationBtn =document.getElementById("location")




locationBtn.addEventListener("click",function(){
    yourLocation()
    clearInput()

})

function yourLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
      
          let loc = `${latitude},${longitude}`;
          getWeather(loc);
        });
      }
}



input.addEventListener("input",function(){
    let location = input.value;
    getWeather(location)
  
})




  searchButton.addEventListener("click",function(){
    let location = input.value;
    getWeather(location)
    clearInput()
  })

document.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        let location = input.value;
        getWeather(location)
        clearInput()
    }
   
})




async function getWeather(location) {
    try {
        loading.classList.remove("d-none")

        let api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=6&q=${location}`);
        let data = await api.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    




    }finally{
        loading.classList.add("d-none")
    }
}
getWeather("cairo");


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayData(data) {
    let box = ``;
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
        
        let date = new Date(data.forecast.forecastday[i].date);

        if (i == 0) {
            box += `
                 
        <div class="col-sm-12 col-md-6 col-lg-4">

<div class="box-item  bg-body-secondary shadow-lg rounded-3 px-3 py-4">
    <div class="header fw-bold text-dark d-flex justify-content-around align-items-center ">
        <p>${days[date.getDay()]}</p>
        <p>${date.getDate()} ${months[date.getMonth()]}</p>
    </div>

    <div class="item-content">
        <div class="city mb-3  d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-city m-2 text-warning cit-icon"></i>
            <p class="mt-3 fw-bold text-warning">${data.location.name}</p>
        </div>
        
        <h1 class="text-center mb-3">${data.current.temp_c}°C</h1>

        <div class="icon mb-4 d-flex justify-content-around align-items-center">
                        <img src="https:${data.current.condition.icon}" alt="temb-icon">
                       <p class="text-primary">${data.current.condition.text}</p>
        </div>
         <div class="status d-flex justify-content-around align-items-center">
    <div class="sunrise text-center">
        <p class="text-warning fw-bold"><i class="fa-regular fa-sun"></i> Sunrise</p>
        <p class="fw-semibold">${data.forecast.forecastday[i].astro.sunrise}</p>
    </div>
    <div class="sunset text-center">
        <p class="text-success fw-bold"><i class="fa-regular fa-moon"></i> Sunset</p>
        <p class="fw-semibold">${data.forecast.forecastday[i].astro.sunset}</p>
    </div>
    </div>
        <div class="footer pt-3 d-flex justify-content-around align-items-center">
            <p class="text-danger"><i class="fa-solid fa-umbrella fot-icon"></i> ${data.current.humidity}%</p>
            <p class="text-danger"><i class="fa-solid fa-wind fot-icon"></i> ${data.current.wind_kph} km/h</p>
            <p class="text-danger"><i class="fa-regular fa-compass fot-icon"></i> East</p>
        </div>
       
</div>
</div>


        </div>
            `;
        } else {
            box += `
               
        <div class="col-sm-12 col-md-6 col-lg-4">

        <div class="box-item  bg-body-secondary shadow-lg rounded-3 px-3 py-4">
             <div class="header fw-bold text-dark d-flex justify-content-around align-items-center ">
        <p>${days[date.getDay()]}</p>
        <p>${date.getDate()} ${months[date.getMonth()]}</p>
    </div>
            <div class="item-content">
                <div class="city mb-3  d-flex justify-content-center align-items-center">
                  <img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="temb-icon">
                </div>
                
                <h1 class="text-center text-danger mb-5">${data.forecast.forecastday[i].day.maxtemp_c}°C</h1>
       

                <div class="icon mb-5 d-flex justify-content-around align-items-center">
                    
                       
                        <p class="text-danger fw-bolder"><span class="text-dark">Min-temp:</span> ${data.forecast.forecastday[i].day.mintemp_c}°</p>
                   
                  
                    <p class="text-primary">${data.forecast.forecastday[i].day.condition.text}</p>
                </div>
<div class="status d-flex justify-content-around align-items-center">
    <div class="sunrise text-center">
        <p class="text-warning fw-bold"><i class="fa-regular fa-sun"></i> Sunrise</p>
        <p class="fw-semibold">${data.forecast.forecastday[i].astro.sunrise}</p>
    </div>
    <div class="sunset text-center">
        <p class="text-success fw-bold"><i class="fa-regular fa-moon"></i> Sunset</p>
        <p class="fw-semibold">${data.forecast.forecastday[i].astro.sunset}</p>
    </div>
</div>


             
            </div>
        </div>
        
        
        
                </div>
         `
;
        }
    }
    document.getElementById("rowData").innerHTML = box;
}



function clearInput(){
    input.value = "";
}


