import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/beach.jpeg";


export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="jumbotron">
			<h1 className="textdisplay-4">This will show the demo element: {store.demo[params.theid].title}</h1>
			<img src={rigoImageUrl} />


			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>

	);
};

Single.propTypes = {
	match: PropTypes.object
};
