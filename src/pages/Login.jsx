import React, { useState, useEffect } from "react";
import imagenlogin from "../img/logou.png";
import { useLogin } from "../context/LoginContext"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"; // Íconos para el campo de contraseña
import Alerta from "../components/AlertasDocente";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, Usuario, isAutheticated, errors: LoginErrors } = useLogin()
  console.log(LoginErrors)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    if (isAutheticated && Usuario) {
      if (Usuario.Rol === "Docente") {
        navigate("/menudocente");
      } else if (Usuario.Rol === "Administrador") {
        navigate("/menuadministrador");
      }
    }
  }, [isAutheticated, Usuario, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      signin(values)
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  });
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
          {LoginErrors.map((error, i) => (
            <Alerta key={i} tipo="error" mensaje={error.msg} />
          ))}
          

          <div className="flex justify-center mb-6">
            <img src={imagenlogin} alt="Logo" className="h-24" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ejemplo@correo.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">INGRESE CORREO</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('contrasena', { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="**********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.contrasena && (
                <p className="text-red-500 text-sm mt-1">INGRESE CONTRASEÑA</p>
              )}
            </div>


            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors hover:scale-103"
            >
              Acceder
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-blue-600 hover:underline text-sm">¿Olvidó su contraseña?</a>
          </div>

          <hr className="my-6 border-gray-300 opacity-90" />

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Identifíquese usando su cuenta en:</p>
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 hover:scale-104"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;