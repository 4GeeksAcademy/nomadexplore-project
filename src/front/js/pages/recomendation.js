import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import destinationWeights from '../data/weights.json';

export const Recomendation = () => {
    const { store, actions } = useContext(Context);
    const [recommendedDestination, setRecommendedDestination] = useState(null);
    const [recommendedDescription, setRecommendedDescription] = useState(null);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    console.log('desde el funky flux baby:', store.userSelections);

    const calculateRecommendation = () => {
        let maxScore = 0;
        let recommendedDestination = null;
        let recommendedDescription = null;

        for (const i in destinationWeights) {
            const destinationWeight = destinationWeights[i];
            const { destination, description, weights } = destinationWeight;
            let score = 0;

            for (const category in store.userSelections) {
                score += store.userSelections[category] * weights[category];
            }

            console.log(`Destination: ${destination}, Score: ${score}`); // Imprimir destino y puntaje en la consola

            if (score > maxScore) {
                maxScore = score;
                recommendedDestination = destination;
                recommendedDescription = description;
            }
        }
        setRecommendedDestination(recommendedDestination);
        setRecommendedDescription(recommendedDescription);
        console.log("Recommended Destination:", recommendedDestination); // Imprimir destino recomendado en la consola
    };

    useEffect(() => {
        calculateRecommendation();
    }, []);


    const handleAddFav = async () => {

        const response = await fetch(process.env.BACKEND_URL + "/api/favs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ recommendedDestination }),
        });
        console.log('added: ', recommendedDestination)

        const data = await response.json();

        if (response.ok) {
            setAlertVariant("success");
            setAlertMessage("Favorito añadido correctamente");
        } else {
            setAlertVariant("danger");
            setAlertMessage(data.error || "Error al añadir el favorito. Mira la consola o en el terminal del servidor de Python");
        }
    };

    return (
        <div>
            <div style={{ textAlign: "center", margin: "40px" }}>
                <h2>Tu destino recomendado es:</h2>
                <h1>{recommendedDestination}</h1>
                <p>{recommendedDescription}</p>
            <button onClick={handleAddFav} style={{ margin: '10px' }}>
                Agregar a favoritos
            </button>
            </div>
            {alertMessage && (
                <div className={`alert alert-${alertVariant}`} role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    )
}