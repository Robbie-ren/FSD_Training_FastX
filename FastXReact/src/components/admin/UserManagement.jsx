import React, { useEffect, useState } from "react";
import "../../assets/styles/admin/UserManagement.css";
import axios from "axios";

const UserManagement = () => {

    const [selectedStatus, setSelectedStatus] = useState("ACTIVE");
    const [search, setSearch] = useState("")
    const [keyword, setKeyword] = useState("")
    const [deleteMsg, setdeleteMsg] = useState()
    const getApi = "http://localhost:8080/api/user/all"
    const disableApi = "http://localhost:8080/api/user/disable"
    const enableApi = "http://localhost:8080/api/user/enable"

    const [successMsg, setSuccessMsg] = useState()
    const [users, setUsers] = useState([])
    const [size, setSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    

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
        const fetchUsers = async () => {

            try {
                const response = await axios.get(
                    getApi + `?page=${currentPage}&size=${size}&status=${selectedStatus}&keyword=${keyword}`,
                    config
                )

                setUsers(response.data.users)

                setTotalPages(response.data.totalPages)

            }
            catch (error) {

                console.log(error)

            }

        }
        fetchUsers()

    }, [currentPage, keyword, selectedStatus])

    const disable = async (id) => {
        try {
            await axios.put(disableApi + `/${id}`,{}, config)
            let tempArray = [...users].filter(u => u.userId !== id)
            setUsers([...tempArray])
            setSuccessMsg("Disable successful")
        }
        catch (err) {
            console.log(err)
        }
    }

    const enable = async (id) => {
        try {
            await axios.put(enableApi + `/${id}`,{}, config)
            let tempArray = [...users].filter(u => u.userId !== id)
            setUsers([...tempArray])
            setSuccessMsg("Enable successful")
        }
        catch (err) {
            console.log(err)
        }
    }

    


    return (
        <div className="fsx-user-wrapper">

            <div className="container py-5">

                <div className="fsx-user-card shadow-lg">

                    {/* Header */}
                    <div className="fsx-user-header">

                        <div>
                            <h2>User Management</h2>
                            <p>
                                Manage passengers and bus operators
                            </p>
                        </div>

                    </div>


                    {/* Filter Buttons */}
                    <div className="status-buttons">

                        <button
                            className={`btn ${selectedStatus === "ACTIVE"
                                ? "fsx-btn-gold"
                                : "fsx-btn-outline"
                                }`}
                            onClick={() =>
                                setSelectedStatus("ACTIVE")
                            }
                        >
                            Active Users
                        </button>


                        <button
                            className={`btn ${selectedStatus === "DISABLED"
                                ? "fsx-btn-gold"
                                : "fsx-btn-outline"
                                }`}
                            onClick={() =>
                                setSelectedStatus("DISABLED")
                            }
                        >
                            Disabled Users
                        </button>

                    </div>
                    <div className="fsx-search-container">

                        <div className="input-group fsx-search-bar">

                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by username..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}

                            />

                        </div>

                    </div>

                    {/* Table */}
                    <div className="table-responsive">

                        <table className="table fsx-table">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User ID</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody>

                                {
                                    users.map((user, index) => (
                                        <tr key={index}>

                                            <td>{(index + 1) + (currentPage * size)}</td>
                                            <td>
                                                {user.userId}
                                            </td>

                                            <td>
                                                {user.username}
                                            </td>

                                            <td>
                                                {user.role}
                                            </td>


                                            <td>

                                                <span className={
                                                    user.status === "ACTIVE"
                                                        ? "status-active"
                                                        : "status-disabled"
                                                }>
                                                    {user.status}
                                                </span>

                                            </td>


                                            <td>

                                                {
                                                    user.status === "ACTIVE" ?
                                                        (
                                                            <button className="btn btn-danger btn-sm"
                                                                onClick={() => disable(user.userId)}>
                                                                Disable
                                                            </button>
                                                        )
                                                        :
                                                        (
                                                            <button className="btn btn-success btn-sm" onClick={() => enable(user.userId)}>
                                                                Enable
                                                            </button>
                                                        )
                                                }

                                            </td>

                                        </tr>
                                    ))
                                }


                            </tbody>


                        </table>


                    </div>


                    {/* Pagination */}

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


export default UserManagement;