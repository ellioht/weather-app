import React from "react";
// import "./components/weatherCard.css";
import Card from "react-bootstrap/Card";

function WeatherCard(props) {
  const image = `https://openweathermap.org/img/wn/${props.img}@2x.png`;

  const cardStyle = {
    width: "18rem",
    margin: "20px",
    boxShadow: "0 8px 8px 0 rgba(0,0,0,0.2)",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #0077ff, #0033ff, #00aaff)",
    backgroundSize: "100% 100%",  
    color: "white",  
  };

  const imgStyle = {
    marginTop: "10px",
    boxShadow: "4px 8px 8px 4px rgba(0,0,0,0.5)",
    borderRadius: "5px",
  };


  return (
    <Card style={cardStyle}>
      <Card.Img style={imgStyle} variant="top" src={image} />
      <Card.Body>
        <Card.Title>{props.day}</Card.Title>
        <Card.Text>Temp {props.text}°C</Card.Text>
        <Card.Text>Windspeed {props.text}mph</Card.Text>
  
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
