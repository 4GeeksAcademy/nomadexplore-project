import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import destinationWeights from '../data/weights.json';

export const Recomendation = () => {
    const { store, actions } = useContext(Context);
    const [recommendedDestination, setRecommendedDestination] = useState(null);
    const [recommendedDescription, setRecommendedDescription] = useState(null);

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

    return (
        <div>
            <div style={{ textAlign: "center", margin: "40px" }}>
                <h2>Tu destino recomendado es:</h2>
                <h1>{recommendedDestination}</h1>
                <p>{recommendedDescription}</p>
            </div>
        </div>
    )
}