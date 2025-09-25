import { profesiones } from "../data/profesiones";

const ContactModal = ({
  selectedContact,
  setSelectedContact,
  handleUpdateContact,
  modalId = "editModal",
}) => {
  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-sm">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-pencil-square me-2 text-success"></i>
              Editar Contacto
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          <div className="modal-body px-4 py-3">
            {selectedContact && (
              <form
                onSubmit={handleUpdateContact}
                encType="multipart/form-data"
                className="row g-3"
              >
                {/* Nombre */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedContact.nombre}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        nombre: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Profesión */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Profesión</label>
                  <select
                    className="form-select"
                    value={selectedContact?.profesion || ""}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        profesion: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Seleccione una profesión</option>
                    {profesiones.map((profesion) => (
                      <option key={profesion} value={profesion}>
                        {profesion}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Edad */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Edad: <span className="text-primary">{selectedContact.edad}</span> años
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    value={selectedContact.edad}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        edad: e.target.value,
                      })
                    }
                    min="18"
                    max="60"
                  />
                </div>

                {/* Sexo */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Sexo</label>
                  <select
                    className="form-select"
                    value={selectedContact.sexo}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        sexo: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>

                {/* Foto */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Cambiar Foto</label>
                  <input
                    className="form-control form-control-sm"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        foto_contacto: e.target.files[0],
                      })
                    }
                  />
                </div>

                {/* Vista previa */}
                <div className="col-md-6 text-center">
                  <label className="form-label fw-semibold">Vista previa</label>
                  <img
                    src={
                      selectedContact?.foto_contacto instanceof File
                        ? URL.createObjectURL(selectedContact.foto_contacto)
                        : selectedContact?.foto_contacto
                        ? `http://127.0.0.1:8000${selectedContact.foto_contacto}`
                        : "http://localhost:5174/avatar.png"
                    }
                    alt={selectedContact?.nombre || "Contacto"}
                    className="img-fluid rounded-circle border border-3 border-success"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Botón */}
                <div className="col-12 text-center mt-4">
                  <button type="submit" className="btn btn-success px-4 fw-bold">
                    Guardar cambios &nbsp; <i className="bi bi-check-circle-fill"></i>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
