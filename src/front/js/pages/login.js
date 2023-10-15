import { useState } from "react";
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/forms.css"

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Estas logicas de requests, o logicas muy complejas o largas, siempre es mejor dejarla fuera del componente, hace mas facil de leer el código. Puedes crear un custom hooks para eso o funciones en archivos aparte. 

    try {
      const loginUser = {
        email: email,
        password: password,
      };

      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      if (response.ok) {
        setLoginSuccess(true);
        setLoginError(false);
        const data = await response.json();
        const token = data.token;
        const email = data.email;
        const name = data.name;
        localStorage.setItem("miTokenJWT", token);
        localStorage.setItem("loggedUserEmail", email);
        localStorage.setItem("loggedUserName", name);

        setLoginSuccess(true);
        setEmail('');
        setPassword('');
        navigate('/selection');
      } else {
        setLoginSuccess(false);
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginSuccess(false);
      setLoginError(true);
    }
  };

  return (
    <div className="login-body">
      <div className="form-container">
        <h2 className="form-title">HERE WE GO!</h2>
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
          {loginError && (
            <div className="alert alert-danger" role="alert">
              Email or password incorrect
            </div>
          )}
          <button type="submit" className="btn-form btn-primary">Log in</button>
        </form>
      </div>
    </div>
  );
};