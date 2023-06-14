import React from "react";
import "./weatherCard.css";
import Card from "react-bootstrap/Card";

function WeatherCard(props) {
  const image = `https://openweathermap.org/img/wn/${props.img}@2x.png`;

return (
    <Card className="weather-card">
      <Card.Body>
        <div className="cardHead">
          <Card.Title className="day">{props.day}<br/>{props.date}<br/></Card.Title>
          <Card.Img className="weather-image" variant="top" src={image} />
        </div>
        <Card.Text className="temperature description">{props.description}</Card.Text>
        <Card.Text className="temperature">Temperature: {props.temp}°C</Card.Text>
        <hr/>
        <Card.Text className="temperature">Temp Min: {props.min}°C</Card.Text>
        <Card.Text className="temperature">Temp Max: {props.max}°C</Card.Text>
        <Card.Text className="windspeed">Windspeed: {props.wind}mph</Card.Text>
        <button className="summaryBtn" onClick={props.summary}>Summary</button>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
