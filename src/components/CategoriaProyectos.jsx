import React from "react";
import ListaProyectos from "./ListaProyectos";

const CategoriaProyectos = ({ titulo, categoria, proyectos }) => {
    return (
        <ListaProyectos titulo={titulo} proyectos={{ [categoria]: proyectos[categoria] }} />
    );
};

export default CategoriaProyectos;
