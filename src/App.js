import { useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [iconcode, setIconcode] = useState();
  const [weatherdata, setWeatherdata] = useState(null);
  const [error, setError] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  const searchLocation = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      setError('')
      setWeatherdata(data);

    } catch (error) {
      if (error.message.includes('404')) {
        setWeatherdata(null);
        setError('Maybe city not found')
      } else {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Weather App<span>.</span></h1>
        <div className="search__container">
          <input type="text"
            placeholder="Enter your city"
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit"  onClick={searchLocation}>Search</button>
        </div>
        {error && (<div className="results__container">
          <div className="city__temp__error">
          <h2 className="error">{error}</h2>
          </div>
        </div>)}
        {weatherdata ? (
        <div className="results__container">
          <div className="city__temp">
            <h2 className="city">{weatherdata.name}</h2>
            <h2 className="temp">{weatherdata.main.temp} °C</h2>
          </div>
          <div className="line"></div>
          <p>Wind : {weatherdata.wind.speed} Km/h</p>
          <p>Humidity : {weatherdata.main.humidity}</p>
        </div>
        ) : ""}
      </div>
    </div>
  );
}

export default App;
