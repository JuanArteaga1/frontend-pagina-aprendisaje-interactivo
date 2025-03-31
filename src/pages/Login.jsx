import React, { useState } from "react";
import Navbar from "../components/Navbar";
import imagenlogin from "../img/logou.png";
import "./login.css";

const Login = () => {
  const [loggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Nombre Completo:", fullName);
    console.log("Correo:", email);
    console.log("Contraseña:", password);
  };

  return (
    <>
      <Navbar loggedIn={loggedIn} />

      <div className="login-page">
        <div className="login-container">
          {/* Logo */}
          <img src={imagenlogin} alt="Logo" className="login-logo" />

          <h2 className="login-title">Iniciar Sesión</h2>

          {/* Formulario de Inicio de Sesión */}
          <form onSubmit={handleLogin}>

            {/* Correo */}
            <label className="login-label">Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="ejemplo@correo.com"
              required
            />

            {/* Contraseña */}
            <label className="login-label">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />

            <button type="submit" className="login-button" onClick={() => navigate("/menuadministrador")} >Acceder</button>
          </form>

          <a href="#" className="login-forgot">¿Has perdido tu contraseña?</a>
        </div>
      </div>
    </>
  );
};

export default Login;
