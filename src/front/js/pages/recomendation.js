import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import destinationWeights from '../data/destinations.json';
import "./recomendation.css";

export const Recomendation = () => {
  const { store, actions } = useContext(Context);
  const [recommendedDestination, setRecommendedDestination] = useState(null);
  const [recommendedDescription, setRecommendedDescription] = useState(null);
  const [recommendedApiID, setRecommendedApiID] = useState(null);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [tempMain, setTempMain] = useState(null);
  const [weatherIconId, setWeatherIconId] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);

  const navigate = useNavigate();

  const calculateRecommendation = () => {
    let maxScore = 0;
    let recommendedDestination = null;
    let recommendedDescription = null;
    let recommendedApiID = null;

    for (const i in destinationWeights) {
      const destinationWeight = destinationWeights[i];
      const { destination, description, weights, apiID } = destinationWeight;
      let score = 0;

      for (const category in store.userSelections) {
        score += store.userSelections[category] * weights[category];
      }

      console.log(`Destination: ${destination}, Score: ${score}`); // Print destination and score in the console

      if (score > maxScore) {
        maxScore = score;
        recommendedDestination = destination;
        recommendedDescription = description;
        recommendedApiID = apiID;
      }
    }
    setRecommendedDestination(recommendedDestination);
    setRecommendedDescription(recommendedDescription);
    setRecommendedApiID(recommendedApiID);
    console.log("Recommended Destination:", recommendedDestination); // Print recommended destination in the console
  };

  useEffect(() => {
    calculateRecommendation();
  }, []);

  useEffect(() => {
    if (recommendedApiID) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?id=${recommendedApiID}&appid=0dc5a4cf75951d34619605b76e3b6f73`)
        .then((res) => res.json())
        .then((result) => {
          const { main, weather } = result;
          const minTemperature = main.temp_min;
          const maxTemperature = main.temp_max;
          const weatherDescription = weather[0].main;
          console.log("Minimum Temperature:", minTemperature);
          console.log("Maximum Temperature:", maxTemperature);
          console.log("Weather Description:", weatherDescription);
          setTempMain(main);
          setWeatherIconId(weather[0].icon);
          setWeatherDescription(weatherDescription);
        });
    }
  }, [recommendedApiID]);

  const handleAddFav = async () => {
    const token = localStorage.getItem("miTokenJWT");

    if (!token) {
     
      navigate('/login');
    }

    const response = await fetch(process.env.BACKEND_URL + "/api/favs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recommendedDestination }),
    });

    const data = await response.json();

    if (response.ok) {
      setAlertVariant("success");
      setAlertMessage(data.msg);
    } else {
      setAlertVariant("danger");
      setAlertMessage(data.msg);
    }

    setButtonClicked(true);
  };

  return (

    <div>
    <div className="container py-4">
      <div className="p-5 mb-4 bg-light rounded-3 jumbotron">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-dark jumbotron-destination">{recommendedDestination}</h1>
          <p className="col-md-8 fs-4 text-dark jumbotron-description">
            {recommendedDescription}
          </p>
          {/*  <p className="jumbotron-description">{recommendedApiID}</p> */}
          <div className="temperature-info">
            {weatherIconId && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherIconId}.png`}
                alt="icon"
              />
            )}
            {tempMain && (
              <>
                <p className="temperature-text">Min: {tempMain.temp_min}ºC</p>
                <p className="temperature-text">Max: {tempMain.temp_max}ºC</p>
                <p className="temperature-text">Humidity: {tempMain.humidity}%</p>
              </>
            )}
          </div>

          <div className="temperature-info mt-4">
            <p className="display-6 fw-bold text-dark">{weatherDescription}</p>
            {tempMain && (
              <>
                <p className="temperature-text">Temp: {tempMain.temp}ºC</p>
                <p className="temperature-text">Feels like: {tempMain.feels_like}ºC</p>
              </>
            )}
          </div>

          <button className="btn btn-primary btn-lg add-fav-button" type="button" onClick={handleAddFav}>
            Me gusta
          </button>
          {alertMessage && (
            <div className={`alert jumbotron-alert alert-${alertVariant}`} role="alert">
              {alertMessage}
            </div>
          )}
        </div>
      </div>
      <footer className="pt-3 mt-4 text-muted border-top">© 2023</footer>
    </div>
  </div>
);

       }  
