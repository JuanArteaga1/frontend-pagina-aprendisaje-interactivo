import React from "react";
import { useForm } from "react-hook-form";
import imagenlogin from "../img/logou.png"; // Verifica que esta ruta sea correcta

const Login = () => {
  const { register, handleSubmit } = useForm();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
    // Aquí podrías conectar con tu backend
  };

  return (
    // Fondo gris claro, centrado vertical y horizontalmente
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Contenedor principal más ancho y alto */}
      <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
        
        {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={imagenlogin} alt="Logo" className="w-40 md:w-48" />
      </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Iniciar sesión
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Campo de usuario */}
          <input
            type="email"
            placeholder="Nombre de usuario"
            className="w-full border border-gray-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", { required: true })}
          />

          {/* Campo de contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border border-gray-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", { required: true })}
          />

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-lg rounded-lg hover:bg-blue-700 transition-colors"
          >
            Acceder
          </button>
        </form>

        {/* Enlace de contraseña */}
        <div className="text-right mt-3">
          <a href="#" className="text-blue-600 text-sm hover:underline">
            ¿Olvidó su contraseña?
          </a>
        </div>

        {/* Línea divisora */}
        <div className="border-t my-8"></div>

        {/* Login con Google */}
        <button className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          <img
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            alt="Google"
          />
          <span className="text-base">Iniciar sesión con Google</span>
        </button>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-8">
          <span>Español - Internacional (es)</span>
          <button className="text-blue-600 hover:underline">
            Aviso de Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
