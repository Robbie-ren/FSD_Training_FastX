import React, { useEffect, useState } from "react";
import "../../assets/styles/busOperator/ScheduleManagement.css";
import axios from "axios";

const OperatorSchedule = () => {

    const [search, setSearch] = useState("")
    const [keyword, setKeyword] = useState("")



    const [schedules, setSchedules] = useState([])
    const getApi = "http://localhost:8080/api/schedule/getAll"
    const deleteApi = "http://localhost:8080/api/schedule/soft-delete"
    const postApi = "http://localhost:8080/api/schedule/add"

    const [active, setActive] = useState(true)

    const [size, setSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [deleteMsg, setdeleteMsg] = useState()

    const [departureDate, setDepartureDate] = useState()
    const [departureTime, setDepartureTime] = useState()
    const [arrivalTime, setArrivalTime] = useState()
    const [price, setPrice] = useState()
    const [busId, setBusId] = useState()
    const [routeId, setRouteId] = useState()
    const [successMsg, setSuccessMsg] = useState()
    const [failureMsg, setFailureMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem("token")

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    useEffect(() => {
        setKeyword(search)
    }, [search])

    useEffect(() => {
        const fetchSchedules = async () => {

            try {
                const response = await axios.get(
                    getApi + `?page=${currentPage}&size=${size}&keyword=${keyword}&active=${active}`,
                    config
                )

                setSchedules(response.data.schedules)

                setTotalPages(response.data.totalPages)

            }
            catch (error) {

                console.log(error)

            }

        }
        fetchSchedules()

    }, [currentPage, keyword, active])


    const deleteSchedule = async (id) => {
        await axios.delete(deleteApi + `/${id}`, config)
        setDeleteMessage("Schedule is set to inActive.")
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this schedule?");

        if (confirmDelete) {
            deleteSchedule(id);
        }
    }

    const addSchedule = async () => {
        setSuccessMsg(undefined)
        setFailureMsg(undefined)
        let body = {
            departureDate: departureDate,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            price: price,
            busId: busId,
            routeId: routeId
        }

        try {

            const response = await axios.post(postApi, body, config)
            alert("Schedule added successfully");

            setShowModal(false);
            setSuccessMsg("Schedule added successfully")
            setCurrentPage(0)
            setFailureMsg(undefined)
            setDepartureTime("")
            setDepartureDate("")
            setArrivalTime("")
            setPrice(0)
            setBusId(0)
            setRouteId(0)
            setErrMsg(undefined)



        }
        catch (err) {
            console.log(err?.response?.data)
            setErrMsg("Failed " + err?.response?.data?.message || "")
            setFailureMsg('Operation Failed, try again')
            setSuccessMsg(undefined)
            alert("Failed to add schedule");

        }
    }




    return (
        <div className="fsx-schedule-wrapper">
            <div className="container py-5">

                <div className="fsx-schedule-card shadow-lg">

                    {/* Header */}
                    <div className="fsx-schedule-header">
                        <div>
                            <h2>Schedule Management</h2>
                            <p>Manage bus schedules efficiently</p>
                        </div>

                        <button className="btn fsx-btn-gold" onClick={() => setShowModal(true)}>
                            + Add Schedule
                        </button>
                    </div>

                    {/* Modal  */}

                    <div>

                        

                        {/* MODAL */}
                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-box">

                                    <h3>Add Schedule</h3>

                                    <input
                                        type="date"
                                        className="form-control mb-2"
                                        value={departureDate || ""}
                                        onChange={(e) => setDepartureDate(e.target.value)}
                                    />

                                    <input
                                        className="form-control mb-2"
                                        placeholder="Departure Time"
                                        value={departureTime}
                                        onChange={(e) => setDepartureTime(e.target.value)}
                                    />

                                    <input
                                        className="form-control mb-2"
                                        placeholder="Arrival Time"
                                        value={arrivalTime}
                                        onChange={(e) => setArrivalTime(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Bus ID"
                                        value={busId}
                                        onChange={(e) => setBusId(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Route ID"
                                        value={routeId}
                                        onChange={(e) => setRouteId(e.target.value)}
                                    />

                                    <div className="d-flex gap-2 mt-3">
                                        <button className="btn btn-success w-50" onClick={addSchedule}>
                                            Add
                                        </button>

                                        <button className="btn btn-secondary w-50" onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                    {/* Search */}
                    <div className="fsx-search-container mt-3">
                        <div className="input-group fsx-search-bar">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search schedules..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                            />
                        </div>
                    </div> <br />

                    <div className="d-flex gap-3 mb-4" >
                        <button className="btn btn-outline-warning px-4" onClick={() => setActive(false)}>

                            Show Inactive Schedules
                        </button>

                        <button className="btn btn-outline-warning px-4" onClick={() => setActive(true)}>

                            Show Active Schedules
                        </button>
                    </div>

                    {/* Table */}
                    <div className="table-responsive mt-4">
                        <table className="table fsx-table">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Schedule ID</th>
                                    <th>Bus Number</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Departure Date</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Time</th>
                                    <th>Available Seats</th>
                                    <th>Price (₹)</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {schedules.map((s, index) => (
                                    <tr key={index}>
                                        <td>{(index + 1) + (currentPage * size)}</td>
                                        <td>{s.id}</td>
                                        <td>{s.busNumber}</td>
                                        <td>{s.sourceCity}</td>
                                        <td>{s.destinationCity}</td>
                                        <td>{s.departureDate}</td>
                                        <td>{s.departureTime}</td>
                                        <td>{s.arrivalTime}</td>
                                        <td>{s.availableSeats}</td>
                                        <td>₹{s.price}</td>
                                        {s.status ? <td>Active</td> : <td>Inactive</td>}
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}

                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <div className="pagination-container">

                        <button className="btn fsx-btn-outline"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}>
                            Previous
                        </button>

                        <span className="page-number">
                            Page {currentPage + 1} of {totalPages}
                        </span>

                        <button className="btn fsx-btn-gold"
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(currentPage + 1)}>
                            Next
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default OperatorSchedule;