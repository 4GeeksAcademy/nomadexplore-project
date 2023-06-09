import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {

	// Existe el token JWT en el localStorage?
	const [tokenExists, setTokenExists] = useState(false);
	const [updateFlag, setUpdateFlag] = useState(false);
	const [loggedUserEmail, setLoggedUserEmail] = useState('');
	const [loggedUserName, setLoggedUserName] = useState('');

console.log('name local', loggedUserName);

	const navigate = useNavigate();

	const handleForceUpdate = () => {
		setUpdateFlag(!updateFlag);
	};
	useEffect(() => {
		const token = localStorage.getItem("miTokenJWT");
		const loggedUserEmail = localStorage.getItem("loggedUserEmail");
		const loggedUserName = localStorage.getItem("loggedUserName");

		if (token) {
			setTokenExists(true);
			setLoggedUserEmail(loggedUserEmail);
			setLoggedUserName(loggedUserName);

		} else {
			setTokenExists(false);
			setLoggedUserEmail('');
		}
	});

	const handleLogout = () => {
		localStorage.removeItem("miTokenJWT");
		localStorage.removeItem("loggedUserEmail");

		setTokenExists(false);
		navigate('/');
		handleForceUpdate();
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{tokenExists && (
					<>
						<Link to="/listFavs">
							<button className="btn btn-primary">Mis Favoritos</button>
						</Link>
						<button className="btn btn-primary" onClick={handleLogout}>
							Hello: {loggedUserName}- Logout
						</button>
					</>
				)}
				{!tokenExists && (
					<>
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-primary">Signup</button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};
