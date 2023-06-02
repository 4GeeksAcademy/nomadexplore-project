import React, { useContext } from "react";
import "../../styles/home.css";

export const Home = () => {
	
	return (
		<div className="container center-container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card custom-card">
           
            <div className="card-body">
              <h5 className="card-title">Mikonos</h5>
              <p className="card-text">Population: [population of Mikonos]</p>
              <p className="card-text">Budget: X</p>
              <p className="card-text">Recommended activities: X</p>
              <p className="card-text">Currency: Euro</p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
	);
};
