import React, { useState } from "react";

const imgCultura = "https://media.istockphoto.com/id/1047800728/es/foto/madre-y-ni%C3%B1os-turismo-ciudad-de-siena-toscana-italia.jpg?s=1024x1024&w=is&k=20&c=J_qCj8JivXn2qYZoKGTB2F97dPqvORZiZ-Whi0onPDI=";
const imgCompras = "https://media.istockphoto.com/id/1369227756/es/foto/ri%C3%A9ndose-de-su-camino-a-trav%C3%A9s-del-centro-comercial.jpg?s=1024x1024&w=is&k=20&c=VwRB4XcKPB0SU6BTocS_7zuM0CKM0nfVeoPZdxDa-Do=";
const imgGastronomia = "https://media.istockphoto.com/id/1130934413/es/foto/primer-plano-de-las-manos-de-un-cocinero-masculino-sobre-un-fondo-negro-vierta-la-salsa-de-la.webp?s=1024x1024&w=is&k=20&c=gTG6wNCJvWv9Rrfq_PZT-D88GfQOVBisxU1vDGUmKYA="
const imgEnologia = "https://media.istockphoto.com/id/1047180430/es/foto/copa-de-vino-en-mano-del-turista-en-un-paisaje-natural-de-la-toscana-con-el-verde-valle-de-las.webp?s=1024x1024&w=is&k=20&c=mwhgKSGIyXPeTrGBO3u-QdDjQNHqax653lK_o6rLYsA=";
const imgUrban = "https://media.istockphoto.com/id/895081824/es/foto/visitar-espa%C3%B1a-de-turista.jpg?s=1024x1024&w=is&k=20&c=im1wTq8emUvFkV1enxAjJoBHZITvjTGWXeLwfR4yxTQ=";
const imgRelax = "https://media.istockphoto.com/id/1040906722/es/foto/mujer-y-hombre-buscando-en-el-mirador-del-pueblo-de-gordes-en-provenza.webp?s=1024x1024&w=is&k=20&c=JWmqqrdUY77RD9Zr3JZi6HGoOoJvIbw9CUFAZiZBbFE=";
const imgVidaNoc = "https://media.istockphoto.com/id/641775168/es/foto/hombres-y-mujeres-disfrutando-de-una-fiesta-de-j%C3%B3venes.jpg?s=1024x1024&w=is&k=20&c=9RxcsFmz5M8T2SbvPONTZu82TgFFCTcpVbYebOIxMh8=";
const imgMuseos = "https://media.istockphoto.com/id/639558856/es/foto/madre-e-hija-visitando-la-ciudad-de-florencia-toscana.webp?s=1024x1024&w=is&k=20&c=1dZ3Hh-T5adehbWkDOom0pV3IQ-5kpAOTegFXqJ5I3I=";

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

    return (
        <div className="destinations-container">
            {pairIndex === imagePairs.length ? (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <h2>Tu destino recomendado es: {recommendedDestination}</h2>
                    <button onClick={handleRecommendationClick}>
                        Calcular Recomendación
                    </button>
                </div>
            ) : (
                <div className="quiz-container">
                    <h1 className="title-destinations">THIS OR THAT</h1>
                    <div className="subtitle-destinations">
                        <h5 className="text1">¿What do you prefer?</h5>
                    </div>
                    <p className="text2"> Choose your favorite and know your ideal destination</p>
                    <div className="image-container">
                        <img src={imagePairs[pairIndex].img1}
                            onClick={clickImage1}
                            alt="Imagen 1" className="image" />
                        <img src={imagePairs[pairIndex].img2}
                            onClick={clickImage2}
                            alt="Imagen 2" className="image" />
                    </div>
                </div>
            )}
        </div>
    );
};
