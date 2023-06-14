import React, { useState } from "react";

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
    <div className="search-bar">
      <input className="inpt" type="text" placeholder="Enter city name..." value={city} onChange={handleCityChange} onKeyPress={handleKeyPress} />
      <button className="searchBtn" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
