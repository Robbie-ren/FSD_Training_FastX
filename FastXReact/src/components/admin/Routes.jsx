import axios from "axios"
import "../../assets/styles/admin/Routes.css"
import { useEffect, useState } from "react"

const RoutesPage = () => {

    const getApi = "http://localhost:8080/api/route/searchRoutes"
    const deleteApi = "http://localhost:8080/api/route/soft-delete"
    const postApi = "http://localhost:8080/api/route/add"
    const [routes, setRoutes] = useState([])
    const [size, setSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [array, setArray] = useState([])
    let count = 0

    const [search, setSearch] = useState("")
    const [keyword, setKeyword] = useState()
    const [deleteMsg, setdeleteMsg] = useState()

    const [sourceCity, setSourceCity] = useState()
    const [destinationCity, setDestinationCity] = useState()
    const [distanceInKm, setDistanceInKm] = useState()
    const [errMsg, setErrMsg] = useState()
    const [errMsgSource, setErrMsgSource] = useState()
    const [errMsgDestination, setErrMsgDestination] = useState()
    const [errMsgDistance, setErrMsgDistance] = useState()
    const [successMsg, setSuccessMsg] = useState()
    const [failureMsg, setFailureMsg] = useState()
    const [tempNum, setTempNum] = useState(0)



    const token = localStorage.getItem("token")

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }


    //set search keyword
    useEffect(() => {
        setKeyword(search)
    }, [search])


    // get API call
    useEffect(() => {
        const fetchRoutes = async () => {

            try {
                const response = await axios.get(
                    getApi + `?page=${currentPage}&size=${size}&keyword=${keyword}`
                )

                setRoutes(response.data.routes)

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
        fetchRoutes()

    }, [currentPage, keyword, tempNum])

    const deleteRoute = async (id) => {
        await axios.delete(deleteApi + `/${id}`, config)
        let tempArray = [...routes].filter(r => r.routeId !== id)
        setRoutes([...tempArray])
        setDeleteMessage("Route is set to inActive.")
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this route?");

        if (confirmDelete) {
            deleteRoute(id);
        }
    };

    const addRoute = async () => {
        setSuccessMsg(undefined)
        setFailureMsg(undefined)
        let body = {
            sourceCity: sourceCity,
            destinationCity: destinationCity,
            distanceInKm: distanceInKm
        }

        try {

            const response = await axios.post(postApi, body, config)
            setSuccessMsg("Route added successfullly")
            setTempNum(tempNum + 1)
            setCurrentPage(0)
            setFailureMsg(undefined)
            setSourceCity("")
            setDestinationCity("")
            setDistanceInKm("")
            setErrMsg(undefined)
            setErrMsgSource(undefined)
            setErrMsgDestination(undefined)
            setErrMsgDistance(undefined)

        }
        catch (err) {
            console.log(err?.response?.data)
            setErrMsg("Failed " + err?.response?.data?.message || "")
            setErrMsgSource(err?.response?.data?.sourceCity)
            setErrMsgDestination(err?.response?.data?.destinationCity)
            setErrMsgDistance(err?.response?.data?.distanceInKm)
            setFailureMsg('Operation Failed, try again')
            setSuccessMsg(undefined)

        }

    }


    return (
        <div className="routes-container">
            {
                deleteMsg !== undefined ?
                    <div className="alert alert-primary mb-4"  >
                        {deleteMsg}
                    </div> :
                    ""
            }

            {/* Header */}
            <div className="routes-header">
                <div>
                    <h2>
                        <i className="bi bi-signpost-2-fill me-2"></i>
                        Manage Routes
                    </h2>

                    <p>
                        Add, search and manage available bus routes
                    </p>
                </div>


                <button className="btn add-route-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Route
                </button>

            </div>

            {/* Modal  */}


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Route</h1>
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
                                <label>Source City</label>
                                {errMsgSource !== undefined || null || "" ? (
                                    <span style={{ color: "red", fontSize: "12px" }}>
                                        {errMsgSource}
                                    </span>
                                ) : (
                                    ""
                                )}
                                <input className="form-control" onChange={(e) => setSourceCity(e.target.value)} required />
                            </div>

                            <div className="mb-4">
                                <label>Destination City</label>
                                {errMsgDestination !== undefined || null || "" ? (
                                    <span style={{ color: "red", fontSize: "12px" }}>
                                        {errMsgDestination}
                                    </span>
                                ) : (
                                    ""
                                )}
                                <input className="form-control" onChange={(e) => setDestinationCity(e.target.value)} required />
                            </div>

                            <div className="mb-4">
                                <label>Distance in Km</label>
                                {errMsgDistance !== undefined || null || 0 ? (
                                    <span style={{ color: "red", fontSize: "12px" }}>
                                        {errMsgDistance}
                                    </span>
                                ) : (
                                    ""
                                )}
                                <input className="form-control" onChange={(e) => setDistanceInKm(e.target.value)} required />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => addRoute()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Search Bar */}

            <div className="search-box">



                <input
                    type="text"
                    className="form-control"
                    placeholder="Search source or destination..."
                    value={search}
                    onChange={(e) => {

                        setSearch(e.target.value)

                        // When searching start from page 1
                        setCurrentPage(0)

                    }}
                />


            </div>


            {/* Table Card */}

            <div className="table-card">

                <div className="table-responsive">

                    <table className="table routes-table align-middle">

                        <thead>

                            <tr>
                                <th>#</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Distance</th>
                                <th className="text-center">
                                    Action
                                </th>
                            </tr>

                        </thead>


                        <tbody>

                            {
                                routes.map((route, index) => (

                                    <tr key={index}>

                                        <td>
                                            {(index + 1) + (currentPage * size)}
                                        </td>


                                        <td>
                                            <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                                            {route.sourceCity}
                                        </td>


                                        <td>
                                            <i className="bi bi-geo-fill text-danger me-2"></i>
                                            {route.destinationCity}
                                        </td>


                                        <td>

                                            <span className="distance-badge">

                                                <i className="bi bi-signpost me-1"></i>

                                                {route.distanceInKm} km

                                            </span>

                                        </td>


                                        <td className="text-center">

                                            <button className="btn delete-btn" onClick={() => handleDelete(route.routeId)}>

                                                <i className="bi bi-trash-fill"></i>

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>


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
    )
}

export default RoutesPage