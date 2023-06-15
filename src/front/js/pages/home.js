import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { TestProps } from "./testProps";

export const Home = () => {
	const { store, actions } = useContext(Context);

let description = 'HOME'

	return (
		<div className="text-center mt-5">
			<TestProps
			destination={description}
			description={'LA PIZZA MAMA'}
			/>
			<h1>Hello Rigo!!</h1>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
