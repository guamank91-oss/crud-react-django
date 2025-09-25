import { useState } from "react";
import { Modal } from "bootstrap";
import ContactModal from "./ContactModal";
import useContacts from "../hooks/useContacts";

const Contacts = () => {
  const { contacts, loading, error, eliminarContacto, actualizarContacto } =
    useContacts();
  const [selectedContact, setSelectedContact] = useState(null);

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

  if (loading) return <p className="text-center">Cargando contactos...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      <section className="list-contacts">
        <h2 className="text-center fw-bold border-bottom mb-4 mt-5 p-2 text-success">
          📋 Lista de Contactos <span className="float-end">({contacts.length})</span>
        </h2>

        {contacts.length === 0 ? (
          <p className="text-center fw-bold text-muted">No hay contactos disponibles</p>
        ) : (
          <div className="row g-4">
            {contacts.map((contact) => (
              <div className="col-md-6 col-lg-4" key={contact.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <img
                      src={
                        contact.foto_contacto
                          ? `http://127.0.0.1:8000${contact.foto_contacto}`
                          : "http://localhost:5174/avatar.png"
                      }
                      alt={contact.nombre}
                      className="rounded-circle mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="card-title fw-bold mb-1">{contact.nombre}</h5>
                    <p className="card-text text-muted mb-1">{contact.profesion}</p>
                    <p className="card-text mb-0">
                      <strong>Edad:</strong> {contact.edad} años
                    </p>
                    <p className="card-text mb-3">
                      <strong>Sexo:</strong> {contact.sexo}
                    </p>

                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => abrirModalEditar(contact)}
                      >
                        <i className="bi bi-pencil-square me-1"></i> Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarContacto(contact.id)}
                      >
                        <i className="bi bi-trash3 me-1"></i> Borrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal para Editar Contacto */}
      <ContactModal
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        handleUpdateContact={handleUpdateContact}
        modalId="editModal"
      />
    </>
  );
};

export default Contacts;
