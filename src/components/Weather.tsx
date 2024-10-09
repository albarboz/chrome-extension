import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './css/Weather.css'

type WeatherData = {
    weather: Array<{ icon: string }>,
    main: { temp: number },
    name: string,
}

export default function Weather() {
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const apiKey = '441d7aa10d24e837ebc6104f170a90f1';
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
    
            // Check if data is in local storage
            const cachedData = localStorage.getItem(`weatherData-${latitude}-${longitude}`);
            if (cachedData) {
                // If cached data exists, use it
                setCurrentWeather(JSON.parse(cachedData));
            } else {
                // If no cached data, fetch from API
                fetch(
                    `https://api.openweathermap.org/data/3.0/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setCurrentWeather(data);
                        // Save data in local storage for future use
                        localStorage.setItem(`weatherData-${latitude}-${longitude}`, JSON.stringify(data));
                    });
            }
        });
    }, []);
    

    // Generate the weather icon URL
    const weatherIconUrl =
        currentWeather && currentWeather.weather
            ? `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`
            : '';

    return (
        <Draggable>
            <div className="weather-container">
                {currentWeather && currentWeather.weather && (
                    <>
                        <div className="temperature">
                            <img src={weatherIconUrl} alt="Weather Icon" />
                            <p>{Math.round(currentWeather.main.temp)}º</p>
                        </div>
                        <h1>{currentWeather.name}</h1>
                    </>
                )}
            </div>
        </Draggable>
    )
}