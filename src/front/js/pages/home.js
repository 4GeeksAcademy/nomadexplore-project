import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Palm from "../../img/palm.jpeg";
import "../../styles/home.css";

//la carpeta pages puedes segmentarla para cada componente, algo como
//pages
// - home
//   - Home.jsx
// - about-us
//   - AboutUs.jsx
// 	 - AboutUs.css

export const Home = () => {
	//Trata de no dejar unused vars, hacen que el código no se vea limpio, puedes decirle al liner que te avise
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid landing px-5" style={{ backgroundImage: `url(${Palm})` }}>
			<div className="row">
				<div className="col-12 justify-content-center alig-content-center">
					<h1 className="title">DISCOVER AND FIND THE PERFECT DESTINATION FOR U</h1>
				</div>
				<div className="col-12 container-button">
					<Link to="/signup">
						<button className="btn-registrer">REGISTER AND ENJOY</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
