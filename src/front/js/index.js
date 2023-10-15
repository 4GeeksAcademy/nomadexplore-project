//Los archivos de react se usan con extensión .jsx o .tsx si usas typescript
//Y por convención los nombres de los archivos de los componentes inician con mayuscula, igual que ele nombre del componente en si. (a menos que uses NextJs, ahí si van en minusculas)




//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";


//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
