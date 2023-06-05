import { useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css"

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();


  const Usuario = {
    "email": email,
    "password": password
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("email a enviar: ", email)
      console.log("password a enviar: ", password)


      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Usuario)
      });

      if (response.ok) {
        setLoginSuccess(true);
        setLoginError(false);
        const data = await response.json();
        const token = data.token;
        const email = data.email;

        localStorage.setItem("miTokenJWT", token);
        localStorage.setItem("loggedUserEmail", email);

        setLoginSuccess(true);

        setEmail('');
        setPassword('');
        navigate('/')
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
    <div className="login-container">
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
          <button type="submit" className="btn-form btn-primary">Log in</button>
          <a className="form-hyperlink" href="">Forgot your password</a>
        </form>
      </div>
    </div>
  );
};
