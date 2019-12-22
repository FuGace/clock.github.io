let clock = document.getElementById('clock'),
    color = document.getElementById('color'),
    dateDay = document.getElementById('day'),
    colorString;

function changeTime (element) {

    let timeDate = new Date(),
    h = timeDate.getHours(),
    min = timeDate.getMinutes(),
    s = timeDate.getSeconds(),
    mon = timeDate.getMonth(),
    day = timeDate.getDate(),
    year = timeDate.getFullYear();

    if (h <= 9) h = '0' + h;
    if (min <= 9) min = '0' + min;  
    if (s <= 9) s = '0' + s;
    if (day <= 9) day = '0' + day;

    month = new Array ("января", "февраля", "марта", "апреля", "мая", "июня",
                    "июля", "августа", "сентября", "октября", "ноября", "декабря");
    days = new Array ("Воскресенье", "Понедельник", "Вторник", "Среда",
                    "Четверг", "Пятница", "Суббота");

    clockString = h + ':' + min + ':' + s;
    date_date = day + " " + month[mon] + " " + year + " г. (" + days[timeDate.getDay()] + ")";
    colorString = '#' + h  + min  + s;
    
    clock.textContent = clockString;
    color.textContent = colorString;
    dateDay.textContent = date_date;    
    
    document.body.style.backgroundColor = colorString;

    displayCanvas();
}

changeTime();
setInterval(changeTime, 1000);

function displayCanvas(){
    let canvasHTML = document.getElementById('myCanvas');
    let contextHTML = canvasHTML.getContext('2d');   
	
    //Расчет координат центра и радиуса часов
    let radiusClock = canvasHTML.width/2;
    let xCenterClock = canvasHTML.width/2;
    let yCenterClock = canvasHTML.height/2;
	
    //Очистка экрана. 
    contextHTML.fillStyle = colorString;
    contextHTML.fillRect(0,0,canvasHTML.width,canvasHTML.height);
	
    //Рисуем контур часов
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 2;
    contextHTML.beginPath();
    contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.stroke();
    contextHTML.closePath();
	
    //Рисуем рисочки часов
    let radiusNum = radiusClock - 10; //Радиус расположения рисочек	
    let radiusPoint;
    for(let tm = 0; tm < 60; tm++){
	  contextHTML.beginPath();
	  if(tm % 5 == 0){radiusPoint = 5;}else{radiusPoint = 2;} //для выделения часовых рисочек
	  let xPointM = xCenterClock + radiusNum * Math.cos(-6*tm*(Math.PI/180) + Math.PI/2);
	  let yPointM = yCenterClock - radiusNum * Math.sin(-6*tm*(Math.PI/180) + Math.PI/2);
	  contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
	  contextHTML.stroke();
	  contextHTML.closePath();
    } 
	
    //Оцифровка циферблата часов
    for(let th = 1; th <= 12; th++){
	contextHTML.beginPath();
	contextHTML.font = 'bold 25px sans-serif';
	let xText = xCenterClock + (radiusNum - 30) * Math.cos(-30*th*(Math.PI/180) + Math.PI/2);
	let yText = yCenterClock - (radiusNum - 30) * Math.sin(-30*th*(Math.PI/180) + Math.PI/2);
	if(th <= 9){
		contextHTML.strokeText(th, xText - 5 , yText + 10);
	}else{
		contextHTML.strokeText(th, xText - 15 , yText + 10);
	}
     	contextHTML.stroke();
	contextHTML.closePath();	
    }

	
    //Рисуем стрелки
    let lengthSeconds = radiusNum - 10;
    let lengthMinutes = radiusNum - 15;
    let lengthHour = lengthMinutes / 1.5;
    let d = new Date();                //Получаем экземпляр даты
    let t_sec = 6*d.getSeconds();                           //Определяем угол для секунд
    let t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds()); //Определяем угол для минут
    let t_hour = 30*(d.getHours() + (1/60)*d.getMinutes()); //Определяем угол для часов
	
    //Рисуем секунды
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#FF0000";
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthSeconds*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
				yCenterClock - lengthSeconds*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем минуты
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 3;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthMinutes*Math.cos(Math.PI/2 - t_min*(Math.PI/180)),
				 yCenterClock - lengthMinutes*Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем часы
    contextHTML.beginPath();
    contextHTML.lineWidth = 5;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthHour*Math.cos(Math.PI/2 - t_hour*(Math.PI/180)),
				 yCenterClock - lengthHour*Math.sin(Math.PI/2 - t_hour*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();	
	
    //Рисуем центр часов
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.fillStyle = colorString;
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();
	  
    return;
}