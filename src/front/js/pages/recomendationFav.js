import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import destinationWeights from '../data/destinations.json';
import { RecommendedSingle } from "./recommendedSingle";



export const RecomendationFav = () => {
  const { store, actions } = useContext(Context);
  const [recommendedImage, setRecommendedImage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [weatherIconId, setWeatherIconId] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [tempMain, setTempMain] = useState({ temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, humidity: 0 });

  const params = useParams();
  const [recommendedDestination, setRecommendedDestination] = useState(params.id);
  const navigate = useNavigate();


  const recommendedData = destinationWeights.find(
    (destination) => destination.destination === recommendedDestination
  );

  if (recommendedData) {
    const {
      description,
      apiID,
      imageUrl,
      weights: {
        cultura,
        naturaleza,
        gastronomia,
        playa,
        entretenimiento,
        aventura,
      },
    } = recommendedData;

    // Luego puedes utilizar los datos encontrados en tu JSX para mostrar la información correspondiente
  }

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?id="
  const apiKey = "&appid=4793b8122ea405851f5579246c1395fd&units=metric"
  // const destinationApiId = 1726707
  const iconUrl = "https://openweathermap.org/img/wn/"
  // const weatherIcon = iconUrl + weatherIconId + ".png"
  const weatherIcon = weatherIconId ? `${iconUrl}${weatherIconId}.png` : null;
  console.log(weatherIcon);
  console.log('id destino: ', recommendedData.apiID);

  useEffect(() => {
    if (recommendedData.apiID) {
      fetch(apiUrl + recommendedData.apiID + apiKey)
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
  }, [recommendedData.apiID]);


  return (
    <>

      <RecommendedSingle
        recommendedDestination={recommendedData.destination}
        recommendedDescription={recommendedData.description}
        recommendedImage={recommendedData.imageUrl}
        weatherIcon={weatherIcon}
        temp={tempMain.temp !== 0 && tempMain.temp.toFixed(1)}
        feels_like={tempMain.feels_like !== 0 && tempMain.feels_like.toFixed(1)}
        weatherDescription={weatherDescription}
        temp_min={tempMain.temp_min !== 0 && tempMain.temp_min.toFixed(1)}
        temp_max={tempMain.temp_max !== 0 && tempMain.temp_max.toFixed(1)}
        humidity={tempMain.humidity !== 0 && tempMain.humidity.toFixed(1)}
      />

    </>


  );
};