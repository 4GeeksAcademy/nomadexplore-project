import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"

export const Navbar = () => {
	const [tokenExists, setTokenExists] = useState(false);
	const [updateChange, setUpdateChange] = useState(false);
	const [loggedUserEmail, setLoggedUserEmail] = useState('');

	const navigate = useNavigate();

	const handleUpdate = () => {
		setUpdateChange(!updateChange);
	};
	useEffect(() => {
		const token = localStorage.getItem("miTokenJWT");
		const loggedUserEmail = localStorage.getItem("loggedUserEmail");

		if (token) {
			setTokenExists(true);
			setLoggedUserEmail(loggedUserEmail);

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
		handleUpdate();
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<Link to="/" className="navbar-brand">
					<span className="brand-text">NOMAD EXPLORE</span>
				</Link>
				<button className="social-buttons">
					<i className="fa-brands fa-instagram"></i>
					<i className="fa-brands fa-twitter"></i>
					<i className="fa-brands fa-facebook"></i>
				</button>
				{!tokenExists ? (
					<div className="navbar-buttons-container">
						<Link to="/aboutus" className="navbar-link">
							About Us
						</Link>
						<Link to="/selection" className="navbar-link">
							Select Destination
						</Link>
						<Link to="/signup" className="navbar-link">
							Sign Up
						</Link>
						<Link to="/login" className="navbar-link">
							Login
						</Link>
						<Link to="/planner" className="navbar-link">
							Planner
						</Link>
						<Link to="/" className="navbar-link">
							<i className="fa-solid fa-star"></i>
						</Link>
					</div>
				) : (
					<div className="navbar-buttons-container">
						<Link to="/aboutus" className="navbar-link">
							About Us
						</Link>
						<Link to="/selection" className="navbar-link">
							Select Destination
						</Link>
						<button className="navbar-link" onClick={handleLogout}>
							Logged as {loggedUserEmail} - Logout
							{/* version beta, me gustaria añadir al form de inicio el nombre para que aqui se visualice el nombre unicamente. */}
						</button>
						<Link to="/planner" className="navbar-link">
							Planner
						</Link>
						<Link to="/" className="navbar-link">
							<i className="fa-solid fa-star"></i>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};
