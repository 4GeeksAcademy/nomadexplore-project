import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import destinationWeights from '../data/destinations.json';
import { DestinationCard } from "./destinationCard";
import "./recomendation.css"

export const Recomendation = () => {
  const { store, actions } = useContext(Context);
  const [recommendedDestination, setRecommendedDestination] = useState(null);
  const [recommendedDescription, setRecommendedDescription] = useState(null);
  const [recommendedApiId, setRecommendedApiId] = useState(null);
  const [recommendedImage, setRecommendedImage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonText, setButtonText] = useState("Click here and save");
  const [weatherIconId, setWeatherIconId] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [tempMain, setTempMain] = useState({ temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, humidity: 0 });

  const navigate = useNavigate();

  const calculateRecommendation = () => {
    let maxScore = 0;
    let recommendedDestination = null;
    let recommendedDescription = null;
    let recommendedApiId = null;
    let recommendedImage = null;

    for (const i in destinationWeights) {
      const destinationWeight = destinationWeights[i];
      const { destination, description, weights, apiId, imageUrl } = destinationWeight;
      let score = 0;

      for (const category in store.userSelections) {
        score += store.userSelections[category] * weights[category];
      }
      console.log(destination + ":" + score);

      if (score > maxScore) {
        maxScore = score;
        recommendedDestination = destination;
        recommendedDescription = description;
        recommendedApiId = apiId;
        recommendedImage = imageUrl;
      }
    }
    
    setRecommendedDestination(recommendedDestination);
    setRecommendedDescription(recommendedDescription);
    setRecommendedApiId(recommendedApiId);
    setRecommendedImage(recommendedImage);
  };

  useEffect(() => {
    calculateRecommendation();
  }, []);

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
      body: JSON.stringify({ recommendedDestination, recommendedApiId }),
    });

    const data = await response.json();

    if (response.ok) {
      setAlertVariant("success");
      setAlertMessage("Destination added to favorites");
      setButtonText("Destination saved!");
      setButtonClicked(true);
    } else {
      setAlertVariant("danger");
      setAlertMessage(data.error || "Error adding the destination to favorites");
      setButtonText("Destination already saved...");
      setButtonClicked(true);
    }
  };

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?id=";
  const apiKey = "&appid=4793b8122ea405851f5579246c1395fd&units=metric";
  const iconUrl = "https://openweathermap.org/img/wn/";
  const weatherIcon = weatherIconId ? iconUrl + weatherIconId + ".png" : "";
  
  // console.log(weatherIcon);
  // console.log('id destino: ', recommendedApiId);

  useEffect(() => {
    if (recommendedApiId) {
      fetch(apiUrl + recommendedApiId + apiKey)
        .then((response) => response.json())
        .then((data) => {
          setTempMain(data.main);
          setWeatherIconId(data.weather[0].icon);
          setWeatherDescription(data.weather[0].description);
          console.log('api clima', data.weather[0]);
        })
        .catch((error) => console.log(error));
    }
  }, [recommendedApiId]);

  return (
    <div className="container-recommendation">
      <DestinationCard
        recommendedDestination={recommendedDestination}
        recommendedDescription={recommendedDescription}
        recommendedImage={recommendedImage}
        weatherIcon={weatherIcon}
        temp={tempMain.temp !== 0 && tempMain.temp.toFixed(1)}
        feels_like={tempMain.feels_like !== 0 && tempMain.feels_like.toFixed(1)}
        weatherDescription={weatherDescription}
        temp_min={tempMain.temp_min !== 0 && tempMain.temp_min.toFixed(1)}
        temp_max={tempMain.temp_max !== 0 && tempMain.temp_max.toFixed(1)}
        humidity={tempMain.humidity !== 0 && tempMain.humidity.toFixed(1)}
      />

      <div className="">
        <button className="btn-recomendation btn-lg mt-4" type="button" onClick={handleAddFav} disabled={buttonClicked}>
          {buttonText}
        </button>
        {/* {alertMessage && (
          <div className={`alert alert-${alertVariant} mt-4`} role="alert">
            {alertMessage}
          </div>
        )} */}
      </div>
    </div>
  );
};