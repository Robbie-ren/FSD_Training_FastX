import { Outlet } from "react-router-dom"
import PassengerNavbar from "../components/Navbar_Passenger"

const PassengerDashboard = ()=>{
    return(
        <div>
            <PassengerNavbar />
            <Outlet />
        </div>
    )
}

export default PassengerDashboard