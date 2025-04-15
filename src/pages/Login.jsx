import React, { useState } from "react";
import Navbar from "../components/Navbar";
import imagenlogin from "../img/logou.png";
import { useNavigate } from "react-router-dom"; 
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // lucide-react para los íconos (instala con: npm install lucide-react)

import "./login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

   // Función que simula validación y redirección por tipo de usuario-, solo es para probar si sirve. 
   const onSubmit = (data) => {
    console.log("Datos enviados:", data);

    const usuariosSimulados = {
      "admin@correo.com": "admin",
      "docente@correo.com": "docente"
    };

    const rol = usuariosSimulados[data.email];

    if (rol === "admin") {
      navigate("/menuadministrador");
    } else if (rol === "docente") {
      navigate("/menudocente");
    } else {
      alert("Correo no reconocido o sin permisos.");
    }
  };


  return (
    <>
      <Navbar />

      <div className="login-page bg-gray-100 min-h-screen flex items-center justify-center px-4">
        <div className="login-card bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
          
          {/* Formulario */}
          <div className="form-section w-full md:w-1/2 p-10 flex flex-col justify-center items-center">
            <img src={imagenlogin} alt="Logo" className="w-32 mb-6" />
            <h2 className="text-2xl font-semibold mb-6">Iniciar Sesión</h2>

            <form onSubmit={handleSubmit(onSubmit)}  className="w-full max-w-sm flex flex-col gap-4">
              <input
                {...register("email")}
                type="email"
                placeholder="Correo electrónico"
                className="border rounded px-4 py-2 w-full"
              />

              <div className="relative w-full">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="border rounded px-4 py-2 w-full pr-10"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Acceder
              </button>

              <a href="#" className="text-sm text-blue-600 hover:underline mt-2">
                ¿Olvidó su contraseña?
              </a>
            </form>
          </div>

          {/* Opciones de ingreso */}
          <div className="bg-blue-100 w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-semibold mb-6">O accede con: </h3>
            <button className="bg-white text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-100 transition">
              Iniciar sesión con Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
