import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"

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
					{tokenExists && (
						<>
							<Link to="/selection" className="navbar-link">
								Select Destination
							</Link>
							<Link to="/planner" className="navbar-link">
								Planner
							</Link>
							<br />
							<button onClick={handleLogout}>
								Hello: {loggedUserName} {"->"} Logout
							</button>
						</>
					)}
					{!tokenExists && (
						<>
							<Link to="/login">
								<button className="navbar-link">Log In</button>
							</Link>
							{/* <Link to="/signup">
								<button className="navbar-link">Sign Up</button>
							</Link> */}
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
