import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import destinationWeights from '../data/destinations.json';
import { RecommendedSingle } from "./recommendedSingle";

export const RecomendationFav = () => {
  const [weatherIconId, setWeatherIconId] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [tempMain, setTempMain] = useState({ temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, humidity: 0 });

  const params = useParams();
  const [recommendedApiId, setRecommendedApiId] = useState(params.id);

  const recommendedData = destinationWeights.find(
    (destination) => destination.apiId === recommendedApiId
  );

  if (recommendedData) {
    const {
      destination,
      description,
      apiId,
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

  console.log('params: ', params.id);
  console.log('recomendedData', recommendedData);

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?id=";
  const apiKey = "&appid=4793b8122ea405851f5579246c1395fd&units=metric";
  const iconUrl = "https://openweathermap.org/img/wn/";
  const weatherIcon = weatherIconId ? `${iconUrl}${weatherIconId}.png` : null;
  console.log(weatherIcon);
  console.log('id destino: ', recommendedData.apiId);

  useEffect(() => {
    if (recommendedData) {
      fetch(apiUrl + recommendedData.apiId + apiKey)
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
  }, [recommendedData]);


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