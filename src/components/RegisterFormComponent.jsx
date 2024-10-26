import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { userService } from '../services/userService';
import '../assets/css/App.css';

export const RegisterFormComponent = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmitForm = async (data) => {
        try {
          
            const result = await userService.register({ username: data.user, password: data.pass });
            
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: result.message || 'Registro exitoso',
                timer: 1500,
                showConfirmButton: false,
            });

           
            navigate("/");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al registrar usuario',
            });
        }
    };

    return (
      <div className="login-container">
        <div className="container">
          <div className="row justify-content-center">
            <h1 className="text-center mb-4 text-white">Register</h1>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="mb-3">
                      <label htmlFor="user" className="form-label">User</label>
                      <input
                        type="text"
                        id="user"
                        placeholder="Pablo"
                        className="form-control"
                        {...register('user')}
                      />
                    </div>
      
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="********"
                        className="form-control"
                        {...register('pass')}
                      />
                    </div>
      
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Registrar</button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <Link to="/" className="text-dark text-decoration-none">¿Ya tienes una cuenta? Inicia sesión aquí</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
