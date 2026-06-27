import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import md5 from "js-md5";
import { BASE_URL } from "./BaseUrl";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const Navigate = useNavigate();

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    if (!password || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/reset-password`, {
        email,
        password: md5(password),
      });

    //   console.log("Reset Password Response:", res.data);

      if (res.data.status) {
       

        localStorage.removeItem("resetEmail");

        Navigate("/");
      } else {
        setMessage(res.data.message || "Failed to update password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mainRed">
        <div className="text-right">
          <Link to="/" className="text-light">
            Back To Login
          </Link>
        </div>
      </div>

      <div className="form-body">
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <div className="heading">
          <h1>Reset Password</h1>
        </div>

        <form onSubmit={updatePassword}>
          <div className="form-wrapper mx-3">
            <div className="form_group text-wrapper">
              <input
                type="password"
                className="passIcon"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form_group text-wrapper mt-3">
              <input
                type="password"
                className="passIcon"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="text-center mt-3">
              <button className="btn btn-submit">Update Password</button>

              <br />
              <span style={{ color: "red" }}>{message}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
