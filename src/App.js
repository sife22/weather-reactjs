import { useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [iconcode, setIconcode] = useState();
  const [weatherdata, setWeatherdata] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const srcicon = `http://openweathermap.org/img/wn/${iconcode}@2x.png`;

  const searchLocation = async (e) => {
    e.preventDefault();
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIconcode(data.weather[0].icon);
        setWeatherdata(data);
      });
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form className="search">
        <input
          type="text"
          placeholder="Enter your city ..."
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={searchLocation}>Search</button>
      </form>
      {weatherdata != null ? (
        <div className="card">
          <div className="weathercard">
            <div className="leftcard">
              <div className="temp">
                <p>{weatherdata.main.temp} °C</p>
              </div>
              <div className="location">
                <span>{weatherdata.name}</span>
              </div>
            </div>
            <div className="rightcard">
              <div className="icon">
                <img src={srcicon} alt="weather icon" />
              </div>
              <div className="details">
                <div className="wind">
                  <p>
                    Wind: <br />
                    {weatherdata.wind.speed} Km/h
                  </p>
                </div>
                <div className="humidity">
                  <p>
                    humidity: <br />
                    {weatherdata.main.humidity} %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
