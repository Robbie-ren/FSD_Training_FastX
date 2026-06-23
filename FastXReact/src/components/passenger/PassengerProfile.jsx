import React, { useEffect, useState } from "react";
import "../../assets/styles/passenger/PassengerProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PassengerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errMsg, setErrMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState()
  const [successMsgUpload, setSuccessMsgUpload] = useState()
  const [file, setFile] = useState()
  const [fileName, setFileName] = useState()
  const navigate = useNavigate()

  const [profile, setProfile] = useState({});
  const getApi = "http://localhost:8080/api/user/passenger/userProfile"
  const uploadApi = "http://localhost:8080/api/passenger/id/upload"
  const updateApi = "http://localhost:8080/api/passenger/update"

  const config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(getApi, config)
        setProfile(response.data)
      }
      catch (err) {
        console.log(err)
      }
    }

    getProfile()
  }, [])

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
      const resp = await axios.post(uploadApi + `/${profile.passengerId}`, formData);
      setSuccessMsgUpload("File uploaded successfully!");
      setFileName(file.name);
      setFile(undefined);
    } catch (err) {
      console.log(err);
      //err.response.data.message
    }
  }


  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    age: "",
    gender: ""
  });

  const handleEdit = () => {
    setForm(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm(profile);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        updateApi,
        form,
        config
      );

      setProfile(response.data);
      setSuccessMsg("Profile updated successfully");
      setIsEditing(false);
      setErrMsg(undefined);
      

    } catch (err) {
      console.log(err);
      setErrMsg("Failed to update profile");
    }
  }

  useEffect(() => {
    if (profile) {
      setForm(profile);
    }
  }, [profile]);

  const viewId = () => {
    if (!profile.idProofUrl) {
      setErrMsg("No ID uploaded");
      return;
    }

    window.open(
      `http://localhost:5173/files/${profile.idProofUrl}`,
      "_blank"
    );
  };
  return (
    <div className="fsx-profile-wrapper">
      <div className="container py-5">

        {/* Header Card */}
        <div className="fsx-profile-card shadow-lg">

          <div className="fsx-profile-header">
            <div>
              <h2 className="mb-1">Passenger Profile</h2>
              <p className="text-muted mb-0">Manage your FSX account details</p>
            </div>
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

            {!isEditing ? (
              <button className="btn fsx-btn-gold" onClick={handleEdit}>
                Edit Profile
              </button>
            ) : (
              <div className="d-flex gap-2">
                <button className="btn fsx-btn-outline" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn fsx-btn-gold" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <hr className="fsx-divider" />

          {/* Profile Body */}
          <div className="row g-4">

            <div className="col-md-6">
              <label className="fsx-label">Full Name</label>

              {isEditing ? (
                <input
                  className="form-control fsx-input"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              ) : (
                <p className="fsx-value">{profile.name}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="fsx-label">Email</label>
              {isEditing ? (
                <input
                  className="form-control fsx-input"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              ) : (
                <p className="fsx-value">{profile.email}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="fsx-label">Phone</label>

              {isEditing ? (
                <input
                  className="form-control fsx-input"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                />
              ) : (
                <p className="fsx-value">{profile.phoneNumber}</p>
              )}
            </div>


            <div className="col-md-6">
              <label className="fsx-label">Age</label>

              {isEditing ? (
                <input
                  className="form-control fsx-input"
                  value={form.age}
                  onChange={(e) =>
                    setForm({ ...form, age: e.target.value })
                  }
                />
              ) : (
                <p className="fsx-value">{profile.age}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="fsx-label">Gender</label>

              {isEditing ? (
                <input
                  className="form-control fsx-input"
                  value={form.gender}
                  onChange={(e) =>
                    setForm({ ...form, gender: e.target.value })
                  }
                />
              ) : (
                <p className="fsx-value">{profile.gender}</p>
              )}
            </div>

            <div className="mt-4">
              <button className="btn btn-danger" onClick={() => navigate("/change-password")}>
                Reset Password
              </button>
            </div>

            <div className="mt-4">
              <h5 className="text-light">Verification</h5>

              {profile.idProofUrl ? (
                <p className="text-success">✔ ID Uploaded</p>
              ) : (
                <p className="text-warning">⚠ No ID uploaded</p>
              )}

              {successMsgUpload != undefined ? <div className="alert alert-primary">
                {successMsgUpload}
              </div> : ""}

              <label className="form-label">
                Government ID Proof
              </label>

              <div className="id-upload-box text-center p-4">
                <i className="bi bi-card-text fs-1"></i>

                <h6 className="mt-2 fw-bold">
                  Upload ID Proof
                </h6>

                <p className="small text-white">
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

            <div className="col-12">
              <button className="btn btn-warning" onClick={viewId}>
                View ID
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PassengerProfile;