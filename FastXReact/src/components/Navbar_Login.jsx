import { Link } from "react-router-dom";
import "../assets/styles/FastXNavbar.css";

const LoginNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fastx-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fastx-logo" to="/">
          <i className="bi bi-bus-front-fill me-2"></i>
          FastX
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>

            <Link to="/register" className="btn btn-warning fw-semibold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNavbar;
