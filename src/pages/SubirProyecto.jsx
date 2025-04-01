import React, { useState } from "react";
import "./SubirProyecto.css"; // Importamos el archivo CSS

function SubirProyecto() {
  const [proyecto, setProyecto] = useState({
    nombre: "",
    descripcion: "",
    autores: "",
    fecha: "",
    categoria: "",
  });

  const [archivos, setArchivos] = useState({
    apk: null,
    documentos: null,
    avance: null,
    imagenes: [],
  });

  const handleChange = (e) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, tipo) => {
    const files = e.target.files;
    if (files.length > 0) {
      if (tipo === "imagenes") {
        setArchivos({
          ...archivos,
          imagenes: [...archivos.imagenes, files[0]],
        });
      } else {
        setArchivos({
          ...archivos,
          [tipo]: files[0],
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proyecto.nombre || !proyecto.descripcion || !proyecto.autores || !proyecto.fecha || !proyecto.categoria) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }
    console.log("Proyecto enviado:", proyecto);
    console.log("Archivos subidos:", archivos);
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo-principal">Subir Proyecto</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="grupo-formulario">
            <label>Nombre del proyecto:</label>
            <input
              type="text"
              name="nombre"
              className="input-estilo"
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grupo-formulario">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              className="input-estilo"
              onChange={handleChange}
              required
              rows="4"
            ></textarea>
          </div>
          
          <div className="grupo-formulario">
            <label>Autores:</label>
            <input
              type="text"
              name="autores"
              className="input-estilo"
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grupo-formulario">
            <label>Fecha de realización:</label>
            <input
              type="date"
              name="fecha"
              className="input-estilo"
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grupo-formulario">
            <label>Categoría:</label>
            <select
              name="categoria"
              className="input-estilo"
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="software">Fisica</option>
              <option value="hardware">Cal</option>
              <option value="investigacion">Investigación</option>
            </select>
          </div>
        </div>

        <h3 className="subtitulo">Cargar Archivos</h3>
        <div className="contenedor-archivos">
          <label className="label-archivo">
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "apk")}
            />
            📂 Subir APK
          </label>
          
          <label className="label-archivo">
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "documentos")}
            />
            ⏯️ Podcast
          </label>
          
          <label className="label-archivo">
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "avance")}
            />
            📈 Avance
          </label>
          
          <label className="label-archivo">
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "imagenes")}
            />
            📄 Articulo
          </label>
        </div>

        {archivos.imagenes.length > 0 && (
          <div className="previsualizacion-imagenes">
            <h4 className="subtitulo">Vista previa de imágenes:</h4>
            {archivos.imagenes.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Imagen ${index + 1}`}
              />
            ))}
          </div>
        )}

        <button type="submit" className="boton-enviar">
          Publicar Proyecto
        </button>
      </form>
    </div>
  );
}

export default SubirProyecto;