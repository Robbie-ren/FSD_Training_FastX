import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/busOperator/BusOperatorWidget.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRoutes } from "../../store/action/routeAction";
import axios from "axios";

const BusOperatorWidget = () => {
    const navigate = useNavigate()

    const { routes } = useSelector(state => state.routes)

    const statApi = "http://localhost:8080/api/operator/combined-stats"
    const [label, setLabel] = useState([])
    const [data , setData] = useState([])


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoutes());
    }, [dispatch]);

    
    useEffect(()=>{
        //Prepare header
        const config = {
            headers:{
                'Authorization' : "Bearer " + localStorage.getItem('token')
            }
        }
        const getStats = async ()=>{
            try{
                const response = await axios.get(statApi, config)
                setLabel(response.data.label)
                setData(response.data.count)

            }
            catch(err){
                console.log(err?.response)
            }
        }
        getStats()
        }, [])

    return (
        <div className="operator-dashboard container-fluid py-4">

            {/* Welcome Section */}
            <div className="welcome-card mb-4">
                <div>
                    <h2>Welcome Back</h2>
                    <p>Manage your buses, schedules and monitor your business.</p>
                </div>
            </div>


            {/* Stats Section */}
            <div className="row g-4 mb-5">

                <div className="col-md-3">
                    <div className="stat-card">
                        <i className="bi bi-bus-front-fill stat-icon"></i>
                        <h3>{data.length>0?data[0]:0}</h3>
                        <p>{label.length>0? label[0]:0}</p>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="stat-card">
                        <i className="bi bi-calendar2-check-fill stat-icon"></i>
                        <h3>{data.length>1?data[1]:0}</h3>
                        <p>{label.length>1? label[1]:0}</p>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="stat-card">
                        <i className="bi bi-ticket-perforated-fill stat-icon"></i>
                        <h3>{data.length>2?data[2]:0}</h3>
                        <p>{label.length>2? label[2]:0}</p>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="stat-card">
                        <i className="bi bi-currency-rupee stat-icon"></i>
                        <h3>{data.length>3?data[3]:0}</h3>
                        <p>{label.length>3? label[3]:0}</p>
                    </div>
                </div>

            </div>


            {/* Management Cards */}
            <div className="row g-4">

                <div className="col-md-6">
                    <div className="management-card">
                        <div className="icon-box">
                            <i className="bi bi-bus-front"></i>
                        </div>

                        <h3>Bus Management</h3>

                        <p>
                            Add, update and manage all your buses
                            including seat capacity and facilities.
                        </p>
                        <Link to="/bus-operator/manage-buses">
                            <button className="btn btn-warning" >
                                Manage Buses
                            </button>
                        </Link>

                    </div>
                </div>



                <div className="col-md-6">

                    <div className="management-card">

                        <div className="icon-box">
                            <i className="bi bi-clock-history"></i>
                        </div>

                        <h3>Schedule Management</h3>

                        <p>
                            Create and manage routes, timings,
                            prices and availability.
                        </p>
                        <Link to="/bus-operator/schedule">
                        <button className="btn btn-warning">
                            Manage Schedules
                        </button>
                        </Link>

                    </div>

                </div>


            </div>

            {/* Popular Routes */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-dark">Popular Routes</h2>

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
}


export default BusOperatorWidget;