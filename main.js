const pageLoad = document.querySelector('.js-onload');
const windSpeed = document.querySelector('.js-windSpeed');
const windOrientation = document.querySelector('.js-windOrientation');
const temperature = document.querySelector('.js-teperature');
const time = document.querySelector('.js-time');
const city = document.querySelector('.js-city');
console.log(pageLoad);

window.onload = () => {
	setTimeout(() => {
		pageLoad.classList.add('hide');
	}, 500);
};

//Определяем направление ветра
const orientationWind = (windDeg) => {
	switch (true) {
		case windDeg >= 22 && windDeg <= 67:
			return 'NW';
		case windDeg >= 67 && windDeg <= 112:
			return 'W';
		case windDeg >= 112 && windDeg <= 157:
			return 'SW';
		case windDeg >= 157 && windDeg <= 202:
			return 'S';
		case windDeg >= 202 && windDeg <= 247:
			return 'SE';
		case windDeg >= 247 && windDeg <= 292:
			return 'E';
		case windDeg >= 292 && windDeg <= 337:
			return 'NE';

		default: return 'N';
	}
};

const kelvinToCelsius = (temp) => {
	const absoluteZero = 273.15;
	temp = Math.round(temp - absoluteZero);
	return temp = temp == 0 ? Math.abs(temp) : temp;
};

const timeNow = () => {
	const localTime = new Date().toLocaleTimeString().slice(0, -3);
	time.textContent = localTime;
};

timeNow();

async function WeatherAndIP() {
	try {
		const urlIP = 'https://ipapi.co/json/';

		const responseIP = await fetch(urlIP);
		const dataIP = await responseIP.json();

		city.textContent = dataIP.city;

		const lat = dataIP.latitude;//Широта
		const lon = dataIP.longitude;//Долгота
		const keyAPI = '1a30a7f5e74893c084ade287b64f785a';//Ключ

		const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}`;

		const responseWeather = await fetch(urlWeather);
		const dataWeather = await responseWeather.json();
		console.log(dataWeather);
		const windDeg = orientationWind(dataWeather.wind.deg);
		const weatherTemperature = kelvinToCelsius(dataWeather.main.temp);

		windSpeed.textContent = `Скорость ветра: ${dataWeather.wind.speed} м/с`;
		windOrientation.textContent = `Направлнеие ветра: ${windDeg}`;
		temperature.textContent = weatherTemperature + String.fromCharCode(176) + 'C';
	} catch (err) {
		console.log(err);
	}
};

WeatherAndIP();

setInterval(() => {
	timeNow();
}, 1000);


