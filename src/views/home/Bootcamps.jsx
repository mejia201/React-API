import React, { useState, useEffect } from 'react';
import { bootcampsService } from '../../services/bootcampsService';
import { Modal, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

export const Bootcamps = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBootcamp, setNewBootcamp] = useState({ name: '', description: '', technologies: [], active: true });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBootcampId, setCurrentBootcampId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    loadBootcamps();
  }, []);

  const loadBootcamps = async () => {
    const data = await bootcampsService.getAllBootcamps(token);
    setBootcamps(data);
  };

  const handleCreateBootcamp = async () => {
    try {
      await bootcampsService.createBootcamp(newBootcamp, token);
      loadBootcamps();
      setShowModal(false);
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Bootcamp agregado correctamente',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el bootcamp',
      });
    }
  };

  const handleUpdateBootcamp = async () => {
    try {
      await bootcampsService.updateBootcamp(currentBootcampId, newBootcamp, token);
      loadBootcamps();
      setShowModal(false);
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Bootcamp actualizado correctamente',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el bootcamp',
      });
    }
  };

  const handleDeactivateBootcamp = async (id) => {
    try {
      await bootcampsService.deactivateBootcamp(id, token);
      loadBootcamps();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Bootcamp desactivado correctamente',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo desactivar el bootcamp',
      });
    }
  };

  const openEditModal = (bootcamp) => {
    setNewBootcamp(bootcamp);
    setCurrentBootcampId(bootcamp.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setNewBootcamp({ name: '', description: '', technologies: [], active: true });
    setCurrentBootcampId(null);
    setIsEditing(false);
  };

  // Filtrando los bootcamps activos
  const activeBootcamps = bootcamps.filter(bootcamp => bootcamp.active);

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Tecnologías',
      selector: row => row.technologies.join(', '),
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.active ? 'Activo' : 'Inactivo',
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <div className="btn-group mt-2 mb-2" role="group" aria-label="Bootcamp actions">
          <Button variant="warning" onClick={() => openEditModal(row)}>
            Modificar
          </Button>{' '}
          <Button variant="danger" onClick={() => handleDeactivateBootcamp(row.id)}>
            Desactivar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header className="bg-secondary">
          <h4 className='text-start mt-1 text-white'>Administración de Bootcamps</h4>
        </Card.Header>
        <Card.Body>
          <Button onClick={() => { resetForm(); setShowModal(true); }} variant="primary mt-2">
            <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar Bootcamp
          </Button>

          <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? 'Editar Bootcamp' : 'Agregar Bootcamp'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre del Bootcamp</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={newBootcamp.name}
                    onChange={(e) => setNewBootcamp({ ...newBootcamp, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='mt-2'>Descripción</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={3}
                    value={newBootcamp.description}
                    onChange={(e) => setNewBootcamp({ ...newBootcamp, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='mt-2'>Tecnologías (separadas por comas)</Form.Label>
                  <Form.Control 
                    type="text"
                    value={newBootcamp.technologies.join(', ')}
                    onChange={(e) => setNewBootcamp({ ...newBootcamp, technologies: e.target.value.split(',').map(tech => tech.trim()) })}
                    placeholder="Ej: React, Node.js, Python"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={isEditing ? handleUpdateBootcamp : handleCreateBootcamp}>
                {isEditing ? 'Actualizar Bootcamp' : 'Agregar Bootcamp'}
              </Button>
            </Modal.Footer>
          </Modal>

          <DataTable
            columns={columns}
            data={activeBootcamps}  // Usando solo bootcamps activos
            pagination
            striped
            responsive
            highlightOnHover
            dense
            noHeader
            subHeader
            noDataComponent={<div>No hay bootcamps disponibles para mostrar.</div>} 

          />
        </Card.Body>
      </Card>
    </div>
  );
};
