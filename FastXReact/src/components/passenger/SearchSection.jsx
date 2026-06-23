import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchSection = () => {
  const navigate = useNavigate()
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [dateOfJourney, setDateOfJourney] = useState("")
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [errMsg, setErrMsg] = useState()
  const [errMsgSource, setErrMsgSource] = useState()
  const [errMsgDestination, setErrMsgDestination] = useState()
  const [errMsgDateOfJourney, setErrMsgDateOfJourney] = useState()

  useEffect(() => {
    const handler = () => {
      setSourceSuggestions([]);
      setDestinationSuggestions([]);
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, []);

  const search = (e) => {
    e.preventDefault()

    let hasError = false

    if (!source) {
      setErrMsgSource("Source is required")
      hasError = true
    } else {
      setErrMsgSource(undefined)
    }

    if (!destination) {
      setErrMsgDestination("Destination is required")
      hasError = true
    } else {
      setErrMsgDestination(undefined)
    }

    if (!dateOfJourney) {
      setErrMsgDateOfJourney("Date of journey is required")
      hasError = true
    } else {
      setErrMsgDateOfJourney(undefined)
    }

    if (source === destination) {
      setErrMsg("Source and destination cannot be the same");
      hasError = true
    } else {
      setErrMsg(undefined)
    }


    if (hasError) return

    navigate(`/search-response/${source}/${destination}/${dateOfJourney}`)
  }

  const fetchCities = async (query, setter) => {
    if (!query || query.length < 2) {
      setter([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/route/search?query=${query}`
      );
      setter(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSourceChange = (e) => {
    const value = e.target.value;
    setSource(value);

    setTimeout(() => {
      fetchCities(value, setSourceSuggestions);
    }, 300);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    setTimeout(() => {
      fetchCities(value, setDestinationSuggestions);
    }, 300);
  };


  return (
    <section id="search" className="search-section">
      <div className="container">
        <div className="card search-card shadow-lg border-0">
          <div className="card-body p-4">
            <h4 className="text-white mb-4">Search Buses</h4>
            {
              errMsg !== undefined ?
                <div className="alert alert-danger mb-4"  >
                  {errMsg}
                </div> : ""
            }

            <div className="row g-3">
              <div className="col-md-4">
                {errMsgSource !== undefined ? (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errMsgSource}
                  </span>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  className="form-control"
                  placeholder="From"
                  value={source}
                  onChange={handleSourceChange}
                />

                {sourceSuggestions.length > 0 && (
                  <ul className="list-group position-absolute z-3">
                    {sourceSuggestions.map((city, i) => (
                      <li
                        key={i}
                        className="list-group-item list-group-item-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSource(city);
                          setSourceSuggestions([]);
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="col-md-4 position-relative">
                {errMsgDestination !== undefined ? (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errMsgDestination}
                  </span>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  className="form-control"
                  placeholder="To"
                  value={destination}
                  onChange={handleDestinationChange}
                />

                {destinationSuggestions.length > 0 && (
                  <ul className="list-group position-absolute z-3">
                    {destinationSuggestions.map((city, i) => (
                      <li
                        key={i}
                        className="list-group-item list-group-item-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDestination(city);
                          setDestinationSuggestions([]);
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="col-md-4 position-relative">
                {errMsgDateOfJourney !== undefined ? (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errMsgDateOfJourney}
                  </span>
                ) : (
                  ""
                )}
                <input
                  type="date"
                  className="form-control"
                  style={{
                    backgroundColor: "white",
                    color: "black"
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDateOfJourney(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  className="btn btn-warning btn-lg px-5 py-2 shadow-sm d-flex align-items-center gap-2"
                  type="button"
                  onClick={(e) => search(e)}
                >
                  <i className="bi bi-search"></i>
                  <span>Search Buses</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchSection
