import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/styles/passenger/Payment.css";
import PassengerNavbar from "../Navbar_Passenger";

const ProcessBooking = () => {


    const navigate = useNavigate();

    const { bookingId } = useParams()
    const [booking, setBooking] = useState()
    const [errMsgBooking, setErrMsgBooking] = useState()
    const [errMsg, setErrMsg] = useState()
    const [successMsg, setSuccessMsg] = useState()

    const getBookingApi = `http://localhost:8080/api/booking/get-one/${bookingId}`
    const processApi = `http://localhost:8080/api/booking/process-booking/${bookingId}`
    const token = localStorage.getItem("token")

    const config = {
        headers: {
            'Authorization': "Bearer " + token
        }
    }

    useEffect(() => {
        const getBooking = async () => {

            try {
                const resp = await axios.get(getBookingApi, config)
                console.log(resp.data)
                setBooking(resp.data)
            }
            catch (err) {
                console.log(err?.response?.data?.message)
                setErrMsg(err?.response?.data?.message)
            }
        }
        getBooking()
    }, [])
    const processBooking = async (e) => {
        e.preventDefault()
        try {



            await axios.post(processApi,{}, config)
            setSuccessMsg("Booking successful")

            

            navigate("/passenger/bookings")

        } catch (err) {

            console.error(err?.response);
            setErrMsg(err?.response?.data?.message)

            setErrMsg("Booking failed")
        }
    }

    return (
        <div>
            <PassengerNavbar />
            <div className="payment-page">

                <div className="container py-5">

                    <div className="payment-card">

                        <div className="text-center mb-4">
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

                            <h2 className="payment-title">
                                Complete Booking
                            </h2>

                            <p className="payment-subtitle">
                                Confirm your booking and proceed.
                            </p>

                        </div>

                        <div className="booking-summary">

                            <h4 className="summary-heading">
                                Booking Summary
                            </h4>

                            <div className="summary-row">
                                <span>Booking ID</span>
                                <span>{bookingId}</span>
                            </div>

                            <div className="summary-row">
                                <span>Booking Time Stamp</span>
                                <span>{booking?.bookingDate}</span>
                            </div>

                            <div className="summary-row">
                                <span>Bus</span>
                                <span>{booking?.busName}</span>
                            </div>

                            <div className="summary-row">
                                <span>Bus Number</span>
                                <span>{booking?.busNumber}</span>
                            </div>

                            <div className="summary-row">
                                <span>Route</span>
                                <span>
                                    {booking?.source} → {booking?.destination}
                                </span>
                            </div>

                            <div className="summary-row">
                                <span>Journey Date</span>
                                <span>{booking?.journeyDate}</span>
                            </div>

                            <div className="summary-row">
                                <span>Departure Time</span>
                                <span>{booking?.departureTime}</span>
                            </div>

                            <div className="summary-row">
                                <span>Seats</span>
                                <span>{booking?.seatCount}</span>
                            </div>

                            <div className="summary-row">
                                <span>Status</span>
                                <span className="status-badge">
                                    {booking?.bookingStatus}
                                </span>
                            </div>

                            <hr />

                            <div className="summary-row total-row">

                                <span>Total Amount</span>

                                <span>
                                    ₹{booking?.totalAmount}
                                </span>

                            </div>

                        </div>




                        <button
                            className="btn payment-btn"
                            onClick={(e) => processBooking(e)}>
                            Confirm booking

                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProcessBooking