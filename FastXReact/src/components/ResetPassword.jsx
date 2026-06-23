import React, { useState } from "react";
import "../assets/styles/ResetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const api = "http://localhost:8080/api/user/change-password"
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [successMsg, setSuccessMsg] = useState()
    const navigate = useNavigate()

    const resetPass = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        let body = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }
        try {
            const response = await axios.put(api, body, config)
            setSuccessMsg(response.data)
            alert("Password successfully updated! Please login again")
            localStorage.removeItem("token")

            navigate("/login")

        }
        catch (err) {
            console.log(err)
            alert("Error resetting password! Check if your password is correct and if new password matches confirm password")
        }
    }


    return (
        <div className="fsx-password-wrapper">
            <div className="container">

                <div className="fsx-password-card shadow-lg">

                    <div className="text-center mb-4">

                        <i className="bi bi-shield-lock-fill fsx-password-icon"></i>

                        <h2 className="mt-3">
                            Change Password
                        </h2>

                        <p className="text-muted">
                            Keep your FastX account secure by updating your password
                        </p>

                    </div>


                    <form onSubmit={(e) => resetPass(e)}>

                        <div className="mb-3">

                            <label className="form-label">
                                Current Password
                            </label>

                            <input
                                type="password"
                                name="currentPassword"
                                className="form-control fsx-input"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                className="form-control fsx-input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />

                        </div>


                        <div className="mb-4">

                            <label className="form-label">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control fsx-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                            />

                        </div>


                        <div className="d-flex gap-3">

                            <button
                                type="button"
                                className="btn fsx-btn-outline w-50"
                                onClick={() => navigate("/passenger/profile")}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="btn fsx-btn-gold w-50"
                            >
                                Update Password
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
};

export default ResetPassword;