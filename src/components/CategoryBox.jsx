import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function CategoryBox({ title, image, path, className = "" }) {
  return (
    // El Link envuelve TODO y es display:block para cubrir todo el área
    <Link
      to={path}
      className={`block w-full h-full rounded-2xl overflow-hidden ${className}`}
      aria-label={title}
    >
      <div className="w-full h-full bg-white p-6 flex flex-col items-center text-center cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
        {/* Evitamos que la imagen capture eventos con pointer-events-none */}
        <img
          src={image}
          alt={title}
          className="w-24 h-24 object-contain mb-4 pointer-events-none"
        />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </Link>
  );
}

export default CategoryBox;
