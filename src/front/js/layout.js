import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Selection } from "./pages/selection";
import { AboutUs } from "./pages/AboutUs"
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SignUp } from "./pages/SignUp";
import { Destinations } from "./pages/Destinations";
import { Recomendation } from "./pages/recomendation";
import { Planner } from "./pages/planner";
import { Login } from "./pages/Login";
import { DestinationCard } from "./pages/destinationCard";
import { DestinationSingle } from "./pages/destinationSingle";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Recomendation />} path="/destination" />
                        <Route element={<Selection />} path="/selection" />
                        <Route element={<AboutUs />} path="/aboutus" />
                        <Route element={<Destinations />} path="/destinations" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Planner />} path="/planner" />
                        <Route element={<DestinationSingle />} path="/planner/destination/:id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
