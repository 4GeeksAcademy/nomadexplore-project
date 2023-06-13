import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css"

export const Navbar = () => {

	const [tokenExists, setTokenExists] = useState(false);
	const [updateFlag, setUpdateFlag] = useState(false);
	const [loggedUserEmail, setLoggedUserEmail] = useState('');
	const [loggedUserName, setLoggedUserName] = useState('');

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

		<nav className="navbar navbar-dark navbar-expand-lg">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					NOMAD EXPLORE
					<i className="fa-solid fa-earth-americas"></i>
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
						<div className="navbar-icons text-white">
							<a href="https://twitter.com/NomadExplore" target="_blank" rel="noopener noreferrer">
								<i className="twitter-icon fa-brands fa-twitter text-white"></i>
							</a>
							<a href="https://twitter.com/NomadExplore" target="_blank" rel="noopener noreferrer">
								<i className="instagram-icon fa-brands fa-instagram text-white"></i>
							</a>
							<a href="https://twitter.com/NomadExplore" target="_blank" rel="noopener noreferrer">
								<i className="facebook-icon fa-brands fa-facebook text-white"></i>
							</a>
						</div>
						<Link to="/aboutus" className="nav-link text-white">
							About Us
						</Link>
						{tokenExists && (
							<>
								<Link to="/selection" className="nav-link text-white">
									Selection
								</Link>
								<Link to="/planner" className="nav-link text-white">
									Plan your trip
								</Link>
								<a className="nav-link text-white" href="#" onClick={handleLogout}>
									<span className="mr-2">Hi {loggedUserName}!</span> <i className="fa-solid fa-person-walking-arrow-right mt-1 mr-2"></i>
								</a>
							</>
						)}
						{!tokenExists && (
							<>
								<Link to="/login" className="nav-link text-white">
									Login
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>

	);
};
