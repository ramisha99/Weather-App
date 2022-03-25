import React, { useState } from "react";
const api = {
	key: "a69f400ee97a71518d91fe1fa4469df1",
	base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});

	const search = (evt) => {
		if (evt.key === "Enter") {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery("");
					console.log(result);
				});
		}
	};
	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();
	};

	return (
		<div
			className={
				typeof weather.main != "undefined"
					? weather.weather[0].main == "Rain"
						? "app rain"
						: weather.main.temp > 14
						? "app warm"
						: "app "
					: "app"
			}
		>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != "undefined" ? (
					<div>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">{weather.main.temp.toFixed()}°C</div>
							<div className="weather">{weather.weather[0].main}</div>
						</div>
					</div>
				) : (
					""
				)}
				{typeof weather.main != "undefined" ? (
					<div className="bottom">
						<div className="feels">
							{weather.main ? (
								<p className="bold">{weather.main.feels_like.toFixed()}°C</p>
							) : null}
							<p>Feels Like</p>
						</div>
						<div className="humidity">
							{weather.main ? (
								<p className="bold">{weather.main.humidity}%</p>
							) : null}
							<p>Humidity</p>
						</div>
						<div className="wind">
							{weather.wind ? (
								<p className="bold">{weather.wind.speed.toFixed()} MPH</p>
							) : null}
							<p>Wind Speed</p>
						</div>
					</div>
				) : (
					""
				)}
			</main>
		</div>
	);
}

export default App;
