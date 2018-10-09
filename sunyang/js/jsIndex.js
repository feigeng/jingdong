let headerOne = document.getElementsByClassName("header-one")[0],
    car = headerOne.getElementsByTagName("li"), shop = document.getElementsByClassName("shop")[0];

car[car.length - 1].addEventListener("mouseover", function () {
    shop.style = "top:160px;transition:top .5s"
});
car[car.length - 1].addEventListener("mouseout", function () {
    shop.style = "top:62px;transition:top .5s"
});


let search = document.getElementsByClassName("search")[0];

search.children[0].addEventListener("focus", function () {
    search.children[0].style.borderColor = "#ff6700";
    search.children[1].style.borderColor = "#ff6700";
    search.children[2].style.display = "none";
    search.children[3].style.display = "block";
});
search.children[0].addEventListener("blur", function () {
    search.children[0].style.borderColor = "#c2c2c2";
    search.children[1].style.borderColor = "#c2c2c2";
    search.children[2].style.display = "block";
    search.children[3].style.display = "none";
});


let timer = document.getElementsByClassName("time")[0], textOne = timer.getElementsByTagName("p")[0],
    textTwo = timer.getElementsByTagName("p")[2], data = new Date(), num = null,
    textThree = textTwo.getElementsByTagName("span");
if (data.getHours() % 2) {
    num = data.getHours() + 1;
} else {
    num = data.getHours() + 2;
}
textOne.innerText = num + ":00 场";
let dingshi = setInterval(function () {
    data = new Date();
    var timeNum = new Date("3000-12-30 " + num + ":00:00") - new Date(`3000-12-30 ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`);
    textThree[0].innerHTML = Math.floor(timeNum / (1000 * 60 * 60));
    textThree[1].innerHTML = Math.floor((timeNum % (1000 * 60 * 60)) / (1000 * 60));
    textThree[2].innerHTML = Math.floor((timeNum % (1000 * 60 * 60)) % (1000 * 60) / 1000);
    if(timeNum <= 0){
        clearInterval(dingshi)
    }
}, 1000);

















