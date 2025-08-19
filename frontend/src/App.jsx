import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [abrirRegistro, setAbrirRegistro] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error en registro');
      alert('Registro exitoso!');
      setAbrirRegistro(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en login');
      localStorage.setItem('token', data.token);
      navigate('/principal');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container"> {/* Contenedor adicional */}
      <div className="container">
        <div className={`container-L ${abrirRegistro ? 'active' : ''}`}>
          
          {/* --- Login --- */}
          <form className="container-log" onSubmit={handleLogin}>
            <h1>Login</h1>
            <input 
              name="email"
              placeholder="Correo" 
              type="email" 
              required
              onChange={handleChange}
            />
            <input 
              name="password"
              placeholder="Contraseña" 
              type="password" 
              required
              onChange={handleChange}
            />
            <button type="submit" className="log-btn">Ingresar</button>
          </form>

          {/* --- Panel verde --- */}
          <div className="container-registro">
            {!abrirRegistro ? (
              <>
                <h2>Regístrate</h2>
                <button 
                  className="reg-btn"
                  onClick={() => setAbrirRegistro(true)}
                >
                  Registro
                </button>
              </>
            ) : (
              <>
                <h2>¡Loguéate!</h2>
                <p>¿Ya tienes una Cuenta?</p>
                <button 
                  className="reg-btn"
                  onClick={() => setAbrirRegistro(false)}
                >
                  Volver al Login
                </button>
              </>
            )}
          </div>

          {/* --- Registro --- */}
          <form className="registro-panel" onSubmit={handleRegister}>
            <h2>Registrate</h2>
            <input 
              name="nombre"
              placeholder="Nombre" 
              required 
              onChange={handleChange}
            />
            <input 
              name="email"
              placeholder="Correo" 
              type="email" 
              required
              onChange={handleChange}
            />
            <input 
              name="password"
              placeholder="Contraseña" 
              type="password" 
              required
              onChange={handleChange}
            />
            <button type="submit" className="log-btn">Crear cuenta</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;