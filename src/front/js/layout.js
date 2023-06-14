import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Selection } from "./pages/selection";
import { Home } from "./pages/home";
import { SignUp } from "./pages/singup";
import { Login } from "./pages/login";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Recomendation } from "./pages/recomendation";
import { RecomendationFav } from "./pages/recomendationFav";
import { ListMyFavs } from "./pages/listMyfavs";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Selection />} path="/" />
                        <Route element={<Selection />} path="/selection" />
                        <Route element={<Recomendation />} path="/reco" />
                        <Route element={<RecomendationFav />} path="/listFavs/:id" />
                        <Route element={<ListMyFavs />} path="/listFavs" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
