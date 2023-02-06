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


let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.querySelector(".msg");
const list = document.querySelector(".container .cities");


// localStorage.setItem("apiKey", EncryptStringAES("bd2dd23230ccd5427526d0bce0a617c4"));


form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  getWheater();

  e.currentTarget.reset()
});

const getWheater = async () =>{
const apiKey="bd2dd23230ccd5427526d0bce0a617c4";
// console.log(apiKey)

const cityName = input.value;
// console.log(cityName)
const units = "metric";
const lang = "tr";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`;


try{
        const response = await fetch(url).then(response=>response.json());

  // const response = await axios(url);
  // console.log(response)

  //---------------destruction-------------
  const {main,name,sys,weather,wind}=response
  
  //----------------icon------------------
  const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;


  //------------------------takrarı engelle--------------
  const cityNameSpans = list.querySelectorAll("span");

  if(cityNameSpans.length>0){
    const filtArr=[...cityNameSpans].filter(span => span.innerHTML==name);
    if(filtArr.length>0){
      msg.innerHTML=`⛔⛔⛔You already know the weather for ${name}, Please search for another city `;
      setTimeout(() => { msg.innerText = "" }, 5000);
      return;
    }
  }

  //------------------------kart yapısı--------------

  const itemLi=document.createElement("li")
  itemLi.classList.add("city")
  itemLi.classList.add("mx-3")
  itemLi.classList.add("text-warning")
  itemLi.classList.add("bg-secondary")
  itemLi.classList.add("p-3")
  itemLi.classList.add("rounded-3")
  

  itemLi.innerHTML=` <h2 class="city-name" data-name="${name},${sys.country}">
  <span>${name}</span>
  <sup>${sys.country}</sup> </h2>
  <div class="city-temp fs-3">${Math.round(main.temp)}<sup>°C</sup></div>
  <figure>
  <img class="city-icon" src="${iconUrlAWS}">
  <figcaption>${weather[0].description}</figcaption>
</figure> <span>Rüzgar:${wind.speed}knot</span>`;
 list.prepend(itemLi);
 itemLi.addEventListener("click", (e)=>{
 
  window.location.href = `https://openweathermap.org/find?q=${name}`;
});
} catch (error) {

  msg.innerText = "City not found!";
  setTimeout(() => { msg.innerText = "" }, 5000);
}

}
