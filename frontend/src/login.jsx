// Importa el hook useState de React para manejar estados dentro del componente
import { useState } from "react";
import { useNavigate} from "react-router-dom";

// Definición del componente principal App
function Login(){

  const navigate = useNavigate();

  const pagePrincipal = () => {
    navigate("/principal");
  };

  // Estado "abrirRegistro" con valor inicial false
  // setAbrirRegistro es la función que actualiza el estado
  const [abrirRegistro, setAbrirRegistro] = useState(false);

  return(
    // Contenedor principal
    <div className="container">
      
      {/* 
        Clase condicional: si abrirRegistro es true, 
        se añade la clase 'active' además de 'container-L'.
        Esto sirve normalmente para activar animaciones o mostrar/ocultar cosas con CSS 
      */}
      <div className={`container-L ${abrirRegistro ? 'active' : ''}`}>

        {/* Sección de Login */}
        <div className="container-log">
          <h1>Login</h1>
          {/* Input para el usuario */}
          <input placeholder="Usuario" required/>
          {/* Input para contraseña */}
          <input placeholder="Contraseña" type="password" required/>
          {/* Botón de ingreso */}
          <button className="log-btn" onClick={pagePrincipal}>Ingresar</button>
        </div>

        {/* Panel lateral de registro/login (texto + botón para cambiar estado) */}
        <div className="container-registro">
          
          {/* Renderizado condicional con operador ternario */}
          {!abrirRegistro ? (
            // Si abrirRegistro es false, muestra opción de registro
            <>
              <h2>Regístrate</h2>
              <p>¿Aun no tienes una Cuenta?</p>
              <button 
                className="reg-btn"
                // Al hacer click cambia el estado a true
                onClick={() => setAbrirRegistro(true)}
              >
                Registro
              </button>
            </>
          ) : (
            // Si abrirRegistro es true, muestra opción de volver al login
            <>
              <h2>¡Loguéate!</h2>
              <p>¿Ya tienes una Cuenta?</p>
              <button 
                className="reg-btn"
                // Al hacer click cambia el estado a false
                onClick={() => setAbrirRegistro(false)}
              >
                Volver al Login
              </button>
            </>
          )}
        </div>

        {/* Panel de registro con inputs para crear cuenta */}
        <div className="registro-panel">
          <h2>Registrate</h2>
          <input placeholder="Nombre" required />
          <input placeholder="Correo" type="email" required />
          <input placeholder="Contraseña" type="password" required />
          <button className="log-btn">Crear cuenta</button>
        </div>
      </div>
    </div>
  )
}

// Exporta el componente para poder usarlo en otro archivo
export default Login;