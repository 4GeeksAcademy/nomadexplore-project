import React from 'react'

export const Recomendation = () => {

    const calculateRecommendation = () => {
        let maxScore = 0;
        let recommendedDestination = null;

        for (const i in destinationWeights) {
            const destinationWeight = destinationWeights[i];
            const { destination, weights } = destinationWeight;
            let score = 0;

            for (const category in userWeights) {
                score += userWeights[category] * weights[category];
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

    return (
        <div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h2>Tu destino recomendado es: TEST NAVIGATE</h2>
                {/* <button onClick={handleRecommendationClick}>
                    Calcular Recomendación
                </button> */}
            </div>
        </div>
    )
}
