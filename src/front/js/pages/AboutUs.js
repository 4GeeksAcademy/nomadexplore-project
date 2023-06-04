import React from "react";
import "./AboutUs.css"

export const AboutUs = () => {
  return (
    <div className="container-about">
      <div className="aboutus-title">
        <h2 className="aboutus-text"> About Nomad Explore </h2>
      </div>
      <div className="container-info">
        <hr></hr>
        <div className="text-container1">
          <p>
            ¡Bienvenido/a! Me complace presentarte nuestro emocionante proyecto: <strong>NomadExplore</strong>. Es una innovadora aplicación web diseñada para ayudarte a descubrir tu destino turístico ideal en función de tus preferencias visuales. Con NomadExplore, te ofrecemos una experiencia personalizada y única al combinar tus gustos y preferencias en una herramienta fácil de usar.
          </p>
        </div>
        <div className="text-container2">
          <p>
            Una vez que hayas completado la selección de las series de imágenes, nuestro algoritmo de recomendación analizará tus preferencias y generará una sugerencia de destino turístico que se ajuste a tus gustos visuales. Esta recomendación estará respaldada por los datos recopilados durante tu proceso de selección y tendrá en cuenta tus gustos para cada categoría.
          </p>
        </div>
        <hr></hr>
      </div>
    </div>

  );
};