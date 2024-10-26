const baseUrl = 'http://localhost:8080/';

export const userService = {
  // Inicio de sesión
  login: async (data) => {
    try {
      const response = await fetch(`${baseUrl}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const result = await response.json();

     
      if (result.token) {
        localStorage.setItem('token', result.token);
      } else {
        throw new Error('Token no recibido');
      }

      return result;
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      throw error;
    }
  },

  // Registro de nuevo usuario
  register: async (data) => {
    try {
      const response = await fetch(`${baseUrl}api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  },

  // Obtener información del dashboard (usuario)
  getDashboard: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${baseUrl}api/auth/dashboard`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar el dashboard');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al cargar el dashboard:', error);
      throw error;
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
  },
};
