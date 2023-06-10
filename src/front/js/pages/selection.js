import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../../styles/selection.css'
import imagesDB from '../data/imagesDB.json';
import { string } from "prop-types";

// console.log('length:', Object.keys(imagesDB[0].cultura).length);

const randomUrl = (categoria) => {
    let string = 'url'
    let length = Object.keys(imagesDB[0][categoria]).length
    string += Math.floor(Math.random() * length) + 1
    return imagesDB[0][categoria][string]
}

const imagePairs = [
    { img1: randomUrl('cultura'), img2: randomUrl('paisajes') },
    { img1: randomUrl('gastronomia'), img2: randomUrl('playa') },
    { img1: randomUrl('atracciones'), img2: randomUrl('vidaNocturna') },
    { img1: randomUrl('shopping'), img2: randomUrl('aventura') },
    { img1: randomUrl('cultura'), img2: randomUrl('gastronomia') },
    { img1: randomUrl('paisajes'), img2: randomUrl('playa') },
    { img1: randomUrl('atracciones'), img2: randomUrl('shopping') },
    { img1: randomUrl('vidaNocturna'), img2: randomUrl('aventura') },
];

export const Selection = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
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
        console.log('store', store.userSelections);
        setNextPair();
    };

    const clickImage1 = () => {
        if (pairIndex === 0) {
            clickImage("cultura", 1);
        } else if (pairIndex === 1) {
            clickImage("gastronomia", 1);
        } else if (pairIndex === 2) {
            clickImage("atracciones", 1);
        } else if (pairIndex === 3) {
            clickImage("shopping", 1);
        } else if (pairIndex === 4) {
            clickImage("cultura", 1);
        } else if (pairIndex === 5) {
            clickImage("paisajes", 1);
        } else if (pairIndex === 6) {
            clickImage("atracciones", 1);
        } else if (pairIndex === 7) {
            clickImage("vidaNocturna", 1);
        }
    };

    const clickImage2 = () => {
        if (pairIndex === 0) {
            clickImage("paisajes", 1);
        } else if (pairIndex === 1) {
            clickImage("playas", 1);
        } else if (pairIndex === 2) {
            clickImage("vidaNocturna", 1);
        } else if (pairIndex === 3) {
            clickImage("aventura", 1);
        } else if (pairIndex === 4) {
            clickImage("gastronomia", 1);
        } else if (pairIndex === 5) {
            clickImage("playas", 1);
        } else if (pairIndex === 6) {
            clickImage("shopping", 1);
        } else if (pairIndex === 7) {
            clickImage("aventura", 1);
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
            <div style={{ margin: "auto", textAlign: "center", marginTop: '10px' }}>
                <div>
                    <h2>
                        Click en la imagen que más te guste // Par: {pairIndex + 1}
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
                </div>
            </div>
        </div>
    );
};
