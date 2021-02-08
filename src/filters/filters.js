import Vue from "vue";

Vue.filter("age", value => {
    if (value) {
        let ageDif = Date.now() - new Date(value);
        let ageDate = new Date(ageDif);
        return ageDate.getFullYear() - 1970;
    } else {
        return '--'
    }
});

// to set :title attribut propperly on playersElement.vue
Vue.filter("ageText", value => {
    return value + ' anys'
});

Vue.filter("dateFormatted", value => {
    let date = new Date(value);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + '/' + month + '/' + year;
});

Vue.filter("weekDay", value => {
    let date = new Date(value);
    let weekDays = ['dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte', 'diumenge'];
    let weekDay = weekDays[date.getDate()];
    return weekDay;
});

Vue.filter("clock", time => {
    if (time) {
        let value = time / 1000;
        let minutes = Math.floor(value / 60);
        let seconds = Math.round(value % 60);
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        const mm = minutes < 10 ? `0${minutes}` : minutes;
        const ss = seconds < 10 ? `0${seconds}` : seconds;
        return `${mm}:${ss}`;
    } else {
        return "00:00";
    }
});

Vue.filter("score", value => {
    const score = value < 10 ? `0${value}` : value;
    return score;
});