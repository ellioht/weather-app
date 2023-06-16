// Project collaborators: Elliot Hallam, Venotha Delan, Louis Sorensen, John Ratcliffe

import React, { useState, useEffect } from "react";
import "./App.css";
import { ApiClient } from "./ApiClient";
import WeatherCard from "./components/weatherCard";
import CurrentCard from "./components/currentCard";
import SummeryCard from "./components/summeryCard";
import SearchBar from "./components/searchBar";
import ToggleUnit from "./components/toggleUnits";


function App() {
  const apiClient = new ApiClient();

  // Weather state
  const [weather, setWeather] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  // Summary for card index state
  const [cardIndex, setCardIndex] = useState(null);

  // Location / city state
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [CityString, setCityString] = useState("");

  const [unit, setUnit] = useState("metric");
  const [unitSymbol, setUnitSymbol] = useState("°C");

  // const [timezone, setTimezone] = useState("Europe/London");

  // useEffect for weather
  useEffect(() => {
    const fetchData = async () => {
      try {
        const geoResponse = location && await apiClient.getCoordinates(location);
        
        setCityString(`${geoResponse.data[0].name}, ${geoResponse.data[0].country}`);
        const lat = geoResponse.data[0].lat;
        const lon = geoResponse.data[0].lon;

        const units = unit;

        // const newTimezone = moment.tz.zoneNameAt(lat, lon);
        // console.log(lat, lon, newTimezone);
        // setTimezone(newTimezone);

        const response = await apiClient.getWeather(lat, lon, units);
        setWeather(response.data);
        setCity(location);
        setWeatherData(response.data.daily.slice(1, 5));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location, unit]);

  // Handle search
  const handleSearch = (query) => {
    setLocation(query);
  };

  // Sunrise / Sunset 24hr time
  const getTimeString = (timeStamp, timeZone) => {
    const date = new Date(timeStamp * 1000);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timeZone
    };
    return date.toLocaleTimeString([], options);
  };

  // Day Name
  const getDayName = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date(date * 1000);
    const day = days[currentDate.getDay()];

    return `${day}`;
  };
  // Date Name
  const getDateName = (date) => {
    // prettier-ignore
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date(date * 1000);
    const month = months[currentDate.getMonth()];
    const dayNumber = currentDate.getDate();

    return `${month} ${dayNumber}`;
  };

  // Toggle summary card for individual weather card
  const toggleSummary = (index) => {
    if (cardIndex === index) {
      setCardIndex(null);
    } else {
      setCardIndex(index);
    }
  };

  // reset search when button pressed
  const resetSearch = () => {
    setLocation("");
    setCityString("");
  };

  // Unit symbol change
  const handleUnitChange = unit === "metric" ? "°C" : "°F";

  // Component rendering
  return (
    <div className={`App ${location !== "" ? "flex-start" : ""}`}>
      <div className="title-head">
        <h1>
          Sky Savvy Weather <span className="copyright">©</span>
        </h1>
      </div>

      <div className="search-container d-flex justify-content-center align-items-center">
      {location !== "" && weather !== null &&
        <ToggleUnit 
          unitc={() => setUnit("metric")}
          unitf={() => setUnit("imperial")}
        />
      }
        <SearchBar onSearch={(city) => handleSearch(city)} />
      </div>

      {location !== "" && weather !== null && (
        <div className="location">
          <h2>
            Today in <span style={{ fontWeight: "bold" }}>{CityString}</span>
            <br />
            {weather.current.weather[0].description} with a temperature of{" "}
            {Math.round(weather.current.temp)}{handleUnitChange}.
          </h2>
          <button onClick={resetSearch} className="gobackbtn">
            <div className="goback"></div>
          </button>
        </div>
      )}
      {location !== "" && weather !== null && (
        <div className="cards-container">
          <div style={{ width: "26rem" }}>
            <CurrentCard
              temp={Math.round(weather.current.temp)}
              min={weather.daily[0].temp.min.toFixed(1)}
              max={weather.daily[0].temp.max.toFixed(1)}
              img={weather.current.weather[0].icon}
              description={weather.current.weather[0].description}
              sunrise={getTimeString(weather.current.sunrise, "Europe/London")}
              sunset={getTimeString(weather.current.sunset, "Europe/London")}
              day={getDayName(weather.current.dt)}
              date={getDateName(weather.current.dt)}
              rain={weather.daily[0].rain ? Math.round(weather.daily[0].rain) : 0}
              wind={Math.round(weather.current.wind_speed)}
              snow={weather.daily[0].snow ? weather.daily[0].snow : 0}
              clouds={weather.daily[0].clouds}
              humidity={weather.daily[0].humidity}
              pressure={weather.daily[0].pressure}
              uvi={weather.daily[0].uvi}
              unit={handleUnitChange}
            />
          </div>
          {weatherData.map((data, index) => {
            return (
              <div style={{ width: "21rem" }} key={index}>
                <WeatherCard
                  day={getDayName(data.dt)}
                  date={getDateName(data.dt)}
                  temp={Math.round(data.temp.day)}
                  min={data.temp.min.toFixed(1)}
                  max={data.temp.max.toFixed(1)}
                  img={data.weather[0].icon}
                  description={data.weather[0].description}
                  summary={() => toggleSummary(index)}
                  rain={data.rain ? Math.round(data.rain) : 0}
                  unit={handleUnitChange}
                />
                {cardIndex === index && (
                  <div className="summary-card-container">
                    <SummeryCard
                      className="summary-card"
                      sunrise={getTimeString(weather.current.sunrise, "Europe/London")}
                      sunset={getTimeString(weather.current.sunset, "Europe/London")}
                      humidity={data.humidity}
                      pressure={data.pressure}
                      uvi={data.uvi}
                      clouds={data.clouds}
                      rain={data.rain}
                      snow={data.snow ? data.snow : 0}
                      wind={Math.round(data.wind_speed)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
