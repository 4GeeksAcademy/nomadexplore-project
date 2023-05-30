import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<Link to="/" className="navbar-brand">
					<span className="brand-text">NOMAD EXPLORE</span>
					<i className="fa-solid fa-plane"></i>
				</Link>
				<div className="navbar-buttons-container">
					<Link to="/aboutus" className="navbar-link">
						About us
					</Link>
					<Link to="/demo" className="navbar-link">
						Selection Destination
					</Link>
					<Link to="/signup" className="navbar-link">
						Sign Up
					</Link>
					<Link to="/" className="navbar-link">
						Login
					</Link>

					<i className="fa-solid fa-magnifying-glass"></i>
					<hr className="separador" />
				</div>
			</div>
		</nav>
	);
};
