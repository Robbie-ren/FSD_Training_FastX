import React, { useEffect, useState } from "react";
import "../../assets/styles/passenger/PassengerProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OperatorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errMsg, setErrMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState()
  const navigate = useNavigate()

  const [profile, setProfile] = useState({});
  const getApi = "http://localhost:8080/api/user/busOperator/userProfile"
  const updateApi = "http://localhost:8080/api/operator/update"

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

  
  const [form, setForm] = useState({
    companyName:"",
    ownerName:"",
    officeAddress:"",
    email:"",
    phoneNumber:""
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
      alert("Profile updated successfully!")

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
              <label className="fsx-label">Company Name</label>

              {isEditing ? (
                <input
                  className="form-control fsx-input"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm({ ...form, companyName: e.target.value })
                  }
                />
              ) : (
                <p className="fsx-value">{profile.companyName}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="fsx-label">Owner Name</label>
              {isEditing ? (
                <input
                  className="form-control fsx-input"
                  value={form.ownerName}
                  onChange={(e) =>
                    setForm({ ...form, ownerName: e.target.value })
                  }
                />
              ) : (
                <p className="fsx-value">{profile.ownerName}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="fsx-label">Office Adress</label>

              {isEditing ? (
                <input
                  className="form-control fsx-input"
                  value={form.officeAddress}
                  onChange={(e) =>
                    setForm({ ...form, officeAddress: e.target.value })
                  }
                />
              ) : (
                <p className="fsx-value">{profile.officeAddress}</p>
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
              <label className="fsx-label">Phone Number</label>

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

            <div className="mt-4">
              <button className="btn btn-danger" onClick={()=> navigate("/change-password")}>
                Reset Password
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default OperatorProfile;