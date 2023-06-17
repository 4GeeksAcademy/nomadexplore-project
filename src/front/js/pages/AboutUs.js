import React from "react";
import "./AboutUs.css"

export const AboutUs = () => {
  return (
    <div className="aboutus-container text-center">
      <div className="row">
        <div className="aboutus-description col-sm-12 text-center">
          <h1 className="aboutus-title">ABOUT NOMAD EXPLORE</h1>
          <hr className="border-top mb-4" />
          <div className="text-container1">
            <p className="mb-4">
              Welcome to! I am pleased to introduce you to our exciting project: <strong>NomadExplore</strong>. It is an innovative web application designed to help you discover your ideal tourist destination based on your visual preferences. With NomadExplore, we offer you a personalized and unique experience by combining your tastes and preferences in one easy-to-use tool.
            </p>
          </div>
          <div className="text-container2">
            <p className="mb-4">
              Once you have completed the selection of the image series, our recommendation algorithm will analyze your preferences and generate a tourist destination suggestion that fits your visual tastes. This recommendation will be backed by the data collected during your selection process and will take into account your preferences for each category.
            </p>
            <hr className="border-top" />
          </div>
        </div>

        <div className="col-md-4 contenido-circulos">
          <div className="circle">
            <div className="circle-content">
              <img src="https://media.istockphoto.com/id/1176438482/es/foto/escritor-de-blogs-de-estilo-de-vida-digital-o-persona-de-negocios-que-utiliza-un-dispositivo.jpg?s=612x612&w=0&k=20&c=kF2AmluvIf-dSTazUn-a8Ej8fmsh28US4MQm2doGPXo="
                alt="Imagen 1"
                className="circle-image" />
              <p className="circle-text">SIGN UP & LOGIN</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 contenido-circulos">
          <div className="circle">
            <div className="circle-content">
              <img src="https://media.istockphoto.com/id/828687016/es/foto/hombre-joven-con-un-globo-del-mundo-en-sus-manos.jpg?s=612x612&w=0&k=20&c=3pMkUD87BdyU3GwBtvGeQZvoAOmNykd28U6dl7OlMAQ="
                alt="Imagen 1"
                className="circle-image" />
              <p className="circle-text">CHOOSE YOUR PREFERENCES</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 contenido-circulos">
          <div className="circle">
            <div className="circle-content">
              <img src="https://media.istockphoto.com/id/1055429966/es/foto/adulto-joven-relajante-en-un-columpio-en-un-para%C3%ADso-tropical.jpg?s=612x612&w=0&k=20&c=CXC4QJeisbfAntBptsQnot81jiCLTPp-AQ_VvvSMEWY="
                alt="Imagen 1"
                className="circle-image" />
              <p className="circle-text">ENJOY YOUR TRIP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};