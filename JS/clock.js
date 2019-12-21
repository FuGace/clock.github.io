let clock = document.getElementById("clock");
let color = document.getElementById("color");

function changeTime (element) {

    let time = new Date();
    let h = time.getHours().toString();
    let m = time.getMinutes().toString();
    let s = time.getSeconds().toString();

    let clockString = h + ":" + m + ":" + s;
    let colorString = "#" + h  + m  + s;

    clock.textContent = clockString;
    color.textContent = colorString;

    document.body.style.backgroundColor = colorString;
}

changeTime();