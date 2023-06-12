import React from 'react';
// import "./components/weatherCard.css";
import Card from 'react-bootstrap/Card';

function WeatherCard (props) {
    const image = "https://openweathermap.org/img/wn/10d@2x.png";
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>Day {props.day}</Card.Title>
                <Card.Text>Temp {props.text}°C</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default WeatherCard;