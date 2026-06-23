import { useState } from "react";
import "../assets/styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [errMsg, setErrMsg] = useState()

  const loginApi = "http://localhost:8080/api/auth/login"
  const userDetailsApi = "http://localhost:8080/api/auth/user-details"

  const navigate = useNavigate()

  const onLogin = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Authorization': "Basic " + window.btoa(username + ":" + password)
      }
    }

    try {
      const response = await axios.get(loginApi, config)
      console.log(response.data)

      let token = response.data.token
      localStorage.setItem("token", token)
      localStorage.setItem("username", username)

      const configDetails = {
        headers: {
          'Authorization': "Bearer " + token
        }
      }

      const resp = await axios.get(userDetailsApi, configDetails)
      console.log(resp.data)
      let role = resp.data.role
      switch (role) {
        case 'PASSENGER':
          const scheduleId = localStorage.getItem("pendingSchedule");
          const totalSeats = localStorage.getItem("totalSeats")

          if (scheduleId) {
            navigate(`/search-response/seats/${scheduleId}/${totalSeats}`)
            localStorage.removeItem("pendingSchedule")
            localStorage.removeItem("totalSeats")
          }
          else {
            navigate("/passenger")
          }
          break
        case 'BUS_OPERATOR':
          navigate('/bus-operator')
          break
        case 'ADMIN':
          navigate('/admin')
          break
        default:
          setErrMsg("Invalid credentials")
          break;
      }
    }
    catch (err) {
      setErrMsg("Invalid credentials")
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-5 col-lg-4">
            <div className="card login-card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-bus-front-fill login-icon"></i>

                  <h2 className="fw-bold mt-3">Welcome to FastX</h2>

                  <p className="text-muted">Sign in to continue your journey</p>
                </div>

                <form onSubmit={(e) => onLogin(e)}>
                  {
                    errMsg !== undefined ? <div className="alert alert-primary">
                      {errMsg}
                    </div> : ""
                  }
                  <div className="mb-4">
                    <label className="form-label">Username</label>

                    <input
                      type="text"
                      className="form-control fastx-input"
                      placeholder="Enter username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>

                    <input
                      type="password"
                      className="form-control fastx-input"
                      placeholder="Enter password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn fastx-btn w-100">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
