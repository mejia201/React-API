const baseUrl = 'http://localhost:8080/';

export const bootcampsService = {
  getAllBootcamps: async (token) => {
    const response = await fetch(`${baseUrl}api/auth/bootcamps/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  createBootcamp: async (bootcamp, token) => {
    const response = await fetch(`${baseUrl}api/auth/bootcamps/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bootcamp),
    });
    return response.json();
  },

  updateBootcamp: async (id, bootcamp, token) => {
    const response = await fetch(`${baseUrl}api/auth/bootcamps/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bootcamp),
    });
    return response.json();
  },

  deactivateBootcamp: async (id, token) => {
    const response = await fetch(`${baseUrl}api/auth/bootcamps/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
