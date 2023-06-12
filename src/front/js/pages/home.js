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
			<div className="carousel slide" id="carouselSlider">
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="https://media.istockphoto.com/id/682070916/es/foto/trabajador-balineso-del-campo-del-arroz-en-el-campo-del-arroz.jpg?s=612x612&w=0&k=20&c=P-1lOXsYyMfHKsEH4_wnKVisrEvDEhlznEeENaO0Tro=" alt="Card Image" className="w-100 h-100"/>
					</div>
					<div className="carousel-item">
						<img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="Card Image" />
					</div>
					<div className="carousel-item">
						<img src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Card Image" />
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselSlider" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" ></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselSlider" data-bs-slide="next">
						<span className="carousel-control-next-icon" ></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
		</div>




	);
};