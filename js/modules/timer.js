function timer() {
    
    const deadline = '2023-11-30';

    function getTimeRemaining(endtime) {
        //создаем переменную в которой вычисляем разницу между 
        //назаченной датой и нынешней(в миллисекундах)
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        //если достигли нужного времени, подставляем нули
        if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        } else {
        days = Math.floor(t/(1000 * 60 * 60 * 24));
        hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((t / 1000 / 60) % 60);
        seconds = Math.floor((t / 1000) % 60);
        }
            
        return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
        };

    }

    //добавляем ноль перед цифрой в таймере
    function getZero(num) {
        if (num >=0 && num < 10) {
        return `0${num}`;
        } else {
        return num;
        }
    }

    function setclock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            minutes = timer.querySelector('#minutes'),
            hours = timer.querySelector('#hours'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);// запуска функции через каждую секунду 
            //и обновления таймера

            //вызываем апдейт чтоб избавиться от бага с показом времени из верстки
            //вызванной задрежкой в setInterval
        updateClock(); 

        function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);


        if (t.total <= 0) {
            clearInterval(timeInterval);//стопим запуск функции по достижению заданного времени
        }
        }

        }

    setclock('.timer', deadline);

}

export default timer;
