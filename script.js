window.onload = function(){
	getWeatherByLocation(latitude,longitude);
}


async function getWeatherByLocation(latitude, longitude){

	const displayArea = document.getElementById("demo");
	let locationIcon = document.querySelector('.weather-icon');
	try {

		url = new URL ('https://api.openweathermap.org/data/2.5/weather?lat=13&lon=77.5&appid=cbaf5e1fcc408461af30f74c4f2e706d&units=metric')
		const params = url.searchParams;
		params.set('lat', latitude);
		params.set('lon', longitude);

		url.search = params.toString();
		const new_url = url.toString();

		fetch(new_url)
			.then(response => response.json())
			.then(data => {

				const temp = data.main.temp;
				const humidity = data.main.humidity;
				const wind = data.wind.speed;
				const description = data.weather[0].description;
				const {icon} = data.weather[0];



				displayArea.innerHTML = `<img src="icons/${icon}.png" style="position:fixed; top:32%; right:47%;">

				<h3 style="font-size: 30px; position: fixed; top: 53%; right: 47%;">${temp} &#x2103;</h3>


				<ul style="position:absolute; right: 38%; top: 60%;">
				<li>${description}</li>
				<li>Humidity: ${humidity}%</li>

				<li>Wind Speed: ${wind}m/s</li>
				</ul>`

			});

	}

	catch(error){
		console.error('ERROR fetching new data:',error);

	}
}


navigator.geolocation.getCurrentPosition((position) => {
	window.a = position.coords.latitude;
	window.b = position.coords.longitude;
	getWeatherByLocation(a,b);

});

async function getWeatherByCityData(city) {

	const displayArea = document.getElementById("demo");
	let locationIcon = document.querySelector('.weather-icon');
	if (city == "") {
		alert("Enter City Name")
		return;
	}

	url = new URL("https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=cbaf5e1fcc408461af30f74c4f2e706d&units=metric")
	const params = url.searchParams;
	params.set('q', city);

	url.search = params.toString();
	const new_url = url.toString();

	fetch(new_url)
		.then(response => response.json())
		.then(data => {

			const temp = data.main.temp;
			const humidity = data.main.humidity;
			const wind = data.wind.speed;
			const description = data.weather[0].description;
			const {icon} = data.weather[0];

			displayArea.innerHTML = `<img src="icons/${icon}.png" style="position:fixed; top:32%; right:47%;">

			<h3 style="font-size: 30px; position: fixed; top: 53%; right: 47%;">${temp} &#x2103;</h3>


			<ul style="position:absolute; right: 38%; top: 60%;">
			<li>${description}</li>
			<li>Humidity: ${humidity}%</li>

			<li>Wind Speed: ${wind}m/s</li>
			</ul>`

		});

}

function getWeatherByCity(){
	const inputCity = document.getElementById("input").value;
	getWeatherByCityData(inputCity);

}


