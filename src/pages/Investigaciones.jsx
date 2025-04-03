import React, { useState } from "react"; 
import Navbar from "../components/Navbar"; 

const Investigaciones = () => {

  // Estado para manejar el texto ingresado en la barra de búsqueda.
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para saber qué categoría está seleccionada (por defecto, ninguna).
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Lista de investigaciones con sus respectivas categorías.
  const investigaciones = [
    { titulo: "Avances en IA", categoria: "Tecnología" },
    { titulo: "Descubrimientos médicos", categoria: "Medicina" },
    { titulo: "Evolución de la historia", categoria: "Historia" },
    { titulo: "El futuro de la computación", categoria: "Ciencia" },
    { titulo: "Nuevo avance en Física", categoria: "Ciencia" },
  ];

  // Contar cuántas investigaciones hay en cada categoría.
  // `reduce` recorre todas las investigaciones y crea un objeto con el conteo de cada categoría.
  const conteoCategorias = investigaciones.reduce((acc, inv) => {
    acc[inv.categoria] = (acc[inv.categoria] || 0) + 1; // Suma 1 a la categoría correspondiente.
    return acc;
  }, {}); // Se inicializa con un objeto vacío.

  // Extraer solo los nombres de las categorías sin repetir.
  const categorias = Object.keys(conteoCategorias);

  return (
    <div>
      {/* Navbar que se mantiene en la parte superior */}
      <Navbar  />

      <div className="contenedor-investigaciones">
        {/*  Sidebar de categorías */}
        <aside className="sidebar">
          <h3>Categorías</h3>
          <ul>
            {categorias.map((cat, index) => (
              <li
                key={index}
                // Si se hace clic en una categoría, se filtran las investigaciones de esa categoría.
                // Si ya está seleccionada y se vuelve a hacer clic, se restablece a "null" (mostrando todo de nuevo).
                onClick={() =>
                  setCategoriaSeleccionada(categoriaSeleccionada === cat ? null : cat)
                }
                // Si la categoría está seleccionada, se pone en negrita.
                style={{ fontWeight: categoriaSeleccionada === cat ? "bold" : "normal" }}
              >
                {/* Muestra el nombre de la categoría y la cantidad de investigaciones en ella */}
                {`> ${cat} (${conteoCategorias[cat]})`}
              </li>
            ))}
          </ul>
        </aside>

        {/*  Sección principal donde están la barra de búsqueda y las investigaciones */}
        <main className="contenido">
          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar investigación..."
            className="barra-busqueda"
            value={searchTerm}
            // Actualiza el estado cuando el usuario escribe en la barra de búsqueda.
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Lista de investigaciones filtradas */}
          <div className="lista-investigaciones">
            {investigaciones
              // Filtrar las investigaciones según:
              // - Si hay una categoría seleccionada, solo mostrar las de esa categoría.
              // - Si hay un término en la barra de búsqueda, solo mostrar las que coincidan.
              .filter(
                (inv) =>
                  (categoriaSeleccionada === null || inv.categoria === categoriaSeleccionada) &&
                  inv.titulo.toLowerCase().includes(searchTerm.toLowerCase())
              )
              // Mapear las investigaciones filtradas y mostrarlas como tarjetas.
              .map((inv, index) => (
                <div className="card-investigacion" key={index}>
                  <h4>{inv.titulo}</h4>
                  <p>{inv.categoria}</p>
                  {/* Botón para descargar el documento (por ahora inv.archivo está vacío) */}
                  <a href={inv.archivo} download>
                    <button>⬇️ Descargar</button>
                  </a>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Investigaciones;

