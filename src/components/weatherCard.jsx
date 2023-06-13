import React from "react";
// import "./components/weatherCard.css";
import Card from "react-bootstrap/Card";

function WeatherCard(props) {
  const image = `https://openweathermap.org/img/wn/${props.img}@2x.png`;

  const cardStyle = {
    width: "18rem",
    margin: "20px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #00aaff, #0077ff, #0033ff, #0033ff, #0077ff, #00aaff)",
    backgroundSize: "100% 100%",    
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  return (
    <Card className="waveAnimation" style={cardStyle}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{props.day}</Card.Title>
        <Card.Text>Temp {props.text}°C</Card.Text>
        <Card.Text>Windspeed {props.text}mph</Card.Text>
  
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
