import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import destinationWeights from '../data/destinations.json';


export const RecomendationFav = () => {
  const { store, actions } = useContext(Context);
  const [recommendedDestination, setRecommendedDestination] = useState("Roma");
  const [recommendedDescription, setRecommendedDescription] = useState("lalalalaalalalalaal");
  const [recommendedApiID, setRecommendedApiID] = useState(null);
  const [recommendedImage, setRecommendedImage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [weatherIconId, setWeatherIconId] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [tempMain, setTempMain] = useState({ temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, humidity: 0 });
  
  const params = useParams();
  const navigate = useNavigate();




  return (
    <div>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold text-dark">{recommendedDestination}</h1>
            <p className="col-md-8 fs-4 text-dark">{params.id}</p>
            <div className="row">
              <div className="col-md-3 d-flex justify-content-center">
                <img style={{ width: "250px" }} src={recommendedImage} alt="image" />
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div>
                  <img style={{ width: '100px' }} src={""} alt="icon" />
                  <p className="display-5 fw-bold text-dark">Temp: {tempMain.temp !== 0 && tempMain.temp.toFixed(1)}ºC</p>
                  <p className="display-6 fw-bold text-dark">Feels like: {tempMain.feels_like !== 0 && tempMain.feels_like.toFixed(1)}ºC</p>
                </div>
              </div>
              <div className="col-md-3 d-flex justify-content-center align-items-center">
                <div>
                  <p className="display-6 fw-bold text-dark">{weatherDescription}</p>
                  <p className="display-7 fw-bold text-dark">Min: {tempMain.temp_min !== 0 && tempMain.temp_min.toFixed(1)}ºC</p>
                  <p className="display-7 fw-bold text-dark">Max: {tempMain.temp_max !== 0 && tempMain.temp_max.toFixed(1)}ºC</p>
                  <p className="display-7 fw-bold text-dark">Humidity: {tempMain.humidity !== 0 && tempMain.humidity.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="pt-3 mt-4 text-muted border-top">© 2023</footer>
      </div>
    </div>


  );
};