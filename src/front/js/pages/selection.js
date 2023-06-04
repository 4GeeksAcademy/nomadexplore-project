import React, { useState,useEffect ,useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../../styles/selection.css'
import { imgCultura, imgCompras, imgGastronomia, imgEnologia, imgUrban, imgRelax, imgVidaNoc, imgMuseos } from '../data/images'
import destinationWeights from '../data/weights.json';

console.log('destination ponderation from json: ', destinationWeights);


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
        navigate("/reco")
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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <div style={{ margin: "auto", textAlign: "center" }}>
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
                        navigate to recomentation
                    </button>
                </div>
            </div>
        </div>
    );
};
