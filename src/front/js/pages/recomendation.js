import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import destinationWeights from '../data/destinations.json';
import { RecommendedSingle } from "./recommendedSingle";

export const Recomendation = () => {
  const { store, actions } = useContext(Context);
  const [recommendedDestination, setRecommendedDestination] = useState(null);
  const [recommendedDescription, setRecommendedDescription] = useState(null);
  const [recommendedApiId, setRecommendedApiId] = useState(null);
  const [recommendedImage, setRecommendedImage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
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
      // Mmmmm... no tengo el token, no debería poder acceder a está página de React
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
      setAlertMessage("Favorito añadido correctamente");
      setButtonClicked(true);
    } else {
      setAlertVariant("danger");
      setAlertMessage(data.error || "Error al añadir el favorito. Mira la consola o en el terminal del servidor de Python");
      setButtonClicked(true);
    }
  };

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?id="
  const apiKey = "&appid=4793b8122ea405851f5579246c1395fd&units=metric"
  const apiFixed = 1726707
  const iconUrl = "https://openweathermap.org/img/wn/"
  const weatherIcon = weatherIconId ? `${iconUrl}${weatherIconId}.png` : null;
  console.log(weatherIcon);
  console.log('id destino: ', recommendedApiId);

  useEffect(() => {
    if (recommendedApiId) {
      fetch(apiUrl + recommendedApiId + apiKey)
        .then((response) => response.json())
        .then((data) => {
          setTempMain(data.main);
          if (data.weather && data.weather.length > 0) {
            setWeatherIconId(data.weather[0].icon);
            setWeatherDescription(data.weather[0].description);
          }
          console.log('api clima', data.weather[0]);
        })
        .catch((error) => console.log(error));
    }
  }, [recommendedApiId]);


  return (
    <>
      <RecommendedSingle
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

      <div className="container pb-2">
        <div className="p-2 bg-light rounded-3">
          <button className="btn btn-primary btn-lg" type="button" onClick={handleAddFav}>
            Add to Planner
          </button>
          {alertMessage && (
            <div className={`alert alert-${alertVariant}`} role="alert">
              {alertMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};