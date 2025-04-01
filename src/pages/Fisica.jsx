import React from "react";
import Navbar from "../components/Navbar";

const projects = [
  { title: "Simulación 1", description: "Descripción breve de la simulación 1.", image: "/img/sim1.png" },
  { title: "Simulación 2", description: "Descripción breve de la simulación 2.", image: "/img/sim2.png" },
  { title: "Simulación 3", description: "Descripción breve de la simulación 3.", image: "/img/sim3.png" },
];

const Fisica = () => {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <h2>Simulaciones de Física</h2>
        <div className="project-list">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fisica;
