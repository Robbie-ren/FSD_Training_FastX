import axios from "axios";
import "../../assets/styles/busOperator/BookingManagement.css";
import { useEffect, useState } from "react";

const Bookings = () => {

    const [search, setSearch] = useState("")
    const [keyword, setKeyword] = useState("")



    const [bookings, setBookings] = useState([])
    const getApi = "http://localhost:8080/api/booking/get-bookings"

    const [size, setSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)


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
        const fetchBookings = async () => {

            try {
                const response = await axios.get(
                    getApi + `?page=${currentPage}&size=${size}&keyword=${keyword}`,
                    config
                )

                setBookings(response.data.bookings)

                setTotalPages(response.data.totalPages)

            }
            catch (error) {

                console.log(error)

            }

        }
        fetchBookings()

    }, [currentPage, keyword])


    return (
        <div className="booking-container">

            {/* Header */}
            <div className="booking-header">
                <div>
                    <h2>Booking Management</h2>
                    <p>View and manage all bookings for your buses</p>
                </div>

            </div>


            {/* Search Card */}
            <div className="search-card">

                <div className="row align-items-center">

                    <div className="col-md-10">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search by passenger, source or destination..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                        />
                    </div>

                </div>

            </div>


            {/* Table Card */}
            <div className="table-card">

                <div className="table-responsive">

                    <table className="table booking-table">

                        <thead>

                            <tr>
                                <th>#</th>
                                <th>Booking ID</th>
                                <th>Passenger</th>
                                <th>Booking Date</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Journey Date</th>
                                <th>Departure Time</th>
                                <th>Bus Name</th>
                                <th>Bus Number</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Seats</th>
                            </tr>

                        </thead>




                        <tbody>
                            {bookings.map((b, index) => (
                                <tr key={index}>
                                    <td>{(index + 1) + (currentPage * size)}</td>
                                    <td>{b.bookingId}</td>
                                    <td>{b.passengerName}</td>
                                    <td>{b.bookingDate}</td>
                                    <td>{b.source}</td>
                                    <td>{b.destination}</td>
                                    <td>{b.journeyDate}</td>
                                    <td>{b.departureTime}</td>
                                    <td>{b.busName}</td>
                                    <td>{b.busNumber}</td>
                                    <td>₹{b.totalAmount}</td>
                                    <td>{b.bookingStatus}</td>
                                    <td>{b.seatCount}</td>
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
    );
}

export default Bookings;