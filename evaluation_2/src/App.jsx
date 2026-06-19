import { Route, Routes } from "react-router-dom"
import UserList from "./components/UserList"
import AdminDashBoard from "./components/AdminDashboard"
import AddUser from "./components/AddUser"

const App=()=>{
  return(
    <div>
      <Routes>
        <Route path="/" element={<AdminDashBoard />}>
        <Route path="/users" element={<UserList />}></Route>
        <Route path="/add-user" element={<AddUser />}></Route>
        </Route>
        
      </Routes>

    </div>
  )
}

export default App