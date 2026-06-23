import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/FastXNavbar.css";
import { useDispatch } from "react-redux";

const PassengerNavbar = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const logout = () => {
    localStorage.clear();

    dispatch({ type: "RESET_BOOKINGS" });

    navigate("/login", { replace: true });
};
  const username = localStorage.getItem('username')

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fastx-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fastx-logo" to="/passenger">
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
              <Link className="nav-link" to="/passenger">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/passenger/bookings">
                My Bookings
              </Link>
            </li>
          </ul>

          <div className="dropdown">
            <button
              className="btn btn-admin dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle me-2"></i>
              {username}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/passenger/profile">
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

export default PassengerNavbar;
