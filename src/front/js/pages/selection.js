import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import imagesDB from '../data/imagesDB.json';
import { string } from "prop-types";

const randomUrl = (categoria) => {
    let string = 'url'
    let length = Object.keys(imagesDB[0][categoria]).length
    string += Math.floor(Math.random() * length) + 1
    return imagesDB[0][categoria][string]
}

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
        <div className="destinations-container">
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
        </div>
    );
};
