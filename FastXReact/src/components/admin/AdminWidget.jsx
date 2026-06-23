import { useEffect, useState } from "react";
import "../../assets/styles/admin/AdminWidget.css";
import BookingByMonthChart from "./BookingByMonthBarChart";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../../store/action/routeAction";
import axios from "axios";

const AdminWidget = () => {

    const statApi = "http://localhost:8080/api/admin/combined-stat"
    const [label, setLabel] = useState([])
    const [data, setData] = useState([])

    const { routes } = useSelector(state => state.routes)

    const token = localStorage.getItem("token")
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoutes())
        const stats = async () => {
            try{
            const response = await axios.get(statApi, config)
            setLabel(response.data.label)
            setData(response.data.count)
            }
            catch(err){
                console.log(err)
            }
        }
        stats()
    }, [dispatch]);

    

    return (
        <div className="admin-dashboard-container">

            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h2 className="dashboard-title">
                        Admin Dashboard
                    </h2>
                    <p className="dashboard-subtitle">
                        Monitor and manage the FastX transportation network.
                    </p>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="row g-4 mb-5">

                <div className="col-lg-3 col-md-6">
                    <div className="stat-card">
                        <i className="bi bi-people-fill stat-icon"></i>
                        <h3>{data.length>0?data[0]:0}</h3>
                        <p>{label.length>0? label[0]:0}</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="stat-card">
                        <i className="bi bi-bus-front-fill stat-icon"></i>
                        <h3>{data.length>1?data[1]:0}</h3>
                        <p>{label.length>1? label[1]:0}</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="stat-card">
                        <i className="bi bi-calendar2-week-fill stat-icon"></i>
                        <h3>{data.length>2?data[2]:0}</h3>
                        <p>{label.length>2? label[2]:0}</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="stat-card">
                        <i className="bi bi-ticket-perforated-fill stat-icon"></i>
                        <h3>{data.length>3?data[3]:0}</h3>
                        <p>{label.length>3? label[3]:0}</p>
                    </div>
                </div>

            </div>

            {/* Charts */}
            <div className="row g-4">

                
                    <div className="chart-card">
                        <div className="chart-header">
                            <h5>Monthly Bookings</h5>
                        </div>

                        <BookingByMonthChart />
                    </div>
                


            </div>

            {/* Popular Routes */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Popular Routes</h2>

                        <p className="text-muted">Most booked routes by travelers</p>
                    </div>

                    <div className="row g-4">
                        {routes.map((route, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card route-card h-100 border-0 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="fw-bold">
                                            {route.source} → {route.destination}
                                        </h5>

                                        <p className="text-muted">
                                            {route.bookingCount} bookings
                                        </p>

                                        <h4 className="text-warning">
                                            Starting from ₹{route.minPrice}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminWidget;