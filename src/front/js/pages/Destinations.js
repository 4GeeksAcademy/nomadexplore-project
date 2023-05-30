import React from "react";
import "./Destinations.css"


export const Destinations = () => {


  return (
    <div className="destinations-container">
      <div className="quiz-container">
        <h1 className="title-destinations">THIS OR THAT</h1>
        <div className="subtitle-destinations">
          <h5 className="text1">¿What do you prefer?</h5>
        </div>
        <p className="text2"> Choose your favorite and know your ideal destination</p>
        <div className="image-container">
          <img src="https://media.istockphoto.com/id/517133347/es/foto/shanghai-al-atardecer.jpg?s=612x612&w=0&k=20&c=bbwrRz5_LP-N7j7YbyWq45HYW9eSWd56SBZNBNiplRk=" alt="Imagen 1" className="image" />
          <img src="https://media.istockphoto.com/id/967041448/es/foto/elegante-mujer-coreana-en-el-centro-de-la-ciudad-de-se%C3%BAl.jpg?s=612x612&w=0&k=20&c=QouPeq0W1cQL3a4PEsIAddaJseiDz54GVMmStGvCsOA=" alt="Imagen 2" className="image" />
        </div>
      </div>
    </div>
  );
};