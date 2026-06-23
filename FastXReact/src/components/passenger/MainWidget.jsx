import { Link } from "react-router-dom";
import "../../assets/styles/passenger/MainWidget.css";
import SearchSection from "./SearchSection";
import { color } from "chart.js/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoutes } from "../../store/action/routeAction";
const MainWidget = () => {

  const { routes } = useSelector(state => state.routes)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoutes());
  }, [dispatch]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6 text-white">

              <h1 className="display-4 fw-bold mb-3">
                Book Your Next Journey With FastX
              </h1>

              <p className="lead mb-4" style={{ color: 'white' }}>
                Find buses, compare schedules, choose your seats and travel
                comfortably across cities.
              </p>

              <a href="#search" className="btn btn-warning btn-lg fw-semibold">
                Search Buses
              </a>
            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <i className="bi bi-bus-front-fill hero-bus-icon"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <SearchSection />

      {/* Popular Routes */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Popular Routes</h2>

            <p className="text-muted">Most booked routes by travelers</p>
          </div>

          <div className="row g-4">
            {routes.map((route, index) => (
              <div key={index} className="col-md-4">
                <div className="card route-card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold">
                      {route.source} → {route.destination}
                    </h5>

                    <p className="text-muted">
                      {route.bookingCount} bookings
                    </p>

                    <h4 className="text-warning">
                    Starting from ₹{route.minPrice}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FastX */}
      <section className="why-fastx-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose FastX?</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card feature-card h-100 border-0">
                <div className="card-body text-center p-4">
                  <i className="bi bi-lightning-fill feature-icon"></i>

                  <h5 className="mt-3">Fast Booking</h5>

                  <p>Reserve your seats in seconds.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card feature-card h-100 border-0">
                <div className="card-body text-center p-4">
                  <i className="bi bi-shield-check feature-icon"></i>

                  <h5 className="mt-3">Secure Payments</h5>

                  <p>Safe and reliable payment processing.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card feature-card h-100 border-0">
                <div className="card-body text-center p-4">
                  <i className="bi bi-geo-alt-fill feature-icon"></i>

                  <h5 className="mt-3">Real-Time Availability</h5>

                  <p>View seat availability instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Ready For Your Next Journey?</h2>

          <p className="lead">Book your tickets today with FastX.</p>

          <a href="#search" className="btn btn-dark btn-lg">
            Search Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="fastx-footer py-4 text-center text-white">
        <div className="container">
          <h5 className="fw-bold">FastX</h5>

          <p className="mb-1">Smart Bus Reservation Platform</p>

          <small>© 2026 FastX. All Rights Reserved.</small>
        </div>
      </footer>
    </>
  );
};

export default MainWidget;
