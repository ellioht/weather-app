import React from "react";
import "./weatherCard.css";
import Card from "react-bootstrap/Card";

function WeatherCard(props) {
  const image = `https://openweathermap.org/img/wn/${props.img}@2x.png`;

return (
    <Card className="weather-card">
      <Card.Body>
        <div className="cardHead">
          <div>
            <Card.Title className="day">{props.day}<br/>{props.date}<br/></Card.Title>
            <Card.Text className="temperaturemain">{props.temp}{props.unit}</Card.Text>
          </div>
          <Card.Img className="weather-image" variant="top" src={image} />
        </div>
        <Card.Text className="temperature description">{props.description}</Card.Text>
        <hr/>
        <Card.Text className="windspeed">Chance of rain: {props.rain}%</Card.Text>
        <Card.Text className="temperature"><span className="arrow arrow-up"></span>Highs: {props.max}{props.unit}</Card.Text>
        <Card.Text className="temperature"><span className="arrow arrow-down"></span>Lows: {props.min}{props.unit}</Card.Text>
        <button className="summaryBtn" onClick={props.summary}>Summary</button>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
