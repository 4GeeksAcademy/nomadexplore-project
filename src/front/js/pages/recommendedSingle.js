import React, { useState, useContext, useEffect } from "react";

export const RecommendedSingle = (props) => {

    return (
        <div>
            <div className="container py-2">
                <div className="p-2 mb-2 bg-light rounded-3">
                    <div className="container-fluid py-2">
                        <h1 className="display-5 fw-bold text-dark">{props.recommendedDestination}</h1>
                        <p className="col-md-8 fs-4 text-dark">{props.recommendedDescription}</p>
                        <div className="row">
                            <div className="col-md-3 d-flex justify-content-center">
                                <img style={{ width: "250px" }} src={props.recommendedImage} alt="image" />
                            </div>
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                <div>
                                    <img style={{ width: '100px' }} src={props.weatherIcon} alt="icon" />
                                    <p className="display-5 fw-bold text-dark">Temp: {props.temp}ºC</p>
                                    <p className="display-6 fw-bold text-dark">Feels like: {props.feels_like}ºC</p>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                <div>
                                    <p className="display-6 fw-bold text-dark">{props.weatherDescription}</p>
                                    <p className="display-7 fw-bold text-dark">Min: {props.temp_min}ºC</p>
                                    <p className="display-7 fw-bold text-dark">Max: {props.temp_max}ºC</p>
                                    <p className="display-7 fw-bold text-dark">Humidity: {props.humidity}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};