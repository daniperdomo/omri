import React from "react";
import Menu from "../components/home/Menu";
import Servicios from "../components/home/Servicios";
import Entrada from "../components/home/Entrada";

const Home = () => {
    return (
        <div>
            {/* Imagen de entrada :) */}
            <Entrada />
            <Menu/>
            <Servicios/>
        </div>
    );
};

export default Home;