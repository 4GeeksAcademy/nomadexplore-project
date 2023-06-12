import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import destinationWeights from '../data/destinations.json';
import "./recomendation.css"

export const Recomendation = () => {
    const { store, actions } = useContext(Context);
    const [recommendedDestination, setRecommendedDestination] = useState(null);
    const [recommendedDescription, setRecommendedDescription] = useState(null);
    const [recommendedApiID, setRecommendedApiID] = useState(null);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);
    const [weatherDescription, setWeatherDescription] = useState("");


    console.log('desde el funky flux baby:', store.userSelections);

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

            console.log(`Destination: ${destination}, Score: ${score}`); // Imprimir destino y puntaje en la consola

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
        console.log("Recommended Destination:", recommendedDestination); // Imprimir destino recomendado en la consola
    };

    useEffect(() => {
        calculateRecommendation();
    }, []);

    useEffect(() => {
        calculateRecommendation();
        apiCall();
    }, [recommendedDestination]);

    const api = {
        key: "&appid=0dc5a4cf75951d34619605b76e3b6f73",
        base: "https://api.openweathermap.org/data/2.5/weather?q="
        }
    
        const apiCall = () => {
            console.log(recommendedDestination,)
            fetch(api.base + recommendedDestination + api.key)
                .then((res) => res.json())
                .then((result) => {
                    const weather = result.weather[0].description;
                    setWeatherDescription(weather);
                });
            };

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
            body: JSON.stringify({ recommendedDestination }),
        });

        const data = await response.json();

        if (response.ok) {
            setAlertVariant("success");
            setAlertMessage("Favorito añadido correctamente");
            setButtonClicked(true);
        } else {
            setAlertVariant("danger");
            setAlertMessage(data.error || "Error al añadir el favorito.");
            setButtonClicked(true);
        }
    };

    return (
        <div className="jumbotron recommendation-container">
         <div className="jumbotron-content">
             <h2 className="jumbotron-heading">Tu destino recomendado es:</h2>
             <h1 className="jumbotron-destination">{recommendedDestination}</h1>
         <p className="jumbotron-description">{recommendedDescription}</p>
        <p className="jumbotron-description">Valor de la propiedad apiID en el json:</p>
         <p className="jumbotron-description">{recommendedApiID}</p>
         <button className="add-fav-button" onClick={handleAddFav}>
      Agregar a favoritos
    </button>
    {alertMessage && (
      <div className={`alert jumbotron-alert`} role="alert">
        {alertMessage}
      </div>
    )}
  </div>
</div>
    )
}