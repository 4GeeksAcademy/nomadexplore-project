import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


export const Planner = () => {

    const [favs, setFavs] = useState([]);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("miTokenJWT");

    const fetchFavs = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/favs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFavs(data);
                console.log(data);
            } else {
                // Si hay un error en la respuesta, redirige al usuario a la página principal
                navigate("/");
            }
        } catch (error) {
            console.error("Error al obtener los favoritos:", error);
        }
    };



    useEffect(() => {
        const token = localStorage.getItem("miTokenJWT");
        if (!token) {
            // No se encontró el token, redirige al usuario a la página principal
            navigate("/");
        }
        fetchFavs();
    }, []);
    console.log('favs: ', favs);
    const handleDeleteFav = async (id) => {
        console.log('id a borrar: ', id);
        try {
            const response = await fetch(
                process.env.BACKEND_URL + `/api/favs/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // Actualizar la lista de favoritos después de borrar uno
                setFavs((prevFavs) => prevFavs.filter((fav) => fav.id_favorite !== id));
                setIsDeleteSuccess(true); // Se establece en verdadero si se eliminó correctamente
            } else {
                console.error("Error al borrar el favorito:", response);
            }
        } catch (error) {
            console.error("Error al borrar el favorito:", error);
        }
    };


    useEffect(() => {
        let timer;
        if (isDeleteSuccess) {
            timer = setTimeout(() => {
                setIsDeleteSuccess(false);
            }, 2000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isDeleteSuccess]);

    useEffect(() => {
        if (isDeleteSuccess || favs.length === 0) {
            fetchFavs(); // Llamar al fetch después de borrar un favorito
        }
    }, [isDeleteSuccess]);

    return (
        <>
             <div className="body-planner">
                <div className="row planner-container">
                    <div className="col-md-12 text-center mb-4">
                        <h1 className="planner-title">YOUR TRIPS</h1>
                        <hr></hr>
                        <p>Here is the list of recommended destinations. To see the information about each destination, click on <u>more info</u> and if, on the contrary, you already made the trip, click on <u>journey done</u> and go to another destination. <i><strong>¡HAVE A GOOD TRIP!</strong></i></p>
                        <hr></hr>
                   </div>
                    
                    {favs.map((fav, index) => (
                   <div className="col-sm-4">
                    <div className="card-planner-container">
                        <h1 className="card-planner-title">{fav.destination}</h1>
                        <div className="button-planner-container">
                            <div>
                            <Link to={`destination/${fav.api_id}`}>
                                <button
                                    className="btn-planner"
                                    onClick={() => handleDeleteFav}>
                                    MORE INFO
                                </button>
                                </Link>
                            </div>
                            <div>
                                <button
                                    className="btn-planner"
                                    onClick={() => handleDeleteFav(fav.id_fav)}>
                                    JOURNEY DONE
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                     ))}
                </div>
            </div>
        </>

    );
};