import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ListMyFavs = () => {
  const [favs, setFavs] = useState([]);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const fetchFavs = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/favs", {
        headers: {
          // Authorization: `Bearer ${token}`,
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
    // const token = localStorage.getItem("miTokenJWT");
    // if (!token) {
    //     // No se encontró el token, redirige al usuario a la página principal
    //     navigate("/");
    //     return;
    // }
    fetchFavs();
  }, []);

  const handleDeleteFav = async (id) => {
    console.log('id a borrar: ', id);
    try {
      const response = await fetch(
        process.env.BACKEND_URL + `/api/favs/${id}`,
        {
          method: "DELETE",
          headers: {
            // Authorization: `Bearer ${token}`,
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
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      fetchFavs(); // Llamar al fetch después de borrar un favorito
    }
  }, [isDeleteSuccess]);

  return (
    <div style={{ margin: "10px" }}>
      {isDeleteSuccess && (
        <div className="alert alert-success" role="alert">
          Favorito borrado exitosamente
        </div>
      )}
      <h2 className="text-dark">Mis Destinos</h2>
      <div className="row">
        {favs.map((fav, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img src="" className="card-img-top" alt={fav.destination} />
              <div className="card-body">
                <h5 className="card-title text-dark">{fav.destination}</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteFav(fav.id_fav)}
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};