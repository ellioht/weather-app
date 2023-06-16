import React from "react";
import "./summeryCard.css";
import "./weatherCard.css";
import Card from "react-bootstrap/Card";

function SummeryCard(props) {
  
return (
    <Card className="summery-card">
      <Card.Body>
        <Card.Text className="windspeed">Windspeed: {props.wind} mph</Card.Text>
        <Card.Text className="temperature">Sunrise: {props.sunrise}</Card.Text>
        <Card.Text className="temperature">Sunset: {props.sunset}</Card.Text>
        <Card.Text className="windspeed">Humidity: {props.humidity}</Card.Text>
        <Card.Text className="windspeed">Pressure: {props.pressure}</Card.Text>
        <Card.Text className="windspeed">UVI: {props.uvi}</Card.Text>
        <Card.Text className="windspeed">Cloud coverage: {props.clouds}%</Card.Text>
        <Card.Text className="windspeed">Chance of snow: {props.snow}%</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SummeryCard;