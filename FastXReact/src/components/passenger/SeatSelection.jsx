import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "../../assets/styles/passenger/SeatSelection.css"
import PassengerNavbar from "../Navbar_Passenger"

const SeatSelection = () => {
    const { scheduleId, totalSeats } = useParams()
    const navigate = useNavigate()

    const [bookedSeats, setBookedSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [passengerDetails, setPassengerDetails] = useState({})
    const [errMsg, setErrMsg] = useState()
    const [successMsg, setSuccessMsg] = useState()

    const bookedSeatsApi = `http://localhost:8080/api/booking/bookedSeats/${scheduleId}`
    const bookingApi = "http://localhost:8080/api/booking/add"


    const token = localStorage.getItem("token")

    const fetchBookedSeats = async () => {
        try {
            const response = await axios.get(bookedSeatsApi)

            setBookedSeats(response.data)
        } catch (error) {
            console.error(error)
            setErrMsg("Failed to load seats")
        }
    }

    useEffect(() => {
        fetchBookedSeats()
    }, [])

    const toggleSeat = (seatNo) => {
        if (bookedSeats.includes(seatNo)) return

        if (selectedSeats.includes(seatNo)) {

            setSelectedSeats(
                selectedSeats.filter((seat) => seat !== seatNo)
            )

            setPassengerDetails(prev => {
                const updated = { ...prev }
                delete updated[seatNo]
                return updated
            })

        } else {
            setSelectedSeats([...selectedSeats, seatNo])
        }
    }

    const handlePassengerChange = (seat, field, value) => {

        setPassengerDetails(prev => ({
            ...prev,
            [seat]: {
                ...prev[seat],
                [field]: value
            }
        }))

    }

    const handleBooking = async () => {
        if (selectedSeats.length === 0) {
            setErrMsg("Please select at least one seat")
            return
        }

        

        const incomplete = selectedSeats.some(
            seat =>
                !passengerDetails[seat]?.passengerName ||
                !passengerDetails[seat]?.passengerAge
        )

        if (incomplete) {
            setErrMsg("Please enter passenger details for all selected seats")
            return
        }
        

        const passengers = selectedSeats.map(seat => ({
            seatNumber: seat,
            passengerName: passengerDetails[seat]?.passengerName,
            passengerAge: passengerDetails[seat]?.passengerAge
        }))

        let body = {
            scheduleId: scheduleId,
            seatNumbers: passengers
        }

        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        try {
            const response = await axios.post(bookingApi, body, config)

            navigate(`/process-booking/${response.data.bookingId}`)
        } catch (error) {
            console.error(error)


            setErrMsg("Passenger unverified. Please upload id proof in profile page")
            navigate("/passenger/profile")
        
            


        }
    }



    return (
        <div className="seat-page">
            <PassengerNavbar />
            <div className="container py-5">
                <div className="seat-selection-card">
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
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Select Your Seats</h2>

                        <p className="text-muted mb-0">Schedule ID: {scheduleId}</p>
                    </div>

                    <div className="seat-legend">
                        <div>
                            <span className="legend available"></span>
                            Available
                        </div>

                        <div>
                            <span className="legend selected"></span>
                            Selected
                        </div>

                        <div>
                            <span className="legend booked"></span>
                            Booked
                        </div>
                    </div>

                    <div className="driver-box">
                        <i className="bi bi-steering-wheel"></i>
                        <span> DRIVER</span>
                    </div>

                    <div className="seat-layout">
                        {Array.from({ length: totalSeats / 4 }, (_, row) => (
                            <div className="seat-row" key={row}>
                                {[1, 2].map((offset) => {
                                    const seatNo = row * 4 + offset

                                    return (
                                        <SeatButton
                                            key={seatNo}
                                            seatNo={seatNo}
                                            bookedSeats={bookedSeats}
                                            selectedSeats={selectedSeats}
                                            toggleSeat={toggleSeat}
                                        />
                                    )
                                })}

                                <div className="seat-aisle"></div>

                                {[3, 4].map((offset) => {
                                    const seatNo = row * 4 + offset

                                    return (
                                        <SeatButton
                                            key={seatNo}
                                            seatNo={seatNo}
                                            bookedSeats={bookedSeats}
                                            selectedSeats={selectedSeats}
                                            toggleSeat={toggleSeat}
                                        />
                                    )
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="booking-summary">
                        <h5>Selected Seats</h5>


                        <p>
                            {selectedSeats.length === 0 ? "None" : selectedSeats.join(", ")}

                        </p>

                        <p>
                            Total Seats:
                            <strong> {selectedSeats.length}</strong>
                        </p>

                        {
                            selectedSeats.map(seat => (
                                <div className="passenger-box" key={seat}>

                                    <h6>
                                        Seat {seat}
                                    </h6>

                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Passenger Name"
                                        value={passengerDetails[seat]?.passengerName || ""}
                                        onChange={(e) =>
                                            handlePassengerChange(
                                                seat,
                                                "passengerName",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Age"
                                        min="1"
                                        max="120"
                                        value={passengerDetails[seat]?.passengerAge || ""}
                                        onChange={(e) =>
                                            handlePassengerChange(
                                                seat,
                                                "passengerAge",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>
                            ))
                        }

                        <button
                            className="btn fastx-book-btn"
                            onClick={() => token ? handleBooking() : navigate("/login")}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SeatButton({ seatNo, bookedSeats, selectedSeats, toggleSeat }) {
    const booked = bookedSeats.includes(seatNo)

    const selected = selectedSeats.includes(seatNo)

    let className = "seat-btn "

    if (booked) {
        className += "seat-booked"
    } else if (selected) {
        className += "seat-selected"
    } else {
        className += "seat-available"
    }

    return (
        <button
            className={className}
            disabled={booked}
            onClick={() => toggleSeat(seatNo)}
        >
            {seatNo}
        </button>
    )
}

export default SeatSelection
