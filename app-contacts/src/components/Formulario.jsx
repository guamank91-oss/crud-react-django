import useContacts from "../hooks/useContacts";
import { profesiones } from "../data/profesiones";
import { Link } from "react-router-dom";

const Formulario = () => {
  const { register, handleSubmit, watch, errors, onSubmit } = useContacts();
  const hablaIngles = watch("habla_ingles", false);

  return (
    <section className="card border-0 shadow-lg p-4 rounded-4 bg-light">
      <h2 className="text-center fw-bold text-success mb-4">
        <i className="bi bi-person-plus-fill me-2"></i> Agregar Contacto
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="row g-4"
      >
        {/* Nombre */}
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label fw-semibold">
            Nombre completo <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control shadow-sm ${errors.nombre ? "is-invalid" : ""}`}
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && (
            <div className="invalid-feedback">{errors.nombre.message}</div>
          )}
        </div>

        {/* Profesión */}
        <div className="col-md-6">
          <label htmlFor="profesion" className="form-label fw-semibold">
            Profesión <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select shadow-sm ${errors.profesion ? "is-invalid" : ""}`}
            {...register("profesion", { required: "Selecciona una profesión" })}
          >
            <option value="">Seleccione una opción</option>
            {profesiones.map((profesion) => (
              <option key={profesion} value={profesion}>
                {profesion}
              </option>
            ))}
          </select>
          {errors.profesion && (
            <div className="invalid-feedback">{errors.profesion.message}</div>
          )}
        </div>

        {/* Sexo */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Sexo <span className="text-danger">*</span></label>
          <div className="d-flex gap-4 mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                {...register("sexo", { required: "Selecciona un sexo" })}
                value="Masculino"
                id="sexoMasculino"
              />
              <label className="form-check-label" htmlFor="sexoMasculino">
                Masculino
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                {...register("sexo")}
                value="Femenino"
                id="sexoFemenino"
              />
              <label className="form-check-label" htmlFor="sexoFemenino">
                Femenino
              </label>
            </div>
          </div>
          {errors.sexo && (
            <small className="text-danger d-block mt-1">{errors.sexo.message}</small>
          )}
        </div>

        {/* Edad */}
        <div className="col-md-6">
          <label htmlFor="edadRange" className="form-label fw-semibold">
            Edad: <span className="text-primary">{watch("edad") || 18}</span> años
          </label>
          <input
            type="range"
            className="form-range"
            {...register("edad")}
            min="18"
            max="60"
          />
        </div>

        {/* Inglés */}
        <div className="col-md-6">
          <label htmlFor="ingles" className="form-label fw-semibold">
            ¿Habla inglés?
          </label>
          <div className="form-check form-switch mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              {...register("habla_ingles")}
              id="hablaIngles"
            />
            <label className="form-check-label" htmlFor="hablaIngles">
              {hablaIngles ? "Sí" : "No"}
            </label>
          </div>
        </div>

        {/* Foto */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Foto del empleado</label>
          <input
            className="form-control form-control-sm shadow-sm"
            type="file"
            {...register("foto_contacto")}
            accept="image/png, image/jpeg"
          />
        </div>

        {/* Botón */}
        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-success px-5 py-2 fw-bold">
            <i className="bi bi-check-circle-fill me-2"></i> Guardar Contacto
            
          </button>
         <div className="d-flex justify-content-end mt-3">
  <button
    type="button"
    className="btn btn-outline-primary fw-bold px-4 py-2 shadow-sm"
    onClick={() => window.open("/contactos", "_blank")}
  >
    Ver Lista de Contactos &nbsp; <i className="bi bi-box-arrow-up-right"></i>
  </button>
</div>
 
        </div>
      </form>
    </section>
  );
};

export default Formulario;
