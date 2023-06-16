import React, { useState } from "react";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(city);
    setCity("");
  };

  return (
    <div>
      <div className="search-bar">
        <button className="search-icon">
        </button>
        <input
          className="inpt"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={handleCityChange}
        />
        <button className="searchBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
