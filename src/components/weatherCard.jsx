import React from "react";
import "./weatherCard.css";
import Card from "react-bootstrap/Card";

function WeatherCard(props) {
  const image = `https://openweathermap.org/img/wn/${props.img}@2x.png`;

return (
    <Card className="weather-card">
      <Card.Img className="weather-image" variant="top" src={image} />
      <Card.Body>
        <Card.Title className="day">{props.day}</Card.Title>
        <Card.Text className="temperature">Temp {props.text}°C</Card.Text>
        <Card.Text className="windspeed">Windspeed {props.wind}mph</Card.Text>
  
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
