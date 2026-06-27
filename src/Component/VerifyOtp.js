import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./BaseUrl";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const Navigate = useNavigate();

  const verifyOtp = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/verify-otp`, {
        email,
        otp,
      });

      console.log("Verify OTP Response:", res.data);

      if (res.data.status) {
        Navigate("/reset-password");
      } else {
        setMessage(res.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
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
          <h1>Verify OTP</h1>
        </div>

        <form onSubmit={verifyOtp}>
          <div className="form-wrapper mx-3">
            <div className="form_group text-wrapper">
              <input
                type="text"
                className="userIcon"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-submit">
                Verify OTP
              </button>

              <br />
              <span style={{ color: "red" }}>{message}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyOtp;
