import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./BaseUrl";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState("");
  const [message, setMessage] = useState("");

  const Navigate = useNavigate();

const sendOtp = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!email) {
    newErrors.email = "Email is required";
    setErrors(newErrors);
    return;
  }

  setErrors({});

  try {
    setLoad("Sending OTP...");

    const res = await axios.post(
      `${BASE_URL}/forgot-password`,
      { email }
    );
    console.log("SERVER RESPONSE:", res.data);

    if (res.data.status) {
      localStorage.setItem("resetEmail", email);

      setTimeout(() => {
        Navigate("/verify-otp");
      }, 100);
    } else {
      setErrors({
        email: res.data.message
      });
    }
  } catch (error) {
    console.log(error);

    setErrors({
      email: "Something went wrong"
    });
  } finally {
    setLoad("");
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
          <h1>Forgot Password</h1>
        </div>

        <form onSubmit={sendOtp}>
          <div className="form-wrapper mx-3">
            <div className="form_group text-wrapper">
  <input
    type="email"
    className="userIcon"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);

      if (errors.email) {
        setErrors({});
      }
    }}
  />

  {errors.email && (
    <span
      style={{ paddingLeft: "17px" }}
      className="text-danger"
    >
      {errors.email}
    </span>
  )}
</div>

            <div className="text-center mt-3">
              <button className="btn btn-submit">Send OTP</button>

              <br />
              <span style={{ color: "red" }}>{message}</span>
              <span style={{ color: "red" }}>{load}</span>
            </div>
          </div>
        </form>
        
      </div>
    </>
  );
};

export default ForgotPassword;
