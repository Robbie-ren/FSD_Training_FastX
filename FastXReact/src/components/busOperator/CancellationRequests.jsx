import { useEffect, useState } from "react";
import "../../assets/styles/busOperator/CancellationRequests.css";
import axios from "axios";

const CancellationRequests = () => {

    const [requests, setRequests] = useState([])
    const api = "http://localhost:8080/api/cancel/cancel-requests"
    const [successMsg, setSuccessMsg] = useState()

    const token = localStorage.getItem("token")

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    useEffect(() => {
        const getRequests = async () => {
            try {
                const response = await axios.get(api, config)
                setRequests(response.data)
            }
            catch (err) {
                console.log(err)
            }

        }

        getRequests()
    }, [])

    const cancel = async (requestId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/booking/cancelBooking/${requestId}`, {}, config)
            let tempArray = [...requests].filter(r => r.requestId !== requestId)
            setRequests([...tempArray])
            setSuccessMsg("Cancellation approved")
        }
        catch (err) {
            console.log(err)
        }
    }

    const reject = async (requestId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/cancel/reject-request/${requestId}`,{},config)
            let tempArray = [...requests].filter(r => r.requestId !== requestId)
            setRequests([...tempArray])
            setSuccessMsg("Cancellation rejected")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="cancel-page container py-5">

            <div className="cancel-header mb-4">
                <h2 className="fw-bold">
                    Cancellation Requests
                </h2>

                <p>
                    Review passenger cancellation requests and approve refunds.
                </p>
            </div>


            <div className="cancel-card shadow-lg">

                <div className="table-responsive">
                    {
                successMsg !== undefined ?
                    <div className="alert alert-primary mb-4"  >
                        {successMsg}
                    </div> :
                    ""
            }

                    <table className="table align-middle mb-0">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Passenger ID</th>
                                <th>Passenger Name</th>
                                <th>Reason</th>
                                <th>Requested at</th>
                                <th>Route</th>
                                <th>Journey Date</th>
                                <th>Seats</th>
                                <th>Refund Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>


                        <tbody>

                            {
                                requests.map((request, index) => (
                                    <tr key={index}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            {request.passengerId}
                                        </td>

                                        <td>
                                            {request.passengerName}
                                        </td>

                                        <td>
                                            {request.reason}
                                        </td>

                                        <td>
                                            {request.requestedAt}
                                        </td>

                                        <td>
                                            {request.source} → {request.destination}
                                        </td>

                                        <td>
                                            {request.journeyDate}
                                        </td>

                                        <td>
                                            {request.seats}
                                        </td>

                                        <td>
                                            ₹{request.refundAmount}
                                        </td>


                                        <td>
                                            <span className="status-badge">
                                                {request.status}
                                            </span>
                                        </td>


                                        <td>

                                            <button className="btn approve-btn me-2" onClick={() => cancel(request.requestId)}>
                                                <i className="bi bi-check-circle-fill me-1"></i>
                                                Approve
                                            </button>


                                            <button className="btn reject-btn">
                                                <i className="bi bi-x-circle-fill me-1" onClick={()=>reject(request.requestId)}></i>
                                                Reject
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default CancellationRequests