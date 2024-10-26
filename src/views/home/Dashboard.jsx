import React, { useState, useEffect } from "react";
import { userService } from '../../services/userService';

export const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const dashboardData = await userService.getDashboard();
        setUsername(dashboardData.userLogin.username);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setError('No se pudo cargar la información del usuario.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []);


  if (loading) {
    return <h2 className='text-center mt-5'>Cargando...</h2>;
  }


  if (error) {
    return <h2 className='text-center mt-5'>{error}</h2>;
  }

  return (
    <h2 className='text-center mt-5'>Bienvenido, {username}!</h2>
  );
}
