import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewFavorite = () => {
  const [destination, setDestination] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

//   const token = localStorage.getItem("miTokenJWT");

//   if (!token) {
//     // Mmmmm... no tengo el token, no debería poder acceder a está página de React
//     navigate('/login');
//   }


  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await fetch(process.env.BACKEND_URL + "/api/favs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ destination }),
    });

    const data = await response.json();

    if (response.ok) {
      setAlertVariant("success");
      setAlertMessage("Favorito añadido correctamente");
      setName("");
    } else {
      setAlertVariant("danger");
      setAlertMessage(data.error || "Error al añadir el favorito. Mira la consola o en el terminal del servidor de Python");
    }
  };

  return (
    <div style={{marginLeft:'20px', marginRight:'20px'}}>
      <div className="container">
        <h2 className="text-center mt-4 mb-5">Añadir nuevo favorito</h2>
      </div>
      {alertMessage && (
        <div className={`alert alert-${alertVariant}`} role="alert">
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre del destino
          </label>
          <input
            type="text"
            className="form-control"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Añadir Favorito
        </button>
      </form>
    </div>
  );
};