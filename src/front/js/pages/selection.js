import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import imagesDB from '../data/imagesDB.json';
import '../../styles/selection.css'


const randomUrl = (categoria) => {
    const categoryImages = imagesDB[0][categoria];
    const imageKeys = Object.keys(categoryImages);
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return categoryImages[randomKey];
};

export const Selection = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // hook que funciona como link pero se puede usar en js
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
        <div className="selection-body">
            <div className="row selection-container">
                <div className="col-sm-12">
                    <h1 className="selection-title">THIS or THAT</h1>
                    <p className="selection-text">Choose your favorite and know your ideal destination.</p>
                </div>
                <div className="col-sm-6 selection-image-container">
                    <img src={imagePairs[pairIndex].img1} onClick={clickImage1} alt="Imagen 1" className="selection-image img-fluid" />
                </div>
                <div className="col-sm-6 selection-image-container">
                    <img src={imagePairs[pairIndex].img2} onClick={clickImage2} alt="Imagen 2" className="selection-image img-fluid" />
                </div>
            </div>
        </div>
    );
};
