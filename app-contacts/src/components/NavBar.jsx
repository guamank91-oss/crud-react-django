const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white py-3 shadow-sm">
      <div className="container-fluid justify-content-between align-items-center px-4">
        <h1 className="navbar-brand mb-0 fs-4 text-white fw-bold">
          <i className="bi bi-diagram-3-fill me-2 text-success"></i>
          CRUD FullStack: React + Django + MySQL
        </h1>
        <span className="badge bg-success fs-6 px-3 py-2">
          Proyecto en desarrollo
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
