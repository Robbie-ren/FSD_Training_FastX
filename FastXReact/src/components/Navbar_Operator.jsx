import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/OperatorNavbar.css";

const OperatorNavbar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg operator-navbar px-4">

            <div className="container-fluid">

                {/* Logo */}
                <Link className="navbar-brand fw-bold brand-logo" to="/bus-operator">
                    <i className="bi bi-bus-front-fill me-2"></i>
                    FastX Operator
                </Link>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#operatorNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="operatorNav">


                    <ul className="navbar-nav mx-auto">

                        <li className="nav-item">
                            <Link
                                className="nav-link nav-item-link"
                                to="/bus-operator"
                            >
                                Dashboard
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link
                                className="nav-link nav-item-link"
                                to="/bus-operator/manage-buses"
                            >
                                Manage Buses
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link
                                className="nav-link nav-item-link"
                                to="/bus-operator/schedule"
                            >
                                Schedules
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link nav-item-link"
                                to="/bus-operator/bookings"
                            >
                                Bookings
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link nav-item-link"
                                to="/bus-operator/cancel-requests"
                            >
                                Cancellation Requests
                            </Link>
                        </li>

                    </ul>


                    {/* Right side */}
                    <div className="dropdown">

                        <button
                            className="btn profile-btn dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            <i className="bi bi-person-circle me-2"></i>
                            Operator
                        </button>


                        <ul className="dropdown-menu dropdown-menu-end">

                            <li>
                                <Link className="dropdown-item" to="/bus-operator/profile">
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <button className="dropdown-item text-danger"
                                    onClick={() => logout()}>
                                    Logout
                                </button>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default OperatorNavbar;