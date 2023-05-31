import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../../styles/selection.css'
// llamo a mis imagenes con un fetch desde el back
import { imgCultura, imgCompras, imgGastronomia, imgEnologia, imgUrban, imgRelax, imgVidaNoc, imgMuseos } from './images'


const imagePairs = [
    { img1: imgCultura, img2: imgCompras },
    { img1: imgGastronomia, img2: imgEnologia },
    { img1: imgUrban, img2: imgRelax },
    { img1: imgVidaNoc, img2: imgMuseos },
];

const destinationWeights = [
    {
        destination: "Roma",
        weights: {
            cultura: 10,
            compras: 1,
            gastronomia: 10,
            enologia: 10,
            urban: 5,
            relax: 5,
            vidaNocturna: 3,
            museos: 10,
        },
    },
    {
        destination: "Londres",
        weights: {
            cultura: 6,
            compras: 10,
            gastronomia: 1,
            enologia: 1,
            urban: 9,
            relax: 1,
            vidaNocturna: 10,
            museos: 10,
        },
    },
    {
        destination: "Mikonos",
        weights: {
            cultura: 1,
            compras: 10,
            gastronomia: 10,
            enologia: 5,
            urban: 1,
            relax: 10,
            vidaNocturna: 1,
            museos: 1,
        },
    },
];

export const Selection = () => {
    const navigate = useNavigate(); // hook que funciona como link pero se puede usar en js
    const [pairIndex, setPairIndex] = useState(0);
    const [recommendedDestination, setRecommendedDestination] = useState(null);
    const [userWeights, setUserWeights] = useState({
        cultura: 0,
        compras: 0,
        gastronomia: 0,
        enologia: 0,
        urban: 0,
        relax: 0,
        vidaNocturna: 0,
        museos: 0,
    });

    console.log("user weight: ", userWeights);

    const setNextPair = () => {
        setPairIndex(pairIndex + 1);
    };

    const clickImage = (category, value) => {
        setUserWeights((prevUserWeights) => ({
            ...prevUserWeights,
            [category]: prevUserWeights[category] + value,
        }));
        setNextPair();
        // handleNavigateAuto()
    };

    const clickImage1 = () => {
        if (pairIndex === 0) {
            clickImage("cultura", 1);
        } else if (pairIndex === 1) {
            clickImage("gastronomia", 1);
        } else if (pairIndex === 2) {
            clickImage("urban", 1);
        } else if (pairIndex === 3) {
            clickImage("vidaNocturna", 1);
        }
    };

    const clickImage2 = () => {
        if (pairIndex === 0) {
            clickImage("compras", 1);
        } else if (pairIndex === 1) {
            clickImage("enologia", 1);
        } else if (pairIndex === 2) {
            clickImage("relax", 1);
        } else if (pairIndex === 3) {
            clickImage("museos", 1);
        }
    };

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

    const handleRecommendationClick = () => {
        calculateRecommendation();
    };

    const handleNavigate = () => {
        navigate("/reco")
    }

    // const handleNavigateAuto = () => {
    //     if (pairIndex === imagePairs.length-1) {
    //         navigate("/reco")
    //     }
    // }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <div style={{ margin: "auto", textAlign: "center" }}>
                {pairIndex === imagePairs.length ? (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <h2>Tu destino recomendado es: {recommendedDestination}</h2>
                        <button onClick={handleRecommendationClick}>
                            Calcular Recomendación
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2>
                            Click en la imagen que más te guste // Serie: {pairIndex + 1}
                        </h2>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div
                                style={{
                                    border: "1px solid black",
                                    padding: "10px",
                                    marginRight: "20px",
                                }}
                            >
                                <img
                                    src={imagePairs[pairIndex].img1}
                                    alt="Imagen 1"
                                    style={{ width: "200px", height: "200px", cursor: "pointer" }}
                                    onClick={clickImage1}
                                />
                            </div>
                            <div style={{ border: "1px solid black", padding: "10px" }}>
                                <img
                                    src={imagePairs[pairIndex].img2}
                                    alt="Imagen 2"
                                    style={{ width: "200px", height: "200px", cursor: "pointer" }}
                                    onClick={clickImage2}
                                />
                            </div>
                        </div>
                        <button onClick={handleNavigate} style={{ margin: '20px' }}>
                            test navigate
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
