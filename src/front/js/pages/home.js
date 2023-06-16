import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Palm from "../../img/palm.jpeg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid px-0">
			<div className="">
			<h1>DISCOVER AND FIND THE PERFECT DESTINATION FOR U</h1>
			</div>			
		</div>
		// <div className="landing-container">
		// 	<div className="background-image">
		// 		<img src={Palm} alt="Background" />
		// 		<div className="content-container">
		// 			<h1>DISCOVER AND FIND THE PERFECT DESTINATION FOR U</h1>
		// 			<div className="container-button">
		// 				<Link to="/signup">
		// 					<button className="btn-registrer">REGISTRER AND ENJOY</button>
		// 				</Link>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

