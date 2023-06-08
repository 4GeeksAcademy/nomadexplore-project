import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Palm from "../../img/palm.jpeg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="landing-container">
			<div className="background-image">
				<img src={Palm} alt="Background" />
				<div className="content-container">
					<h1>DISCOVER AND FIND THE PERFECT DESTINATION FOR U</h1>
					<div className="container-button">
						<Link to="/signup">
							<button className="btn-registrer">REGISTRER AND ENJOY</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="card-image-container"></div>
			<div className="card">
				<img src="https://media.istockphoto.com/id/682070916/es/foto/trabajador-balineso-del-campo-del-arroz-en-el-campo-del-arroz.jpg?s=612x612&w=0&k=20&c=P-1lOXsYyMfHKsEH4_wnKVisrEvDEhlznEeENaO0Tro=" alt="Card Image" />
			</div>
		</div>
	);
};
