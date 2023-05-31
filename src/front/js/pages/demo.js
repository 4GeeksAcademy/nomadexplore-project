import React, { useState } from "react";

const imgCultura = "https://images.pexels.com/photos/16353919/pexels-photo-16353919/free-photo-of-ciudad-punto-de-referencia-verano-italia.jpeg?auto=compress&cs=tinysrgb&w=800";
const imgCompras = "https://media.istockphoto.com/id/967041448/es/foto/elegante-mujer-coreana-en-el-centro-de-la-ciudad-de-se%C3%BAl.jpg?s=612x612&w=0&k=20&c=QouPeq0W1cQL3a4PEsIAddaJseiDz54GVMmStGvCsOA=";
const imgGastronomia = "https://images.pexels.com/photos/8753672/pexels-photo-8753672.jpeg?auto=compress&cs=tinysrgb&w=800"
const imgEnologia = "https://media.istockphoto.com/id/1047180430/es/foto/copa-de-vino-en-mano-del-turista-en-un-paisaje-natural-de-la-toscana-con-el-verde-valle-de-las.jpg?s=612x612&w=0&k=20&c=86H4Qq_Fx-5rzPJkiCQHMivQDS3vVDhnMmNJwz2Awcw=";
const imgUrban = "https://media.istockphoto.com/id/517133347/es/foto/shanghai-al-atardecer.jpg?s=612x612&w=0&k=20&c=bbwrRz5_LP-N7j7YbyWq45HYW9eSWd56SBZNBNiplRk=";
const imgRelax = "https://media.istockphoto.com/id/1059344876/es/foto/vacaciones-turismo-relax-en-hotel-de-playa-cerca-de-lujo-piscina.jpg?s=612x612&w=0&k=20&c=KNzL1aCme1QTo-yP8wXTI_vARXGeGiXYErNADHqZUFA=";
const imgVidaNoc = "https://media.gettyimages.com/id/1203765223/es/foto/carnaval-en-olinda.jpg?s=612x612&w=0&k=20&c=UYeCZDzCD8Iu0F8fvVvIViHGSmCZFiv_viSDgn6g36I=";
const imgMuseos = "https://media.gettyimages.com/id/91930905/es/foto/blurry-young-man-framed-by-small-golden-frame.jpg?s=612x612&w=0&k=20&c=PUNjOaN_JmDJiEpm8rUEfdkuKTVQ-eA3FuCkYeyCNBw=";

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
        destination: "London",
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
        destination: "Mykonos",
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
                <div clasName="container-recomendation">
                    <h2 className="text-recomendation">You must go on to...</h2>
                    <button className="btn-result" onClick={handleRecommendationClick}>
                        Click for result
                    </button>
                    <h2 className="final-result"> {recommendedDestination}
                        <button className="btn-fav"><i class="fa-regular fa-star"></i></button>
                    </h2>
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
