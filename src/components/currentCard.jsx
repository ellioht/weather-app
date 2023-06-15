import React from "react";
import "./summeryCard.css";
import "./weatherCard.css";
import "./currentCard.css";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";

function CurrentCard(props) {

  const image = `https://openweathermap.org/img/wn/${props.img}@2x.png`;

  return (
    <Card className="weather-card">
      <Card.Body>
        <Card.Title className="cardHeader">Today's Weather</Card.Title>
        <hr />
        <div className="cardHead">
          <div>
            <Card.Title className="day">
              {props.day}
              <br />
              {props.date}
              <br />
            </Card.Title>
            <Card.Text className="temperature description">{props.description}</Card.Text>
            <Card.Text className="temperaturemain">{props.temp}°C</Card.Text>
          </div>
          <Card.Img className="weather-image-current" variant="top" src={image} />
        </div>
        <hr />
        <Card.Text className="temperature">Temp Max: {props.max}°C</Card.Text>
        <Card.Text className="temperature">Temp Min: {props.min}°C</Card.Text>
        <Card.Text className="windspeed">Windspeed: {props.wind}mph</Card.Text>
        <hr />
        <Card.Text className="windspeed">Sunrise: {props.sunrise}</Card.Text>
        <Card.Text className="windspeed">Sunset: {props.sunset}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CurrentCard;
