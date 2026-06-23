import axios from "axios";
import { useState } from "react";

const BusOperatorRegister = () => {
  const [companyName, setCompanyName] = useState();
  const [officeAddress, setOfficeAddress] = useState();
  const [ownerName, setOwnerName] = useState();
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState();
  const [username, setUsername] = useState();

  const postApi = "http://localhost:8080/api/operator/add";

  const [successMsg, setSuccessMsg] = useState();
  const [errMsg, setErrMsg] = useState();


  const [errMsgUsername, setErrMsgUsername] = useState();

  const onboardBusOperator = async (e) => {
    e.preventDefault();
    let body = {
      companyName: companyName,
      officeAddress: officeAddress,
      ownerName: ownerName,
      email : email,
      phoneNumber: ownerName,
      username: username,
    };
    const cofig_details = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const response = await axios.post(postApi, body, cofig_details);
      setSuccessMsg("Bus Operator added successfully");
      setCompanyName("");
      setOfficeAddress("");
      setOwnerName("");
      setEmail("");
      setPhoneNumber("");
      setUsername("");
      setErrMsg(undefined);
      setErrMsgUsername(undefined);
    } catch (err) {
      console.log(err.response.data);

      setErrMsg("Register failed " + (err.response?.data?.message || ""));
      setErrMsgUsername(err.response?.data?.username || undefined);
      setSuccessMsg(undefined);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-header bg-dark text-warning">
              <h4 className="mb-0">Bus Operator Registration</h4>
            </div>

            <div className="card-body p-4">
              <form onSubmit={(e) => onboardBusOperator(e)}>
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

                <div className="mb-3">
                  <label className="form-label">Company Name</label>
                  
                  <input
                    type="text"
                    className="form-control"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Office Address</label>

                  

                  <textarea
                    className="form-control"
                    rows="3"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Owner Name</label>
                  
                  <input
                    type="text"
                    className="form-control"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>

                  

                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email ID</label>

                  

                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Username</label>
                  {errMsgUsername !== undefined ? (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errMsgUsername}
                    </span>
                  ) : (
                    ""
                  )}

                  <input
                    type="text"
                    className="form-control"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-warning fw-semibold">
                  Register Operator
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusOperatorRegister;
