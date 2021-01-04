const windSpeed = document.querySelector('.js-windSpeed');
const windOrientation = document.querySelector('.js-windOrientation');
const temperature = document.querySelector('.js-teperature');
const time = document.querySelector('.js-time');
const city = document.querySelector('.js-city');

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

const WeatherAndIP = () => {
	const fetchIP = fetch('https://ipapi.co/json/').then(response => response.json());//Получаем данные об IP в JSON

	fetchIP.then(jsonIP => {
		const lat = jsonIP.latitude;//Широта
		const lon = jsonIP.longitude;//Долгота
		const keyAPI = '1a30a7f5e74893c084ade287b64f785a';//Ключ
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}`;
		const fetchWeather = fetch(url).then(response => response.json());//Получаем данные о погоде в JSON

		city.textContent = `${jsonIP.city}`;

		fetchWeather.then(jsonWeather => {
			const windDeg = orientationWind(jsonWeather.wind.deg);
			const weatherTemperature = kelvinToCelsius(jsonWeather.main.temp);

			windSpeed.textContent = `Скорость ветра: ${jsonWeather.wind.speed} м/с`;
			windOrientation.textContent = `Направлнеие ветра: ${windDeg}`;
			temperature.textContent = weatherTemperature + String.fromCharCode(176) + 'C';
		});
	});
};

WeatherAndIP();

const kelvinToCelsius = (temp) => {
	console.log(temp);
	const absoluteZero = 273.15;
	temp = Math.round(temp - absoluteZero);
	if (temp == 0) {
		temp = Math.abs(temp);
	};
	return temp;
};

const timeNow = () => {
	const date = new Date;
	let hours = date.getHours();
	let minutes = date.getMinutes();
	time.textContent = `${hours}:${minutes}`;
};

setInterval(() => {
	timeNow();
}, 1000);

setInterval(() => {
	WeatherAndIP();
}, 1800000);


