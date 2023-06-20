import { useState, useEffect } from "react";
import React from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    if (message) {
      timeoutId = setTimeout(() => {
        setMessage("");
      }, 5000); // Espera 5 segundos antes de limpiar el mensaje
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json(); // Analizar la respuesta del servidor

      if (response.ok) {
        console.log("User created");
        // Aquí puedes hacer algo con la respuesta exitosa, como redireccionar o mostrar un mensaje de éxito.
        setMessage("¡User created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Espera 3 segundos antes de redirigir al login
      } else {
        console.error(
          "Error creating user. Maybe you are using an existing email?"
        );
        if (data.error === "user_exists") {
          setMessage(
            "The user is already registered. Please log in instead."
          ); // Mensaje específico para usuario existente
        } else {
          setMessage("There was an error creating the user. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // Aquí puedes manejar cualquier error de red u otro tipo de error.
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2 className="form-title">WELCOME TO EXPLORE</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className={`alert alert-success ${!message && "d-none"}`} role="alert">
            {message}
          </div>
          <button type="submit" className="btn-form">
            Sign Up
          </button>
          <a className="form-hyperlink" href="">
            Forgot your password
          </a>
        </form>
      </div>
    </div>
  );
};