import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Investigaciones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const navigate = useNavigate();

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

  const conteoCategorias = investigaciones.reduce((acc, inv) => {
    acc[inv.categoria] = (acc[inv.categoria] || 0) + 1;
    return acc;
  }, {});

  const categorias = Object.keys(conteoCategorias);

  return (
    <div>
      <Navbar />

      <div className="flex gap-6 p-6">
        {/* Sidebar de categorías */}
        <aside className="w-64 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Categorías</h3>
          <ul>
            {categorias.map((cat, index) => (
              <li
                key={index}
                onClick={() =>
                  setCategoriaSeleccionada(categoriaSeleccionada === cat ? null : cat)
                }
                className={`p-2 cursor-pointer ${categoriaSeleccionada === cat ? 'font-bold' : 'font-normal'} hover:bg-gray-200`}
              >
                {`> ${cat} (${conteoCategorias[cat]})`}
              </li>
            ))}
          </ul>
        </aside>

        {/* Sección principal con barra de búsqueda y lista de investigaciones */}
        <main className="flex-1">
          <input
            type="text"
            placeholder="Buscar investigación..."
            className="w-1/4 p-2 mb-6 border border-gray-300 rounded-lg text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Lista de investigaciones filtradas */}
          <div className="flex flex-wrap gap-6">
            {investigaciones
              .filter(
                (inv) =>
                  (categoriaSeleccionada === null || inv.categoria === categoriaSeleccionada) &&
                  inv.titulo.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((inv) => (
                <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-white rounded-lg shadow-md" key={inv.id}>
                  <h4 className="font-semibold text-lg">{inv.titulo}</h4>
                  <p className="text-sm text-gray-500">{inv.categoria}</p>
                  <button
                    onClick={() => navigate(`/investigaciones/${inv.id}`)}
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 cursor-pointer"
                  >
                    📖 Ver Detalles
                  </button>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Investigaciones;
