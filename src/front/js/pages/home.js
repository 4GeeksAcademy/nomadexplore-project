import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/beach.jpeg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-0">
			<p>
				<img src={rigoImageUrl} />
			</p>

		</div>
	);
};
