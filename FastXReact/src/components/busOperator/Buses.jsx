import { useEffect, useState } from "react";
import "../../assets/styles/busOperator/Buses.css";
import axios from "axios";

const ManageBuses = () => {

    const getApi = "http://localhost:8080/api/bus/getAllByBusOperator"
    const deleteApi = "http://localhost:8080/api/bus/soft-delete"
    const postApi = "http://localhost:8080/api/bus/add"
    const [buses, setBuses] = useState([])
    const [size, setSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [array, setArray] = useState([])
    const [active, setActive] = useState(true)
    let count = 0

    const [successMsg, setSuccessMsg] = useState()
    const [failureMsg, setFailureMsg] = useState()
    const [deleteMsg, setdeleteMsg] = useState()
    const token = localStorage.getItem("token")

    const [busName, setBusName] = useState()
    const [busNumber, setBusNumber] = useState()
    const [busType, setBusType] = useState()
    const [totalSeats, setTotalSeats] = useState(0)
    const [tempNum, setTempNum] = useState(0)
    const [errMsg, setErrMsg] = useState()

    const [types, setTypes] = useState([])
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    // get API call
    useEffect(() => {
        const fetchBuses = async () => {

            try {
                const response = await axios.get(
                    getApi + `?page=${currentPage}&size=${size}&active=${active}`, config
                )

                setBuses(response.data.buses)

                setTotalPages(response.data.totalPages)

                setArray(
                    Array.from({
                        length: response.data.totalPages,
                    }),
                )

            }
            catch (error) {

                console.log(error)

            }

        }
        fetchBuses()

    }, [currentPage, active, tempNum])

    //delete api call
    const deleteBus = async (id) => {
        await axios.delete(deleteApi + `/${id}`, config)
        let tempArray = [...buses].filter(b => b.busId !== id)
        setBuses([...tempArray])
        setDeleteMessage("Bus is set to inActive.")
    }
    const handleDelete = (busId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this bus?");

        if (confirmDelete) {
            deleteBus(busId);
        }
    }

    const getTypes = async () => {
        const response = await axios.get('http://localhost:8080/api/bus/types')
        setTypes(response.data)
        
    }

    //post api call
    const addBus = async () => {
        setSuccessMsg(undefined)
        setFailureMsg(undefined)
        let body = {
            busName: busName,
            busNumber: busNumber,
            busType: busType,
            totalSeats: totalSeats
        }

        try {

            const response = await axios.post(postApi, body, config)
            setSuccessMsg("Bus added successfullly")
            setTempNum(tempNum + 1)
            setCurrentPage(0)
            setFailureMsg(undefined)
            setBusName("")
            setBusNumber("")
            setBusType("")
            setTotalSeats(0)
            setErrMsg(undefined)

        }
        catch (err) {
            console.log(err?.response?.data)
            setErrMsg("Failed " + err?.response?.data?.message || "")
            setFailureMsg('Operation Failed, try again')
            setSuccessMsg(undefined)

        }

    }


    return (
        <div className="manage-buses-container container-fluid py-4">

            {
                deleteMsg !== undefined ?
                    <div className="alert alert-primary mb-4"  >
                        {deleteMsg}
                    </div> :
                    ""
            }

            {/* Header */}
            <div className="page-header">

                <div>
                    <h2>
                        <i className="bi bi-bus-front-fill me-2"></i>
                        Manage Fleet
                    </h2>

                    <p>
                        View, update and maintain all registered buses.
                    </p>
                </div>


                <button className="btn btn-warning fw-semibold" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={getTypes}>
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Bus
                </button>

            </div>

            {/* Modal  */}


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Bus</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                successMsg !== undefined ? <div className="alert alert-primary" >
                                    {successMsg}
                                </div> : ""
                            }
                            {
                                failureMsg !== undefined ? <div className="alert alert-danger" >
                                    {failureMsg}
                                </div> : ""
                            }
                            <div className="mb-4">
                                <label>Bus Name</label>
                                <input className="form-control" onChange={(e) => setBusName(e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label>Bus number</label>

                                <input className="form-control" onChange={(e) => setBusNumber(e.target.value)} />
                            </div>

                            <div className="mt-4 mb-4">
                                <label>Incident Type</label>
                                <select className="form-control" onChange={(e) => setBusType(e.target.value)} >
                                    <option>---select bus type---</option>
                                    {
                                        types.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-4">
                                <label>Total Seats</label>

                                <input className="form-control" onChange={(e) => setTotalSeats(e.target.value)} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => addBus()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Bus Table */}
            <div className="table-card">

                <div className="d-flex gap-3 mb-4" >
                    <button className="btn btn-outline-warning px-4" onClick={() => setActive(false)}>

                        Show Inactive Buses
                    </button>

                    <button className="btn btn-outline-warning px-4" onClick={() => setActive(true)}>

                        Show Active Buses
                    </button>
                </div>

                <div className="table-responsive">

                    <table className="table align-middle bus-table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Bus ID</th>
                                <th>Bus Name</th>
                                <th>Bus Number</th>
                                <th>Bus Type</th>
                                <th>Total Seats</th>
                                <th>Status</th>
                                <th className="text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>


                        <tbody>

                            {
                                buses.map((bus, index) => (

                                    <tr key={index}>
                                        <td>
                                            {(index + 1) + (currentPage * size)}
                                        </td>

                                        <td>
                                            {bus.busId}
                                        </td>
                                        <td>
                                            {bus.busName}
                                        </td>
                                        <td>
                                            <strong>
                                                {bus.busNumber}
                                            </strong>
                                        </td>

                                        <td>
                                            {bus.busType}
                                        </td>

                                        <td>
                                            {bus.totalSeats}
                                        </td>

                                        <td>
                                            {bus.isActive ? "Active" : "Inactive"}
                                        </td>

                                        <td className="text-center">
                                            <button className="action-btn delete-btn" onClick={() => handleDelete(bus.busId)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                    {/* Pagination */}

                    <nav className="mt-4">

                        <ul className="pagination justify-content-center">

                            <li className="page-item">
                                <button
                                    className="page-link"
                                    disabled={currentPage === 0}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </button>
                            </li>
                            {array?.map((_, index) => (
                                <li className="page-item" key={index}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index)}
                                    >
                                        {" "}
                                        {(count = count + 1)}
                                    </button>
                                </li>
                            ))}

                            <li className="page-item">
                                <button
                                    className="page-link"
                                    disabled={currentPage === totalPages - 1}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </li>

                        </ul>

                    </nav>

                </div>

            </div>

        </div>
    );
}


export default ManageBuses;