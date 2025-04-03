import React, { useState } from "react";
import Navbar from "../components/Navbar";
import imagenlogin from "../img/logou.png";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [loggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Lista de usuarios válidos
  const USUARIOS = [
    {
      email: "ana@gmail.com",
      password: "ana123",
      redirectPath: "/menudocente"
    },
    {
      email: "kevin@gmail.com",
      password: "kevin123",
      redirectPath: "/menuadministrador"
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Buscar usuario coincidente
    const usuarioValido = USUARIOS.find(
      (user) => user.email === email && user.password === password
    );

    if (usuarioValido) {
      navigate(usuarioValido.redirectPath);
    } else {
      alert("Credenciales incorrectas. Prueba con:\n\n" +
            "Docente: docente@example.com / docente123\n" +
            "Admin 1: admin@example.com / admin123\n" +
            "Admin 2: otroadmin@example.com / otraclave123");
    }
  };

  return (
    <>
      <Navbar loggedIn={loggedIn} />

      <div className="login-page">
        <div className="login-container">
          <img src={imagenlogin} alt="Logo" className="login-logo" />
          <h2 className="login-title">Iniciar Sesión</h2>

          <form onSubmit={handleLogin}>
            <label className="login-label">Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="ejemplo@correo.com"
              required
            />

            <label className="login-label">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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