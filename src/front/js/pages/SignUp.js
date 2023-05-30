import { useState } from "react";
import React from "react";
import "./SignUp.css"


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

      if (response.ok) {
        console.log("Registered User");
        setMessage('¡Yeah! Welcome to Nomad Explore')
      } else {
        console.error("Error register user. Maybe you are using an existing email?");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (message) return <div className={`alert alert-success ${!message && 'd-none'}`} role="alert">
    {message}
  </div>;


  return (
    <div className="signup-container">
    <div className="form-container">
      <h2 className="form-title">REGISTER FOR JOIN</h2>
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
        <div className={`alert alert-success ${!message && 'd-none'}`} role="alert">
          {message}
        </div>
        <button type="submit" className="btn-form btn-primary">Sign Up</button>
        <a className="form-hyperlink" href="">Get a new password</a>
      </form>
    </div>
    </div>
  );
};
