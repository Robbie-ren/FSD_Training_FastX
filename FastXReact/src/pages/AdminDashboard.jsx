import { Outlet } from "react-router-dom"
import AdminWidget from "../components/admin/adminWidget"
import BusOperatorRegister from "../components/admin/BusOperatorRegister"
import AdminNavbar from "../components/Navbar_Admin"

const AdminDashboard=()=>{
    return(
        
        <div>
            <AdminNavbar />
            {/*<BusOperatorRegister />*/}
            <Outlet />
        </div>
        
    )
}

export default AdminDashboard