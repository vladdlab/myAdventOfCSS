import ForecastSection from "./forecastSection.mjs";

const daysOfWeekMap = {
    0: 'SUN',
    1: 'MON',
    2: 'TUES',
    3: 'WED',
    4: 'THUR',
    5: 'FRI',
    6: 'SAT'
}

const iconNameToSizeMap = {
    cloudy: { width: 264, height: 166},
    sunny: { width: 208, height: 213},
    stormy: { width: 246, height: 187},
    snowy: { width: 230, height: 196},
    'partly-cloudy': {width: 230, height:209},
    rainy: { width: 160, height: 222},
}

const URL = 'https://api.weatherapi.com/v1/forecast.json?key=1a6074add5904844bb480057221712&q=auto:ip&days=7&aqi=no&alerts=no';
