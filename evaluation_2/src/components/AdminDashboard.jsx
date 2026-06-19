import { NavLink, Outlet } from "react-router-dom"

const AdminDashBoard=()=>{
    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <span className="navbar-brand">Admin Dashboard</span>
                

                <div className="navbar-nav ms-auto">
                    <NavLink to="/" className="nav-link">
                        Dashboard
                    </NavLink>
                    <NavLink to="/users" className="nav-link">
                        User List
                    </NavLink>

                    <NavLink to="/add-user" className="nav-link">
                        Add User
                    </NavLink>

                    <NavLink to="/characters" className="nav-link">
                        Get Characters
                    </NavLink>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}

export default AdminDashBoard