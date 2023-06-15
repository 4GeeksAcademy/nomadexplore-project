import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import destinationWeights from '../data/destinations.json';
  
export const TestProps = (props) => {

  return (
    <div>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold text-dark">{props.destination}</h1>
            <p className="col-md-8 fs-4 text-dark">{props.description}</p>
          </div>
        </div>
      </div>
    </div>


  );
};