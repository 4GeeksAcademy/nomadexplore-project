import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../../styles/selection.css'
import imagesDB from '../data/imagesDB.json';
import { string } from "prop-types";


const randomUrl = (categoria) => {
    const categoryImages = imagesDB[0][categoria];
    const imageKeys = Object.keys(categoryImages);
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return categoryImages[randomKey];
  };

// const randomUrl = (categoria) => {
//     let string = 'url'
//     let length = Object.keys(imagesDB[0][categoria]).length
//     string += Math.floor(Math.random() * length) + 1
//     return imagesDB[0][categoria][string]
// }


export const Selection = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [pairIndex, setPairIndex] = useState(0);

    const imagePairs = [
        { img1: randomUrl('cultura'), img2: randomUrl('naturaleza') },
        { img1: randomUrl('gastronomia'), img2: randomUrl('playa') },
        { img1: randomUrl('entretenimiento'), img2: randomUrl('aventura') },
        { img1: randomUrl('cultura'), img2: randomUrl('gastronomia') },
        { img1: randomUrl('playa'), img2: randomUrl('aventura') },
        { img1: randomUrl('entretenimiento'), img2: randomUrl('naturaleza') },
        { img1: randomUrl('cultura'), img2: randomUrl('entretenimiento') },
        { img1: randomUrl('gastronomia'), img2: randomUrl('naturaleza') },
        { img1: randomUrl('playa'), img2: randomUrl('aventura') },
    ];

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
            clickImage("entretenimiento", 1);
        } else if (pairIndex === 3) {
            clickImage("cultura", 1);
        } else if (pairIndex === 4) {
            clickImage("playa", 1);
        } else if (pairIndex === 5) {
            clickImage("entretenimiento", 1);
        } else if (pairIndex === 6) {
            clickImage("cultura", 1);
        } else if (pairIndex === 7) {
            clickImage("gastronomia", 1);
        } else if (pairIndex === 8) {
            clickImage("playa", 1);
        }
    };

    const clickImage2 = () => {
        if (pairIndex === 0) {
            clickImage("naturaleza", 1);
        } else if (pairIndex === 1) {
            clickImage("playa", 1);
        } else if (pairIndex === 2) {
            clickImage("aventura", 1);
        } else if (pairIndex === 3) {
            clickImage("gastronomia", 1);
        } else if (pairIndex === 4) {
            clickImage("aventura", 1);
        } else if (pairIndex === 5) {
            clickImage("naturaleza", 1);
        } else if (pairIndex === 6) {
            clickImage("entretenimiento", 1);
        } else if (pairIndex === 7) {
            clickImage("naturaleza", 1);
        } else if (pairIndex === 8) {
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
