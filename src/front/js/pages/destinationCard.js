import React from "react";

export const DestinationCard = (props) => {

    return (
        <>
            <div className="0container-recommendation">
                <div className="jumbotron">
                    <h1 className="jumbotron-destination">{props.recommendedDestination}</h1>
                    <div className="col-md-12">
                        <div className="jumbotron-weather">
                            <div className="weather-info">
                                <img className="weather-icon" src={props.weatherIcon} alt="icon" />
                                <p className="temperature-info">{props.weatherDescription}</p>
                                <p className="temperature-info">Temp: {props.temp}ºC</p>
                                <p className="temperature-info">Feels like: {props.feels_like}ºC</p>
                                <p className="temperature-info">Min: {props.temp_min}ºC</p>
                                <p className="temperature-info">Max: {props.temp_max}ºC</p>
                                <p className="temperature-info">Humidity: {props.humidity}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="jumbotron-description">
                                <img className="jumbotron-image" src={props.recommendedImage} alt="image" />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <hr></hr>
                            <div className="jumbotron-description">
                                <p className="jumbotron-text">{props.recommendedDescription}</p>
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};