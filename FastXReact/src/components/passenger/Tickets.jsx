import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/styles/passenger/Tickets.css"

const TicketsPage = ()=>{

const { bookingId } = useParams();
const [tickets, setTickets] = useState([]);

const token = localStorage.getItem("token")

    const config = {
        headers: {
            'Authorization': "Bearer " + token
        }
    }

useEffect(() => {
    const getTickets= async()=>{
    try{
    const resp =  await axios.get(
        `http://localhost:8080/api/tickets/get/${bookingId}`,
        config
    )
    setTickets(resp.data) 
}
    catch(err){
        console.log(err?.response)
    }
}

getTickets()
}, [bookingId]);


return (
        <div className="ticket-page">
            

            <div className="container py-5">

                <h2 className="ticket-page-title">
                    My Tickets
                </h2>


                {tickets.map((ticket) => (

                    <div className="ticket-card" key={ticket.ticketId}>

                        {/* Header */}
                        <div className="ticket-header">

                            <div>
                                <h3>FASTX</h3>
                                <p>Premium Bus Travel</p>
                            </div>

                            <div className="ticket-id">
                                Ticket #{ticket.ticketId}
                            </div>

                        </div>


                        <div className="ticket-divider"></div>


                        {/* Journey */}
                        <div className="row text-center">

                            <div className="col">
                                <h5>From</h5>
                                <h4>{ticket.source}</h4>
                            </div>

                            <div className="col route-arrow">
                                🚌
                            </div>


                            <div className="col">
                                <h5>To</h5>
                                <h4>{ticket.destination}</h4>
                            </div>

                        </div>


                        <div className="ticket-divider"></div>


                        {/* Details */}
                        <div className="row mt-3">

                            <div className="col-md-6">

                                <p>
                                    <strong>Passenger:</strong>
                                    {ticket.passengerName}
                                </p>

                                <p>
                                    <strong>Age:</strong>
                                    {ticket.passengerAge}
                                </p>

                                <p>
                                    <strong>Seat:</strong>
                                    <span className="seat-badge">
                                        {ticket.seatNumber}
                                    </span>
                                </p>

                            </div>


                            <div className="col-md-6">

                                <p>
                                    <strong>Bus:</strong>
                                    {ticket.busName}
                                </p>

                                <p>
                                    <strong>Bus No:</strong>
                                    {ticket.busNumber}
                                </p>

                                <p>
                                    <strong>Date:</strong>
                                    {ticket.journeyDate}
                                </p>

                                <p>
                                    <strong>Departure:</strong>
                                    {ticket.departureTime}
                                </p>

                                <p>
                                    <strong>Arrival:</strong>
                                    {ticket.arrivalTime}
                                </p>

                            </div>

                        </div>


                        <div className="ticket-footer">

                            Booking ID: #{ticket.bookingId}
                            <br />

                            Have a Safe Journey with FastX 🚌

                        </div>


                    </div>

                ))}


            </div>


        </div>
    );
};


export default TicketsPage
