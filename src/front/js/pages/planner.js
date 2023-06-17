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
            <div className="planner-container">
                {favs.map((fav, index) => (
                    <div className="title-container">
                        <Link to={`destination/${fav.api_id}`}>
                            <h1 className="planner-title">{fav.destination}</h1>
                        </Link>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteFav(fav.id_fav)}
                        >
                            Borrar
                        </button>
                    </div>
                ))}
                {/* {isDeleteSuccess && (
                    <div className="alert alert-success" role="alert">
                        Favorito borrado exitosamente
                    </div>
                )} */}
            </div>
        </>
    );
};