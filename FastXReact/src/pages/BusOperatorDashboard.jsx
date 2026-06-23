import { Outlet } from "react-router-dom"
import BusOperatorWidget from "../components/busOperator/BusOperatorWidget"
import OperatorNavbar from "../components/Navbar_Operator"

const BusOperatorDashboard = ()=>{
    return(
        <div>
            <OperatorNavbar />
            <Outlet/>
        </div>
    )
}

export default BusOperatorDashboard