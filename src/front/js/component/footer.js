import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
    <footer className="footer py-2 text-center">
        <p>
            2023 <i className="fa-regular fa-copyright" />  {" "}
            <Link to="/" style={{ color: "white" }}><strong>Nomad Explore</strong></Link> All rights reserved
        </p>
    </footer>
);
