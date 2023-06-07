import { useState } from "react";
import React from "react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Analizar la respuesta del servidor

      if (response.ok) {
        console.log("User created");
        // Aquí puedes hacer algo con la respuesta exitosa, como redireccionar o mostrar un mensaje de éxito.
        setMessage('¡Usuario creado con éxito!');
      } else {
        console.error("Error creating user. Maybe you are using an existing email?");
        if (data.error === "user_exists") {
          setMessage("El usuario ya está registrado. Por favor, inicia sesión en su lugar."); // Mensaje específico para usuario existente
        } else {
          setMessage("Hubo un error al crear el usuario. Por favor, intenta nuevamente.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // Aquí puedes manejar cualquier error de red u otro tipo de error.
    }
  };

  return (
    <div>
      <h2>Formulario de registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};