const displayDateElem = document.getElementById('displayDate');
const displayClockElem = document.getElementById('displayClock');

function showTime() {
    const date = generateDate();
    displayTime(date);
}

function generateDate() {
    const date = new Date();
    const currDate = {
        year: date.getFullYear(),
        month: date.getMonth(),
        monthDate: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };
    
    for(let property in currDate) {
        currDate[property] = formatWithZero(currDate[property]);
    }
    
    currDate.session = 'AM';
    if(currDate.hours > 12) {
        currDate.hours -= 12;
        currDate.session = 'PM';
    } else if(currDate.hours == 0) {
        currDate.hours = 12;
    } else if(currDate.hours == 12) {
        currDate.session = 'PM';
    }

    currDate.weekDay = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();

    return currDate;
}


function formatWithZero(value) {
    return value < 10 ? `0${value}` : value;
}

function displayTime(date) {
    displayDateElem.textContent = `${date.year} - ${date.month} - ${date.monthDate} ${date.weekDay}`;
    displayClockElem.textContent = `${date.hours}:${date.minutes}:${date.seconds} ${date.session}`;
}

showTime();

setInterval(showTime, 1000);