import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {

	// Existe el token JWT en el localStorage?
	const [tokenExists, setTokenExists] = useState(false);
	const [updateFlag, setUpdateFlag] = useState(false);
	const [loggedUserEmail, setLoggedUserEmail] = useState('');
	const [loggedUserName, setLoggedUserName] = useState('');

	// console.log('name local', loggedUserName);

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
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					NOMAD EXPLORE
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav ms-auto">
						<Link to="/" className="nav-link">
							Social Media
						</Link>
						<Link to="/" className="nav-link">
							About Us
						</Link>
						{tokenExists && (
							<>
								<Link to="/selection" className="nav-link">
									Selection
								</Link>
								<Link to="/listFavs" className="nav-link">
									Planner
								</Link>
								<a className="nav-link" href="#" onClick={handleLogout}>
									Hello: {loggedUserName}- Logout
								</a>
							</>
						)}
						{!tokenExists && (
							<>
								<Link to="/login" className="nav-link">
									Login
								</Link>
								<Link to="/signup" className="nav-link">
									Signup
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
