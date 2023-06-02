import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import destinationWeights from '../data/weights.json';

export const Recomendation = () => {
    const { store, actions } = useContext(Context);
    const [recommendedDestination, setRecommendedDestination] = useState(null);

    console.log('desde el funky flux baby:', store.userSelections);

    const calculateRecommendation = () => {
        let maxScore = 0;
        let recommendedDestination = null;

        for (const i in destinationWeights) {
            const destinationWeight = destinationWeights[i];
            const { destination, weights } = destinationWeight;
            let score = 0;

            for (const category in store.userSelections) {
                score += store.userSelections[category] * weights[category];
            }

            console.log(`Destination: ${destination}, Score: ${score}`); // Imprimir destino y puntaje en la consola

            if (score > maxScore) {
                maxScore = score;
                recommendedDestination = destination;
            }
        }
        setRecommendedDestination(recommendedDestination);
        console.log("Recommended Destination:", recommendedDestination); // Imprimir destino recomendado en la consola
    };

    const handleRecommendationClick = () => {
        calculateRecommendation();
    };


    return (
        <div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h2>Tu destino recomendado es: {recommendedDestination}</h2>
                <button onClick={handleRecommendationClick}>
                    Calcular Recomendación
                </button>
            </div>
        </div>
    )
}
