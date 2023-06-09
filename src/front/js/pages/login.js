import { useState } from "react";
import React from "react";
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Ejercicio 3: En este fetch hay DOS errores que impiden enviar correctamente el usuario y la contraseña al servidor Flask. 
            // Además, falta enviar el email y la contraseña en el cuerpo de la petición POST

            console.log("email a enviar: ", email)
            console.log("password a enviar: ", password)

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
                console.log('data: ', data);
                localStorage.setItem("miTokenJWT", token);
                localStorage.setItem("loggedUserEmail", email);
                localStorage.setItem("loggedUserName", name);

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
        <div style={{margin:'20px'}}>
            {loginSuccess && (
                <div className="alert alert-success" role="alert">
                    ¡Login correcto!
                </div>
            )}
            <h1>Formulario de login</h1>


            {loginError && (
                <div className="alert alert-danger" role="alert">
                    Problemas con el login. Credenciales incorrectas?
                </div>
            )}

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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
                <br/>
                <Link to="/signup">
                <button className="btn btn-secondary">Signup</button>
                </Link>
        </div>
    );
};