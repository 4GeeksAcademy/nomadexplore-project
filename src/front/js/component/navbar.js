import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"

export const Navbar = () => {
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
				<div className="navbar-buttons-container">
					<Link to="/aboutus" className="navbar-link">
						About Us
					</Link>
					<Link to="/selection" className="navbar-link">
						Select Destination
					</Link>
					<Link to="/signup" className="navbar-link">
						Log In
					</Link>
					<Link to="/planner" className="navbar-link">
						Planner
					</Link>
					<Link to="/" className="navbar-link">
						<i className="fa-solid fa-star"></i>
					</Link>
				</div>
			</div>
		</nav>
	);
};
