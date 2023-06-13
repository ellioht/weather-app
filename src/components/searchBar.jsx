import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
    setCity("");
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Enter city name..." value={city} onChange={handleCityChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
