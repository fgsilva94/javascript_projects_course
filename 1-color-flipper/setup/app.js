const colors = ["green", "yellow", "grey", "blue", "red", "rgb(133,122,200)", "rgb(128.128.0)", "#ff00ff", "#800080", "#f15025"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function() {
    // get random number between 0 - colors.length
    const randomNumber = getRandomNumber();
    //console.log(randomNumber);

    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];
});

function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}