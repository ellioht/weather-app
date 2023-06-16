import React from "react";
import "./summeryCard.css";
import "./weatherCard.css";
import "./currentCard.css";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";

function CurrentCard(props) {
  const image = `https://openweathermap.org/img/wn/${props.img}@2x.png`;

  return (
    <Card className="weather-card-current">
      <Card.Body>
        <Card.Title className="cardHeader">Today</Card.Title>
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
            <Card.Text className="temperaturemain">{props.temp}{props.unit}</Card.Text>
          </div>
          <Card.Img className="weather-image-current" variant="top" src={image} />
        </div>
        <hr />
        <Card.Text className="windspeed">Chance of rain: {props.rain}%</Card.Text>
        <Card.Text className="temperature">
          <span className="arrow arrow-up"></span>Highs: {props.max}{props.unit}
        </Card.Text>
        <Card.Text className="temperature">
          <span className="arrow arrow-down"></span>Lows: {props.min}{props.unit}
        </Card.Text>
        <hr />
        <div className="currentCardBottom">
          <div>
            <Card.Text className="windspeed">Windspeed: {props.wind} mph</Card.Text>
            <Card.Text className="windspeed">Sunrise: {props.sunrise}</Card.Text>
            <Card.Text className="windspeed">Sunset: {props.sunset}</Card.Text>
            <Card.Text className="windspeed">Humidity: {props.humidity}</Card.Text>
          </div>
          <div>
            <Card.Text className="windspeed">Pressure: {props.pressure}</Card.Text>
            <Card.Text className="windspeed">UVI: {props.uvi}</Card.Text>
            <Card.Text className="windspeed">Cloud coverage: {props.clouds}%</Card.Text>
            <Card.Text className="windspeed">Chance of snow: {props.snow}%</Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CurrentCard;
