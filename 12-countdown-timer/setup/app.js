const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
console.log(deadline)
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 15, 30, 00);

// let futureDate = new Date(2020, 11, 20, 13, 12, 00);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const day = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${day} ${month} ${year} ${hours}:${minutes}`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  // 1s = 1000ms
  // 1m = 60s
  // 1h = 60m
  // 1d = 24h

  // values em ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  
  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor(t % oneDay / oneHour);
  let minutes = Math.floor(t % oneHour / oneMin);
  let seconds = Math.floor(t % oneMin / 1000);
  
  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return item = `0${item}`;
    }
    return item;
  }

  items.forEach(function(item, index) {
    item.innerHTML = format(values[index]);
  });

  if(t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();