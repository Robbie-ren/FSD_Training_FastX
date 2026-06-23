import axios from "axios";
import { useState } from "react";

const PassengerRegister = () => {

  const [name, setName] = useState()
  const [gender, setGender] = useState()
  const [age, setAge] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [file, setFile] = useState();
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const [fileName, setFileName] = useState();

  const postApi = "http://localhost:8080/api/passenger/post";
  const uploadApi = "http://localhost:8080/api/passenger/id/upload";

  const [successMsg, setSuccessMsg] = useState()
  const [errMsg, setErrMsg] = useState()

  const [errMsgName, setErrMsgName] = useState()
  const [errMsgGender, setErrMsgGender] = useState()
  const [errMsgAge, setErrMsgAge] = useState()
  const [errMsgEmail, setErrMsgEmail] = useState()
  const [errMsgPhoneNumber, setErrMsgPhoneNumber] = useState()
  const [errMsgUsername, setErrMsgUsername] = useState()
  const [errMsgPassword, setErrMsgPassword] = useState()
  const [id, setId] = useState();

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setErrMsg(undefined);
  };

  const handleUpload = async (e) => {
    if (!file) {
      setErrMsg("Please select a file");
      return;
    }

    // Create a FormData
    const formData = new FormData();
    formData.append("file", file);
    // Critical part- api wants the file to be set to 'file' key

    try {
      const resp = await axios.post(uploadApi + `/${id}`, formData);
      setSuccessMsg("File uploaded successfully!");
      setFileName(file.name);
      setFile(undefined);
    } catch (err) {
      console.log(err);
       //err.response.data.message
    }
  }

  const passengerRegister = async (e) => {
    e.preventDefault()
    let body = {
      name: name,
      gender: gender,
      age: age,
      email: email,
      phoneNumber: phoneNumber,
      username: username,
      password: password
    }

    try {
      const response = await axios.post(postApi, body)
      setId(response.data.id)
      setSuccessMsg("You are registered successfully!")
      setName("")
      setGender("")
      setAge("")
      setEmail("")
      setPhoneNumber("")
      setUsername("")
      setPassword("")
      setErrMsg(undefined)
      setErrMsgName(undefined)
      setErrMsgGender(undefined)
      setErrMsgAge(undefined)
      setErrMsgEmail(undefined)
      setErrMsgPhoneNumber(undefined)
      setErrMsgUsername(undefined)
      setErrMsgPassword(undefined)
    }
    catch (err) {
      console.log(err.response.data)

      setErrMsg("Register failed " + (err.response?.data?.message || ""));
      setErrMsgName(err.response?.data?.name || undefined);
      setErrMsgGender(err.response?.data?.gender || undefined);
      setErrMsgAge(err.response?.data?.age || undefined);
      setErrMsgEmail(err.response?.data?.email || undefined);
      setErrMsgPhoneNumber(err.response?.data?.phoneNumber || undefined);
      setErrMsgUsername(err.response?.data?.username || undefined);
      setErrMsgPassword(err.response?.data?.password || undefined);
      setSuccessMsg(undefined);
    }
  }

  return (
    <div className="register-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card register-card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-plus-fill register-icon"></i>

                  <h2 className="fw-bold mt-3">Create FastX Account</h2>

                  <p className="text-muted">
                    Join FastX and book your next journey
                  </p>
                </div>

                <form onSubmit={(e) => passengerRegister(e)}>
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
                    <label className="form-label">Full Name</label>
                    {errMsgName !== undefined ? (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {errMsgName}
                      </span>
                    ) : (
                      ""
                    )}

                    <input
                      type="text"
                      className="form-control fastx-input" required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      {errMsgGender !== undefined ? (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {errMsgGender}
                        </span>
                      ) : (
                        ""
                      )}

                      <select
                        className="form-select fastx-input" required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Age</label>
                      {errMsgAge !== undefined ? (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {errMsgAge}
                        </span>
                      ) : (
                        ""
                      )}

                      <input
                        type="number"
                        className="form-control fastx-input" required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    {errMsgEmail !== undefined ? (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {errMsgEmail}
                      </span>
                    ) : (
                      ""
                    )}

                    <input
                      type="email"
                      className="form-control fastx-input" required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    {errMsgPhoneNumber !== undefined ? (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {errMsgPhoneNumber}
                      </span>
                    ) : (
                      ""
                    )}

                    <input
                      type="text"
                      className="form-control fastx-input" required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
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
                      className="form-control fastx-input" required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    {errMsgPassword !== undefined ? (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {errMsgPassword}
                      </span>
                    ) : (
                      ""
                    )}

                    <input
                      type="password"
                      className="form-control fastx-input" required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn fastx-btn w-100">
                    Create Account
                  </button>

                    <br/>
                  <div className="mb-4">
                    <label className="form-label">
                      Government ID Proof
                    </label>

                    <div className="id-upload-box text-center p-4">
                      <i className="bi bi-card-text fs-1"></i>

                      <h6 className="mt-2 fw-bold">
                        Upload ID Proof
                      </h6>

                      <p className="text-muted small">
                        Supported formats: JPG, JPEG, PNG, PDF, DOCX (Max 5 MB)
                      </p>

                      <input type="file" onChange={(e) => handleFileChange(e)} />
                      &nbsp;&nbsp;
                      {errMsg !== undefined ? (
                        <span style={{ color: "red" }}>{errMsg}</span>
                      ) : (
                        ""
                      )}
                      
                      <button onClick={(e) => handleUpload(e)}>Upload ID</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerRegister
