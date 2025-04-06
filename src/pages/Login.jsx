import React, { useState } from "react";
import Navbar from "../components/Navbar";
import imagenlogin from "../img/logou.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

import "./login.css";

const Login = () => {
  const [loggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit } = useForm()
  

  return (
    <>
      <Navbar loggedIn={loggedIn} />

      <div className="login-page">
        <div className="login-container">
          <img src={imagenlogin} alt="Logo" className="login-logo" />
          <h2 className="login-title">Iniciar Sesión</h2>

          <form >
            <label className="login-label">Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              className="login-input"
              placeholder="ejemplo@correo.com"
              required
            />

            <label className="login-label">Contraseña:</label>
            <input
              type="password"
              value={password}
              className="login-input"
              required
            />

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