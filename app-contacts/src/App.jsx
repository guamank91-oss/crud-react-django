// Importar Bootstrap CSS y sus iconos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import NavBar from './components/NavBar';
import Formulario from './components/Formulario';
import Contacts from './components/Contacts';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />

      <div className="container mt-4">
        <div className="row justify-content-center mb-4">
          <div className="col-md-12 d-flex justify-content-center align-items-center gap-3">
            <img src="/img/react.svg" alt="React" width={100} />
            <span>+</span>
            <img src="/img/python.webp" alt="Python" width={100} />
            <span>+</span>
            <img src="/img/django.webp" alt="Django" width={100} />
            <span>+</span>
            <img src="/img/mysql.webp" alt="MySQL" width={80} />
          </div>
        </div>

        <Routes>
          {/* Página principal con el formulario */}
          <Route path="/" element={<Formulario />} />

          {/* Página separada para la lista de contactos */}
          <Route path="/contactos" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
