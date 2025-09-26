import { useState } from "react";
import { Modal } from "bootstrap";
import ContactModal from "./ContactModal";
import useContacts from "../hooks/useContacts";

const Contacts = () => {
  const { contacts, loading, error, eliminarContacto, actualizarContacto } =
    useContacts();
  const [selectedContact, setSelectedContact] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const abrirModalEditar = (contact) => {
    setSelectedContact(contact);
    const modal = new Modal(document.getElementById("editModal"));
    modal.show();
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    actualizarContacto(selectedContact, () => {
      const modal = Modal.getInstance(document.getElementById("editModal"));
      if (modal) modal.hide();
    });
  };

  const handleEliminarContacto = async (id) => {
    setDeletingId(id);
    try {
      await eliminarContacto(id);
    } finally {
      setDeletingId(null);
    }
  };

  // Función para obtener color según la profesión
  const getProfessionColor = (profesion) => {
    const colors = {
      'Desarrollador': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Diseñador': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Gerente': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'Analista': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'Vendedor': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    };
    return colors[profesion] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  // Función para obtener iniciales del nombre
  const getInitials = (nombre) => {
    return nombre.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-50">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="h5 text-muted">Cargando contactos...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger alert-dismissible fade show mx-3" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <strong>Error:</strong> {error}
      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
    </div>
  );

  return (
    <>
      {/* Header de la sección */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
        <div>
          <h2 className="h3 fw-bold text-dark mb-1">Mis Contactos</h2>
          <p className="text-muted mb-0">
            {contacts.length} {contacts.length === 1 ? 'contacto' : 'contactos'} en total
          </p>
        </div>
        <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
          <i className="bi bi-people-fill me-2"></i>
          Gestión de contactos
        </div>
      </div>

      {/* Lista de contactos */}
      <section className="px-3">
        {contacts.length === 0 ? (
          <div className="text-center py-5">
            <div className="empty-state">
              <i className="bi bi-person-x display-1 text-muted opacity-50"></i>
              <h4 className="h5 text-muted mt-3 mb-2">No hay contactos</h4>
              <p className="text-muted">Comienza agregando tu primer contacto</p>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 row-cols-xxl-4 g-4">
            {contacts.map((contact) => (
              <div className="col" key={contact.id}>
                <div className="card h-100 shadow-sm border-0 transition-all">
                  <div className="card-header bg-transparent border-0 pt-4 pb-0">
                    <div className="d-flex justify-content-center">
                      <div className="position-relative">
                        {contact.foto_contacto ? (
                          <img
                            src={`http://127.0.0.1:8000${contact.foto_contacto}`}
                            alt={contact.nombre}
                            className="rounded-circle shadow"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              border: "3px solid #fff",
                              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                            }}
                          />
                        ) : (
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{
                              width: "80px",
                              height: "80px",
                              background: getProfessionColor(contact.profesion),
                              border: "3px solid #fff",
                              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                              fontSize: "1.5rem"
                            }}
                          >
                            {getInitials(contact.nombre)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-body text-center pt-3 pb-4">
                    <h5 className="card-title fw-bold text-dark mb-2">{contact.nombre}</h5>
                    <span 
                      className="badge mb-3 px-3 py-2"
                      style={{
                        background: getProfessionColor(contact.profesion),
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}
                    >
                      {contact.profesion}
                    </span>
                    
                    <div className="contact-info">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                          <i className="bi bi-calendar3 me-1"></i> Edad
                        </small>
                        <span className="fw-semibold text-dark">{contact.edad} años</span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                          <i className="bi bi-gender-ambiguous me-1"></i> Sexo
                        </small>
                        <span className="fw-semibold text-dark">{contact.sexo}</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center gap-2 mt-4">
                      <button
                        className="btn btn-outline-primary btn-sm px-3 rounded-pill d-flex align-items-center"
                        onClick={() => abrirModalEditar(contact)}
                        disabled={deletingId === contact.id}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm px-3 rounded-pill d-flex align-items-center"
                        onClick={() => handleEliminarContacto(contact.id)}
                        disabled={deletingId === contact.id}
                      >
                        {deletingId === contact.id ? (
                          <>
                            <div className="spinner-border spinner-border-sm me-2" style={{width: '1rem', height: '1rem'}}></div>
                            Eliminando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-trash3 me-2"></i>
                            Eliminar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal de edición */}
      <ContactModal
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        handleUpdateContact={handleUpdateContact}
        modalId="editModal"
      />

      <style jsx>{`
        .transition-all {
          transition: all 0.3s ease;
        }
        .transition-all:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .empty-state {
          max-width: 300px;
          margin: 0 auto;
        }
        .contact-info {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1rem;
        }
      `}</style>
    </>
  );
};

export default Contacts;