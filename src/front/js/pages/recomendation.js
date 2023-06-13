import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import destinationWeights from '../data/destinations.json';

export const Recomendation = () => {
    const { store, actions } = useContext(Context);
    const [recommendedDestination, setRecommendedDestination] = useState(null);
    const [recommendedDescription, setRecommendedDescription] = useState(null);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);

    const navigate = useNavigate();

    const calculateRecommendation = () => {
        let maxScore = 0;
        let recommendedDestination = null;
        let recommendedDescription = null;

        for (const i in destinationWeights) {
            const destinationWeight = destinationWeights[i];
            const { destination, description, weights } = destinationWeight;
            let score = 0;

            for (const category in store.userSelections) {
                score += store.userSelections[category] * weights[category];
            }
            console.log(destination + ":" + score);

            if (score > maxScore) {
                maxScore = score;
                recommendedDestination = destination;
                recommendedDescription = description;
            }
        }
        setRecommendedDestination(recommendedDestination);
        setRecommendedDescription(recommendedDescription);
    };

    useEffect(() => {
        calculateRecommendation();
    }, []);

    const handleAddFav = async () => {

        const token = localStorage.getItem("miTokenJWT");

        if (!token) {
            // Mmmmm... no tengo el token, no debería poder acceder a está página de React
            navigate('/login');
        }



        const response = await fetch(process.env.BACKEND_URL + "/api/favs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ recommendedDestination }),
        });

        const data = await response.json();

        if (response.ok) {
            setAlertVariant("success");
            setAlertMessage("Favorito añadido correctamente");
            setButtonClicked(true);
        } else {
            setAlertVariant("danger");
            setAlertMessage(data.error || "Error al añadir el favorito. Mira la consola o en el terminal del servidor de Python");
            setButtonClicked(true);
        }
    };

    
    const api = {
        key: "&appid=0dc5a4cf75951d34619605b76e3b6f73",
        base: "https://api.openweathermap.org/data/2.5/weather?q="
    }
    const apiCall = () => {
        fetch(api.base + recommendedDestination + api.key)
            .then((res) => res.json())
            .then((result) => {
                const weather = result.weather[0].description;
                setWeatherDescription(weather);
            });
    };


    return (
        <div>
            <div className="container py-4">
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold text-dark">{recommendedDestination}</h1>
                        <p className="col-md-8 fs-4 text-dark">
                            {recommendedDescription}
                        </p>

                        <button className="btn btn-primary btn-lg" type="button" onClick={handleAddFav}>
                            Me gusta
                        </button>
                        {alertMessage && (
                            <div className={`alert alert-${alertVariant}`} role="alert">
                                {alertMessage}
                            </div>
                        )}
                    </div>
                </div>
                <footer className="pt-3 mt-4 text-muted border-top">© 2023</footer>
            </div>



            {/* <div style={{ textAlign: "center", margin: "40px" }}>
                <h2>Tu destino recomendado es:</h2>
                <h1>{recommendedDestination}</h1>
                <p>{recommendedDescription}</p>
                {!buttonClicked && (
                    <button onClick={handleAddFav} style={{ margin: '10px' }}>
                        Agregar a favoritos
                    </button>
                )}
            </div>
            {alertMessage && (
                <div className={`alert alert-${alertVariant}`} role="alert">
                    {alertMessage}
                </div>
            )} */}
        </div>
    );
};