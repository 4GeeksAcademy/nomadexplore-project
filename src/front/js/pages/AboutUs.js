import React from "react";
import "./AboutUs.css"

export const AboutUs = () => {
  return (
    <div className="container-about">
      <div className="aboutus-title">
        <h2 className="aboutus-text"> About Nomad Explore </h2>
      </div>
      <div className="container-info">
        <div className="text-container1">
          <p>
            ¡Bienvenido/a! Me complace presentarte nuestro emocionante proyecto: <strong>NomadExplore</strong>. Es una innovadora aplicación web diseñada para ayudarte a descubrir tu destino turístico ideal en función de tus preferencias visuales. Con NomadExplore, te ofrecemos una experiencia personalizada y única al combinar tus gustos y preferencias en una herramienta fácil de usar.
          </p>
        </div>
        <div className="text-container2">
          <p>
            Descripción del Proyecto:
            NomadExplore es una aplicación web que te permite registrarte como usuario y explorar una amplia variedad de imágenes temáticas relacionadas con destinos turísticos. La aplicación ha sido diseñada para satisfacer tus necesidades y brindarte recomendaciones de viaje en base a tus preferencias visuales.
          </p>
        </div>
        <div className="text-container3">
          <p>
            Proceso de Selección:
            Una vez registrado/a en NomadExplore, podrás sumergirte en la experiencia visual. Se te presentarán una serie de imágenes en pares, cada una representando diferentes aspectos turísticos, como cultura, relax, gastronomía, espectáculos y más. Tu tarea será seleccionar, con un simple clic, la imagen que mejor refleje tus preferencias entre las opciones presentadas. Este proceso se repetirá varias veces con diferentes pares de imágenes.
          </p>
        </div>
        <div className="text-container4">
          <p>
            Almacenamiento de Preferencias:
            A medida que selecciones tus preferencias visuales en cada serie de imágenes, NomadExplore almacenará y registrará tus elecciones en una tabla junto con una ponderación. Esto nos permitirá entender tus intereses y crear un perfil personalizado basado en tus gustos individuales.
          </p>
        </div>
        <div className="text-container5">
          <p>
            Recomendaciones de Destinos:
            Una vez que hayas completado la selección de las series de imágenes, nuestro algoritmo de recomendación analizará tus preferencias y generará una sugerencia de destino turístico que se ajuste a tus gustos visuales. Esta recomendación estará respaldada por los datos recopilados durante tu proceso de selección y tendrá en cuenta tus ponderaciones para cada categoría.
          </p>
        </div>
        <div className="text-container6">
          <p>
            Opción de Favoritos:
            Valoramos tu satisfacción, por lo que hemos incluido la función "Guardar en Favoritos" en NomadExplore. Si alguna propuesta de destino turístico te ha llamado la atención y te ha gustado, tendrás la opción de guardarla en tus favoritos para revisarla en cualquier momento posterior.
          </p>
        </div>
      </div>
    </div>
  );
};