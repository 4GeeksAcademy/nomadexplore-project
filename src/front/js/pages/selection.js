import React, { useState,useEffect ,useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { imgCultura, imgCompras, imgGastronomia, imgEnologia, imgUrban, imgRelax, imgVidaNoc, imgMuseos } from '../data/images'
import destinationWeights from '../data/destinations.json';


const imagePairs = [
    { img1: imgCultura, img2: imgCompras },
    { img1: imgGastronomia, img2: imgEnologia },
    { img1: imgUrban, img2: imgRelax },
    { img1: imgVidaNoc, img2: imgMuseos },
];

export const Selection = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // hook que funciona como link pero se puede usar en js
    const [pairIndex, setPairIndex] = useState(0);
    
    useEffect(() => {
        actions.resetUserSelections();
    }, []);

    const setNextPair = () => {
        if (pairIndex === imagePairs.length - 1) {
            handleNavigate();
        } else {
            setPairIndex(pairIndex + 1);
        }
    };

    const handleNavigate = () => {
        navigate("/destination")
    }

    const clickImage = (category, value) => {
        actions.addUserSelection(category, value);
        setNextPair();
    };

    const clickImage1 = () => {
        if (pairIndex === 0) {
            clickImage("cultura", 10);
        } else if (pairIndex === 1) {
            clickImage("gastronomia", 10);
        } else if (pairIndex === 2) {
            clickImage("urban", 10);
        } else if (pairIndex === 3) {
            clickImage("vidaNocturna", 10);
        }
    };

    const clickImage2 = () => {
        if (pairIndex === 0) {
            clickImage("compras", 10);
        } else if (pairIndex === 1) {
            clickImage("enologia", 10);
        } else if (pairIndex === 2) {
            clickImage("relax", 10);
        } else if (pairIndex === 3) {
            clickImage("museos", 10);
        }
    };

    return (
        <div className="destinations-container">
            {/* {pairIndex === imagePairs.length ? (
                <div clasName="container-recomendation">
                    <h2 className="text-recomendation">You must go on to...</h2>
                    <button className="btn-result" onClick={handleRecommendationClick}>
                        Click for result
                    </button>
                    <h2 className="final-result"> {recommendedDestination}
                        <button className="btn-fav"><i class="fa-regular fa-star"></i></button>
                    </h2>
                </div>
            ) : ( */}
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
            {/* )} */}
        </div>
    );
};
