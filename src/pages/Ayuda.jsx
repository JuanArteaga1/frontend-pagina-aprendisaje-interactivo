import React from "react";
import Navbar from "../components/Navbar";
import CategoryBox from "../components/CategoryBox";
import { PrevArrow, NextArrow } from "../components/CustomArrows";



const AyudaT = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />

      <section className="flex flex-col items-center px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 text-center">
          Creadores de la Página
        </h1>

        <div className="flex flex-col md:flex-row gap-10 items-center max-w-6xl w-full">
          {/* Imagen */}
          <div className="w-full md:w-1/2">
            <img
              src="/img/grupo.JPG"
              alt="Equipo de Desarrollo"
              className="rounded-3xl shadow-xl w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Texto + Equipo */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Somos un equipo apasionado por la tecnología y el aprendizaje. Nuestro objetivo es crear herramientas interactivas que faciliten el acceso a la información y el conocimiento de forma divertida e intuitiva.
            </p>

            <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
                Equipo de Desarrollo
              </h2>
              <ul className="text-left text-gray-700 space-y-2 pl-4">
                {[
                  'KEVIN ARMANDO RUIZ MUÑOZ',
                  'ESTIVEN REALPE HORMIGA',
                  'JUAN MANUEL ARTEAGA',
                  'DIANA MARCELA SANCHEZ OROZCO',
                  'VALENTINA URBANO BENITEZ',
                ].map((name) => (
                  <li
                    key={name}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    🔹 {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Info Universidad */}
          <div>
            <h4 className="text-2xl font-bold mb-4">Universidad Autónoma</h4>
            <p className="mb-2">Calle 5 No. 3-85 Popayán, Colombia</p>
            <p className="mb-2">PBX: (602) 8222295</p>
            <p className="mb-2">Whatsapp: 320 675 0464</p>
            <p className="mb-4">Código ICFES 2849</p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              {[
                { name: 'Simulaciones', path: '/simulaciones' },
                { name: 'Investigaciones', path: '/investigaciones' },
                { name: 'Podcast', path: '/podcast' },
                { name: 'Quiénes somos', path: '/quienes-somos' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="hover:text-blue-300 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <SocialIcon
                url="https://www.facebook.com/uniautonomadc/"
                bg="bg-blue-600"
                hover="hover:bg-blue-700"
                label="Facebook"
                icon="facebook"
              />
              <SocialIcon
                url="https://x.com/uniautonomadc"
                bg="bg-black"
                hover="hover:bg-gray-800"
                label="X (Twitter)"
                icon="x"
              />
              <SocialIcon
                url="https://www.instagram.com/uniautonomadelcauca/"
                bg="bg-gradient-to-r from-purple-500 to-pink-500"
                hover="hover:from-purple-600 hover:to-pink-600"
                label="Instagram"
                icon="instagram"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Componente auxiliar para iconos sociales
const SocialIcon = ({ url, bg, hover, label, icon }) => {
  const icons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12... (completo aquí)" />
      </svg>
    ),
    x: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251..." />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2..." />
      </svg>
    ),
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center ${hover} transition`}
    >
      <span className="sr-only">{label}</span>
      {icons[icon]}
    </a>
  );
};

export default AyudaT;
