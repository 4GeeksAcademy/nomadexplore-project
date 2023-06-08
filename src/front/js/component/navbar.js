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
					<a href="https://twitter.com/nomadexplore" style={{ color: "white" }} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i>
					</a>
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
			</div>
		</nav>
	);
};
