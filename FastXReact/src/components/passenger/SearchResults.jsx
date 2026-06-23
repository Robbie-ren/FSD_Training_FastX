import { useLocation, useNavigate, useParams } from "react-router-dom"
import "../../assets/styles/passenger/SearchResults.css"
import PassengerNavbar from "../Navbar_Passenger"
import FastXNavbar from "../Navbar_Home"
import { useEffect, useState } from "react"
import axios from "axios"

const SearchResults = () => {

  const navigate = useNavigate()
  const { source, destination, dateOfJourney } = useParams()
  const [busType, setBusType] = useState()
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const searchApi =
    "http://localhost:8080/api/schedule/get-schedule/by_source_destination"

  const [schedules, setSchedules] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [size, setSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [array, setArray] = useState([])
  let count = 0

  const getAllSchedules = async () => {
    let body = {
      source: source,
      destination: destination,
      dateOfJourney: dateOfJourney,
      busType: busType,
      startTime: startTime,
      endTime: endTime,
      maxPrice: maxPrice,
    }

    const response = await axios.post(
      searchApi + `?page=${currentPage}&size=${size}`,
      body,
    )

    setSchedules(response.data.schedules)

    setTotalPages(response.data.totalPages)

    setTotalRecords(response.data.totalRecords)

    setArray(
      Array.from({
        length: response.data.totalPages,
      }),
    )
  }

  useEffect(() => {
    getAllSchedules()
  }, [currentPage])

  const applyFilters = async () => {
    setCurrentPage(0)

    await getAllSchedules()
  }

  const clearFilters = async () => {
    setBusType(undefined)
    setStartTime(undefined)
    setEndTime(undefined)
    setMaxPrice(undefined)
    setCurrentPage(0)

    await getAllSchedules()
  }

  const token = localStorage.getItem("token")
  return (
    <div className="search-results-page">
      {token ? <PassengerNavbar /> : <FastXNavbar />}
      <div className="container-fluid py-4">
        <div className="row">
          {/* Filters Sidebar */}

          <div className="col-lg-3 mb-4">
            <div className="filter-card">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Filters</h4>

                <button
                  className="btn btn-link text-warning text-decoration-none p-0"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>

              {/* Bus Type */}

              <div className="mb-4">
                <h5 className="filter-title">Bus Type</h5>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="busType"
                    value="AC_SLEEPER"
                    checked={busType === "AC_SLEEPER"}
                    onChange={(e) => setBusType(e.target.value)}
                  />
                  <label className="form-check-label">A/C Sleeper</label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="busType"
                    value="AC_SEATER"
                    checked={busType === "AC_SEATER"}
                    onChange={(e) => setBusType(e.target.value)}
                  />
                  <label className="form-check-label">A/C Seater</label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="busType"
                    value="NON_AC_SLEEPER"
                    checked={busType === "NON_AC_SLEEPER"}
                    onChange={(e) => setBusType(e.target.value)}
                  />
                  <label className="form-check-label">Non A/C Sleeper</label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="busType"
                    value="NON_AC_SEATER"
                    checked={busType === "NON_AC_SEATER"}
                    onChange={(e) => setBusType(e.target.value)}
                  />
                  <label className="form-check-label">Non A/C Seater</label>
                </div>
              </div>

              {/* Departure Time */}

              <div className="mb-4">
                <h5 className="filter-title">Departure Time</h5>
                <h5>Start time:</h5>
                <input
                  type="time"
                  className="form-control mb-2"
                  value={startTime || ""}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <h5>End time:</h5>
                <input
                  type="time"
                  className="form-control"
                  value={endTime || ""}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              {/* Price */}

              <div>
                <h5 className="filter-title">Max Price</h5>

                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="3000"
                  value={maxPrice || 3000}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />

                <h5 className="text-warning">₹{maxPrice}</h5>
              </div>

              <button
                className="btn btn-warning w-100 mt-4 fw-semibold"
                onClick={(e) => applyFilters(e)}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Results Section */}

          <div className="col-lg-9">
            <div className="results-header">
              <h3 className="fw-bold">
                {source} → {destination}
              </h3>

              <p className="text-muted mb-0">{totalRecords} Buses Found</p>
            </div>

            {schedules.map((schedule, index) => (
              <div key={index} className="schedule-card">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <h4 className="fw-bold mb-2">{schedule.busOperatorName}</h4>

                    <span className="badge bg-warning text-dark">
                      {schedule.busType}
                    </span>
                  </div>


                  {/* <h5 className="fw-bold">
                      {schedule.distance} Km
                    </h5>*/}



                  <div className="col-md-3 text-center">
                    <h5 className="fw-bold">
                      {schedule.departureTime.split(":")[0] +
                        ":" +
                        schedule.departureTime.split(":")[1]}
                    </h5>

                    <small className="text-muted">Departure</small>

                  </div>

                  <div className="col-md-2 text-center">
                    <i className="bi bi-arrow-right fs-3 text-warning"></i>

                    <div className="mt-1">
                      <small className="text-primary fw-semibold">
                        {schedule.distance} Km
                      </small>
                    </div>
                  </div>

                  <div className="col-md-3 text-center">
                    <h5 className="fw-bold">
                      {schedule.arrivalTime.split(":")[0] +
                        ":" +
                        schedule.arrivalTime.split(":")[1]}
                    </h5>

                    <small className="text-muted">Arrival</small>
                  </div>
                </div>

                <hr />

                <div className="row align-items-center">
                  <div className="col-md-4">
                    <span className="text-success fw-semibold">
                      {schedule.availableSeats} Seats Available
                    </span>
                  </div>

                  <div className="col-md-4 text-center">
                    <h3 className="price-tag">₹{schedule.price}</h3>
                  </div>

                  <div className="col-md-4 text-end">
                    <button
                      className="btn btn-warning px-4 fw-semibold"
                      onClick={() => {if(token) {
                        navigate(`/search-response/seats/${schedule.scheduleId}/${schedule.totalSeats}`)}
                        else{
                          localStorage.setItem("pendingSchedule", schedule.scheduleId)
                          localStorage.setItem("totalSeats", schedule.totalSeats)
                          navigate("/login")}
                        }}
                    >
                      View Seats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
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
  )
}

export default SearchResults
