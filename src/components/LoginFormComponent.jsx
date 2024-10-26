import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { userService } from '../services/userService';
import '../assets/css/App.css';

export const LoginFormComponent = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmitForm = async (data) => {
        try {
            const result = await userService.login({ username: data.mail, password: data.pass });
            
            if (result.token) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Inicio de sesión exitoso',
                    timer: 1500,
                    showConfirmButton: false,
                });

                navigate("/dashboard");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Credenciales inválidas',
            });
        }
    };

    return (
      <div className="login-container">
        <div className="container">
          <div className="row justify-content-center">
          <h1 className="text-center mb-4 text-white">Login</h1>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="text"
                        id="email"
                        placeholder="Example: mail@mail.com"
                        className="form-control"
                        {...register('mail')}
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
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <Link to="/register" className="text-dark text-decoration-none">¿No tienes una cuenta? Regístrate aquí</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
