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
        <div className="recommendation-container">
            <div className="recommendation-content">
                <h2>Tu destino recomendado es:</h2>
                <h1 className="recommended-destination">{recommendedDestination}</h1>
                <p className="recommended-description">{recommendedDescription}</p>
                <p className="recommended-description">Valor de la propiedad apiID en el json:</p>
                <p className="recommended-description">{recommendedApiID}</p>
                <button onClick={handleAddFav} style={{ color: 'black', margin: '10px' }}>
                    Agregar a favoritos
                </button>
            {alertMessage && (
                <div className={`alert alert-${alertVariant}`} role="alert">
                    {alertMessage}
                </div>
            )}
            </div>
        </div>
    )
}