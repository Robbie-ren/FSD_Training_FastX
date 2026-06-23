import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import PageNotFound from "./pages/PageNotFound"
import PassengerDashboard from "./pages/PassengerDashboard"
import BusOperatorDashboard from "./pages/BusOperatorDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import PassengerRegisterPage from "./pages/PassengerRegisterPage"
import SearchResults from "./components/passenger/SearchResults"
import MainWidget from "./components/passenger/MainWidget"
import BusOperatorRegister from "./components/admin/BusOperatorRegister"
import AdminWidget from "./components/admin/adminWidget"
import SeatSelection from "./components/passenger/SeatSelection"
import RoutesPage from "./components/admin/Routes"
import ProcessBooking from "./components/passenger/BookingProcessingPage"
import BookingHistory from "./components/passenger/BookingHistory"
import TicketsPage from "./components/passenger/Tickets"
import BusOperatorWidget from "./components/busOperator/BusOperatorWidget"
import ManageBuses from "./components/busOperator/Buses"
import CancellationRequests from "./components/busOperator/CancellationRequests"
import PassengerProfile from "./components/passenger/PassengerProfile"
import ResetPassword from "./components/ResetPassword"
import UserManagement from "./components/admin/UserManagement"
import OperatorProfile from "./components/busOperator/OperatorProfile"
import OperatorSchedule from "./components/busOperator/ScheduleManagement"
import BookingManagement from "./components/busOperator/BookingManagement"
import Bookings from "./components/admin/Bookings"

const App = ()=>{
  return(
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Auth />}></Route>
        <Route path="/passenger" element={<PassengerDashboard />}>
          <Route index element={<MainWidget />}></Route>
          <Route path="bookings" element={<BookingHistory />}></Route>
          <Route path="tickets/:bookingId" element={<TicketsPage />} />
          <Route path="profile" element={<PassengerProfile />}></Route>
        </Route>
        <Route path="/bus-operator" element={<BusOperatorDashboard />}>
          <Route path="" element={<BusOperatorWidget />}></Route>
          <Route path="manage-buses" element={<ManageBuses />}></Route>
          <Route path="cancel-requests" element={<CancellationRequests/>}></Route>
          <Route path="profile" element={<OperatorProfile />}></Route>
          <Route path="schedule" element={<OperatorSchedule/>}></Route>
          <Route path="bookings" element={<BookingManagement/>}></Route>
        </Route>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="" element={<AdminWidget />}></Route>
          <Route path ="bus-operator-register" element={<BusOperatorRegister />}></Route>
          <Route path="routes" element={<RoutesPage />}></Route>
          <Route path="users" element={<UserManagement />}></Route>
          <Route path="bookings" element={<Bookings />}></Route>
        </Route>
        <Route path="/register" element={<PassengerRegisterPage />}></Route>
        <Route path="/search-response/:source/:destination/:dateOfJourney" element={<SearchResults />}></Route>
        <Route path="/search-response/seats/:scheduleId/:totalSeats" element={<SeatSelection/>}></Route>
        <Route path="/process-booking/:bookingId" element={<ProcessBooking />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/change-password" element={<ResetPassword />}></Route>
        
      </Routes>
    </div>
  )
}

export default App