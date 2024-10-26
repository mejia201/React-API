import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../services/userService";

export const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const dashboardData = await userService.getDashboard();
        setUsername(dashboardData.userLogin.username); 
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const logout = () => {
    userService.logout();
    setUsername(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          Kodigo API
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
           
            <li className="nav-item">
              <Link className="nav-link" to="/bootcamps">Bootcamps</Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {username ? (
              <>
                <li className="nav-item mt-2 me-3">
                  <span className="navbar-text">
                    {username}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ml-2" onClick={logout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/">
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
