import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Investigaciones = () => {
  // Estado para manejar el texto ingresado en la barra de búsqueda.
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para saber qué categoría está seleccionada (por defecto, ninguna).
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Hook de navegación para redirigir a la página de detalles de la investigación.
  const navigate = useNavigate();

  // Lista de investigaciones con sus respectivas categorías y detalles.
  const investigaciones = [
    {
      id: 1,
      titulo: "Avances en IA",
      categoria: "Tecnología",
      descripcion: "Exploramos los avances más recientes en inteligencia artificial.",
      autor: "Dr. Juan Pérez",
      fecha: "10 de abril de 2024",
      documento: "/docs/ia.pdf",
      enlace: "https://ejemplo.com/ia",
    },
    {
      id: 2,
      titulo: "Descubrimientos médicos",
      categoria: "Medicina",
      descripcion: "Nuevas técnicas médicas revolucionarias en el tratamiento del cáncer.",
      autor: "Dra. Ana Gómez",
      fecha: "15 de mayo de 2024",
      documento: "/docs/medicina.pdf",
      enlace: "https://ejemplo.com/medicina",
    },
    {
      id: 3,
      titulo: "Evolución de la historia",
      categoria: "Historia",
      descripcion: "Un análisis de cómo los eventos han dado forma al mundo moderno.",
      autor: "Prof. Carlos López",
      fecha: "20 de junio de 2024",
      documento: "/docs/historia.pdf",
      enlace: "https://ejemplo.com/historia",
    },
  ];

  // Contar cuántas investigaciones hay en cada categoría.
  const conteoCategorias = investigaciones.reduce((acc, inv) => {
    acc[inv.categoria] = (acc[inv.categoria] || 0) + 1;
    return acc;
  }, {});

  // Extraer solo los nombres de las categorías sin repetir.
  const categorias = Object.keys(conteoCategorias);

  return (
    <div>
      {/* Navbar en la parte superior */}
      <Navbar />

      <div className="contenedor-investigaciones">
        {/* Sidebar de categorías */}
        <aside className="sidebar">
          <h3>Categorías</h3>
          <ul>
            {categorias.map((cat, index) => (
              <li
                key={index}
                onClick={() =>
                  setCategoriaSeleccionada(categoriaSeleccionada === cat ? null : cat)
                }
                style={{ fontWeight: categoriaSeleccionada === cat ? "bold" : "normal" }}
              >
                {`> ${cat} (${conteoCategorias[cat]})`}
              </li>
            ))}
          </ul>
        </aside>

        {/* Sección principal con barra de búsqueda y lista de investigaciones */}
        <main className="contenido">
          <input
            type="text"
            placeholder="Buscar investigación..."
            className="barra-busqueda"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Lista de investigaciones filtradas */}
          <div className="lista-investigaciones">
            {investigaciones
              .filter(
                (inv) =>
                  (categoriaSeleccionada === null || inv.categoria === categoriaSeleccionada) &&
                  inv.titulo.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((inv) => (
                <div className="card-investigacion" key={inv.id}>
                  <h4>{inv.titulo}</h4>
                  <p>{inv.categoria}</p>
                  {/* Redirige a la página de detalles de la investigación */}
                  <button onClick={() => navigate(`/investigaciones/${inv.id}`)}>📖 Ver Detalles</button>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Investigaciones;

