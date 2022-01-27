import React, { useState, useEffect } from "react";
import classes from './Weather.module.css';
import axios from "axios";
const WeatherComponent = (props) => {
  const [weatherInfo, setweatherInfo] = useState({});
  const apiKey = "77af052038c15c2ca530a33e81901ee6";
  const lat = "24.855090";
  const lon = "67.024556";
  

//   "pro.openweathermap.org/data/2.5/forecast/hourly?lat=24.8607&lon=67.0011&appid=77af052038c15c2ca530a33e81901ee6"

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}&units=metric`
      )
      .then((responce) => {
          console.log(responce);
        setweatherInfo({
            timezone:responce.data.timezone,
            temp: Number(responce.data.current.temp),
            weather:responce.data.current.weather[0].main,
            feel:responce.data.current.feels_like,
            clouds:responce.data.current.clouds,
            
            
        })
      })
      .catch((error) => {
        setweatherInfo({
            timezone:"Karachi",
            temp: 0,
            weather:"None",
            feel:NaN,
            clouds:"all",
            
            
        })
        console.log("Error: ", error);
      });
  }, []);

  
  return (
    <section>
      <div className={classes.weatherInfoContainer}>
        <h1>Weather Information </h1>
        <p>Hourly and Daily basis Information</p>
        <div className={classes.infoBox}>
            {!weatherInfo.feel?<p>Loading...</p>:""}
            <p> <b>Timezone:</b> {weatherInfo.timezone} </p>
            <hr />
            <p> <b>Temperature:</b> {weatherInfo.temp} °C </p>
            <hr />
            <p> <b>Clouds:</b> {weatherInfo.clouds} %</p>
            <hr />
            <p> <b>Weather:</b> {weatherInfo.weather} </p>
            <hr />
            <p> <b>Feels Like:</b> {weatherInfo.feel} °C</p>
        </div>
      </div>
    </section>
  );
};

export default WeatherComponent;
