const inputIP = document.querySelector('.input-ip');
const btn = document.querySelector('.btn-submit');
const form = document.querySelector('form');
const map = L.map('mapid')

const ipEl = document.querySelector('.ipEl');
const locationEl = document.querySelector('.locationEl');
const timezoneEl = document.querySelector('.timezoneEl');
const ispEl = document.querySelector('.ispEl');

const locationIcon = L.icon({
   iconUrl: '/images/icon-location.svg'
});


window.addEventListener("DOMContentLoaded", event => {


   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

   fetch('http://ip.jsontest.com/')
      .then(response => response.json())
      .then(result => {
         console.log(result);
         getData(result.ip);
      })
 
   

})


form.addEventListener('submit', function (e) {
   e.preventDefault();
   getData(inputIP.value);
});



function getData(ip) {

   
   let url = 'https://geo.ipify.org/api/v1?apiKey=at_qwZt05mkXwh71mCHdYEmtW8y3UNZQ&ipAddress=' + ip


   fetch(url)
      .then(response => response.json())
      .then(result => {
         
         ipEl.innerHTML = result.ip;
         locationEl.innerHTML = result.location.city + ', ' + result.location.region + ' - ' + result.location.country;
         timezoneEl.innerHTML = "UTC " + result.location.timezone;
         ispEl.innerHTML = result.isp;

         map.setView([result.location.lat, result.location.lng], 16);
         L.marker([result.location.lat, result.location.lng], { icon: locationIcon }).addTo(map);
      })
      .catch(function () {
         console.log("error");

         ipEl.innerHTML = '';
         locationEl.innerHTML = '';
         timezoneEl.innerHTML = '';
         ispEl.innerHTML = '';
      });
}
