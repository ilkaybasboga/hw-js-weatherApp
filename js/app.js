// *************Date************** */
const date = document.querySelector(".date");
date.innerHTML =
  new Date().getDate() +
  "/" +
  new Date().getMonth() +
  1 +
  "/" +
  new Date().getFullYear();

// *************Date************** */

function getTime() {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  document.querySelector(".hour").innerText = hour;
  document.querySelector(".minute").innerText = minute;
  document.querySelector(".second").innerText = second;
}
setInterval(function () {
  getTime();
}, 1000);

// *************weather************** */

let weather = document.getElementById("weather");
let form = document.getElementById("form");
let input = document.getElementById("input");
let btn = document.getElementById("button-addon1");
let card1=document.getElementById("card1")

form.addEventListener("submit", (e) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=2fbafbe3eb671e5aaa277f9324a67ddf&units=metric`
  )
    .then((res) => res.json())
    .then((x) => getWheater(x))
    .catch((err) => console.log(err));

  e.preventDefault();
});

function getWheater(data) {
  console.log(data);

const card = document.createElement("div");
card.className="card m-1 col-6 col-sm-4 col-lg-2 bg-secondary text-start"
card1.prepend(card)

 
  const cardBody = document.createElement("div");
  card.appendChild(cardBody);
  cardBody.className="card-body bg-secondary m-1 w-100"

  const cityName = document.createElement("h");
  cardBody.appendChild(cityName);
  cityName.className="text-warning my-1 text-uppercase text-center"
  const cityTemp = document.createElement("p");
  cardBody.appendChild(cityTemp);
  const cityTempFeel = document.createElement("p");
  cardBody.appendChild(cityTempFeel);
  const cityPres = document.createElement("p");
  cityPres.className="d-none d-sm-none d-md-block"
  cardBody.appendChild(cityPres);
  const cityWind = document.createElement("p");
  cityWind.className="d-none d-sm-none d-md-block"
  cardBody.appendChild(cityWind);
  const cityNameRe = data.name.split(" ")[0];
  console.log(cityNameRe);
  cityName.innerHTML = `
    City :${cityNameRe}`;
  cityTemp.innerHTML = `
    Temp :${data.main.temp} °C`;
  cityTempFeel.innerHTML = `
    Feels Temp:${data.main.feels_like} °C`;
  cityPres.innerHTML = `
    Press:${data.main.pressure} mmHg`;
  cityWind.innerHTML = `
    Wind:${data.wind.speed} knot`;

    
      
      input.value=""
   
}
