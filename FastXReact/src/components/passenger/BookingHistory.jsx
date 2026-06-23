import { useEffect, useState } from "react";

import "../../assets/styles/passenger/BookingHistory.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingHistory = () => {



    const token = localStorage.getItem("token")

    const config = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    const [request, setRequest] = useState()
    const [errMsg, setErrMsg] = useState()
    const [bookings, setBookings] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(6)
    const [totalPages, setTotalPages] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const[successMsg, setSuccessMsg] = useState()
    
    
    const getApi = "http://localhost:8080/api/booking/getAllByPassenger"
    useEffect(() => {

        const getBookings = async () => {
            try {
                const response = await axios.get(getApi + `?page=${currentPage}&size=${size}`, config)
                setBookings(response.data.bookings)

                setTotalPages(response.data.totalPages)

                setTotalRecords(response.data.totalRecords)

                
            }
            catch (err) {
                console.log(err?.response)
                setErrMsg(err?.response?.data?.message || "")

            }
        }
        getBookings()
    }, [currentPage])

    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [reason, setReason] = useState("");


    const navigate = useNavigate()



    const openCancelModal = (bookingId) => {
        setSelectedBookingId(bookingId);
        setShowModal(true);
    };

    const requestCancellation = async () => {
        let body = {
            reason: reason
        }
        try {
            const response = await axios.post(
                `http://localhost:8080/api/cancel/cancel-request/${selectedBookingId}`, body,
                config

            );
            setRequest(response.data)

            setSuccessMsg("Cancellation request sent")

            setShowModal(false);
            setReason("");

            

        } catch (err) {
            console.error(err);
            setErrMsg("Failed to send request");
        }
    };


    return (
        <div className="booking-history-page">
            <div className="container py-5">

                <div className="history-header">
                    <h1>My Bookings</h1>
                    <p>View your travel history and booking details</p>
                </div>

                {successMsg !== undefined ? (
                    <div className="alert alert-primary mb-4">{successMsg}</div>
                  ) : (
                    ""
                  )}
                  {errMsg !== undefined ? (
                    <div className="alert alert-danger mb-4">{errMsg}</div>
                  ) : (
                    ""
                  )}

                {bookings.length === 0 ? (
                    <div className="no-booking-card">
                        No bookings found.
                    </div>
                ) : (
                    <div className="row g-4">
                        {
                            bookings.map((b) => (
                                <div className="col-lg-6" key={b.bookingId}>

                                    <div className="card booking-card">

                                        <div className="card-header booking-card-header">
                                            <h5>
                                                {b.source} → {b.destination}
                                            </h5>

                                            <span className="status-badge">
                                                {b.bookingStatus}
                                            </span>
                                        </div>


                                        <div className="card-body">

                                            <div className="detail-row">
                                                <strong>Booking ID:</strong>
                                                <span>{b.bookingId}</span>
                                            </div>

                                            <div className="detail-row">
                                                <strong>Bus:</strong>
                                                <span>
                                                    {b.busName} ({b.busNumber})
                                                </span>
                                            </div>

                                            <div className="detail-row">
                                                <strong>Journey Date:</strong>
                                                <span>{b.journeyDate}</span>
                                            </div>

                                            <div className="detail-row">
                                                <strong>Departure:</strong>
                                                <span>{b.departureTime}</span>
                                            </div>

                                            <div className="detail-row">
                                                <strong>Seats:</strong>
                                                <span>{b.seatCount}</span>
                                            </div>

                                            <hr />
                                            {b.bookingStatus !== "CANCELLED" && (
                                                <button
                                                    className="btn btn-warning me-2"
                                                    disabled={(b.bookingStatus !== "CONFIRMED") && (b.bookingStatus !== "CANCELLATION_REQUESTED") && (b.bookingStatus !== "REQUEST_REJECTED")}
                                                    onClick={() => navigate(`/passenger/tickets/${b.bookingId}`)}
                                                >
                                                    View Tickets
                                                </button>
                                            )}

                                            {b.bookingStatus === "CONFIRMED" && (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => openCancelModal(b.bookingId)}
                                                >
                                                    Request Cancellation
                                                </button>
                                            )}

                                            <div className="amount-row">
                                                ₹{b.totalAmount}
                                            </div>

                                            

                                        </div>

                                    </div>

                                </div>
                            ))
                        }
                    </div>
                )}
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
                {showModal && (
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">Cancel Booking</h5>
                                    <button className="btn-close" onClick={() => setShowModal(false)} />
                                </div>

                                <div className="modal-body">
                                    <textarea
                                        className="form-control"
                                        placeholder="Enter reason..."
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={requestCancellation}
                                    >
                                        Send Request
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default BookingHistory;