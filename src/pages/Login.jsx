import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import imagenlogin from "../img/logou.png";
import { useLogin } from "../context/LoginContext"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import "./login.css";

const Login = () => {
  const [loggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, Usuario, isAutheticated, errors: LoginErrors } = useLogin()
  console.log(LoginErrors)
  const navigate = useNavigate()


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
      <Navbar loggedIn={loggedIn} />
      
      <div className="login-page">
        <div className="login-container">
        {
        LoginErrors.map((error, i) => (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-blue-500 dark:text-red-50" role="alert">
            {error}
          </div>
        ))
      }
          <img src={imagenlogin} alt="Logo" className="login-logo" />
          <h2 className="login-title">Iniciar Sesión</h2>

          <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
            <label className="login-label">Correo Electrónico:</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="login-input"
              placeholder="ejemplo@correo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">INGRESE CORREO</p>
            )}

            <label className="login-label">Contraseña:</label>
            <input
              type="password"
              {...register('contrasena', { required: true })}
              className="login-input"
              placeholder="********"
            />
            {errors.contrasena && (
              <p className="text-red-500 text-sm">INGRESE CONTRASEÑA</p>
            )}

            <button type="submit" className="login-button">
              Acceder
            </button>
          </form>
          


          <a href="#" className="login-forgot">¿Recuperar contraseña?</a>
        </div>
      </div>
    </>
  );
};

export default Login;