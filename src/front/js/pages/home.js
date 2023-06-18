import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Palm from "../../img/palm.jpeg";
import "../../styles/home.css";



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid landing" style={{ backgroundImage: `url(${Palm})` }}>
			<div className="row">
				<div className="col-12 justify-content-center alig-content-center">
					<h1 className="title">DISCOVER AND FIND THE PERFECT DESTINATION FOR U</h1>
				</div>
				<div className="col-12 container-button">
						<Link to="/signup">
							<button className="btn-registrer">REGISTRER AND ENJOY</button>
						</Link>
					</div>
				<div className="col-12 pt-3 pe-5 d-flex justify-content-end">
					<div className="carousel slide carousel-container" id="carouselSlider">
						<div className="carousel-inner">
							<div className="carousel-item active">
							<img src="https://images.unsplash.com/photo-1601836743857-4d1e6da20a32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" alt="Card Image" className="d-block w-100 h-100"/>
							</div>
							<div className="carousel-item 1">
								<img src="https://images.unsplash.com/photo-1632660967293-ec569f27dfd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=978&q=80" alt="Card Image" className="d-block w-100 h-100"/>
							</div>
							<div className="carousel-item ">
								<img src="https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1184&q=80" alt="Card Image" className="d-block w-100 h-100"/>
							</div>
							<div className="carousel-item ">
								<img src="https://images.unsplash.com/photo-1630219694734-fe47ab76b15e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1052&q=80" alt="Card Image" className="d-block w-100 h-100"/>
							</div>
							<div className="carousel-item ">
								<img src="https://images.unsplash.com/photo-1550850839-8dc894ed385a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80" alt="Card Image" className="d-block w-100 h-100"/>
							</div>
							<div className="carousel-item ">
								<img src="https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80" alt="Card Image" className="d-block w-100 h-100"/>
							</div>
							<div className="carousel-item ">
								<img src="https://images.unsplash.com/photo-1552751753-0fc84ae5b6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Card Image" className="d-block w-100 h-100"/>
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
			</div>
		</div>
	);
};
