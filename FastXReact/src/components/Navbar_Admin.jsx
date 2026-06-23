import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fastx-admin-navbar shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fastx-admin-logo" to="/admin">
          <i className="bi bi-bus-front-fill me-2"></i>
          FastX Admin
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/routes">
                Routes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/bookings">
                Bookings
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                Users
              </Link>
            </li>
            <div className="dropdown">
            <button
              className="nav-link"
              data-bs-toggle="dropdown"
            >
              Bus Operators
              
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/admin/bus-operator-register">
                  Register Bus Operator
                </Link>
              </li>

            </ul>
          </div>
          </ul>

          <div className="dropdown">
            <button
              className="btn btn-admin dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle me-2"></i>
              Admin
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/admin/profile">
                  Profile
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
