// Project collaborators: Elliot Hallam, Venotha Delan, Louis Sorensen, John Ratcliffe

import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/searchBar.css";
import { ApiClient } from "./ApiClient";
import WeatherCard from "./components/weatherCard";
import CurrentCard from "./components/currentCard";
import SummeryCard from "./components/summeryCard";
import SearchBar from "./components/searchBar";

function App() {
  const apiClient = new ApiClient();

  // Weather state
  const [weather, setWeather] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  // Summary for card index state
  const [cardIndex, setCardIndex] = useState(null);

  // Location state
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [capitalisedCity, setCapitalisedCity] = useState("");

  const handleSearch = (query) => {
    const upperCaseCity = query.toUpperCase();
    // setCapitalisedCity(upperCaseCity);
    setLocation(upperCaseCity);
  };

  // useEffect for weather
  useEffect(() => {
    const fetchData = async () => {
      try {
        const geoResponse = await apiClient.getCoordinates(location);
        setCapitalisedCity(`${geoResponse.data[0].name}, ${geoResponse.data[0].country}`);
        const lat = geoResponse.data[0].lat;
        const lon = geoResponse.data[0].lon;

        const response = await apiClient.getWeather(lat, lon);
        setWeather(response.data);
        setCity(location);
        setWeatherData(response.data.daily.slice(1, 5));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  // Sunrise / Sunset 24hr time
  const getTimeString = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Day / Date Name
  const getDayName = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date(date * 1000);

    const day = days[currentDate.getDay()];

    return `${day}, `;
  };
  const getDateName = (date) => {
    const months = [
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
    setCapitalisedCity("");
  }

  // Component rendering
  return (
    <div className={`App ${location !== "" ? 'flex-start' : ''}`}>
      <div className="title-head">
        <h1>Sky Savvy Weather <span className="copyright">©</span></h1>
      </div>

      <div className="search-container d-flex justify-content-center align-items-center">
        <SearchBar onSearch={(city) => handleSearch(city)} />
      </div>

      <div className="location">
        <h2>
          {capitalisedCity}
        </h2>
        {location !== "" &&
        <button onClick={resetSearch} className="gobackbtn">
          <div className="goback"></div>
        </button>
        } 
      </div>

      {location !== "" && weather !== null &&
      <div className="cards-container">
        <div style={{ width: "26rem" }}>
        <CurrentCard 
          temp={Math.round(weather.current.temp)}
          min={weather.daily[0].temp.min}
          max={weather.daily[0].temp.max}
          img={weather.current.weather[0].icon}
          description={weather.current.weather[0].description}
          sunrise={getTimeString(weather.current.sunrise)}
          sunset={getTimeString(weather.current.sunset)}
          day={getDayName(weather.current.dt)}
          date={getDateName(weather.current.dt)}
        />
        </div>
        {weatherData.map((data, index) => {
          return (
            <div style={{ width: "21rem" }} key={index}>
              <WeatherCard
                day={getDayName(data.dt)}
                date={getDateName(data.dt)}
                temp={Math.round(data.temp.day)}
                min={data.temp.min}
                max={data.temp.max}
                img={data.weather[0].icon}
                description={data.weather[0].description}
                summary={() => toggleSummary(index)}
                wind={data.wind_speed}
                rain={data.rain}
              />
              {cardIndex === index && (
                <div className="summary-card-container">
                  <SummeryCard
                    className="summary-card"
                    sunrise={getTimeString(data.sunrise)}
                    sunset={getTimeString(data.sunset)}
                    humidity={data.humidity}
                    pressure={data.pressure}
                    uvi={data.uvi}
                    clouds={data.clouds}
                    rain={data.rain}
                    snow={data.snow}
                    wind={data.wind_speed}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      }
    </div>
  );
}

export default App;
