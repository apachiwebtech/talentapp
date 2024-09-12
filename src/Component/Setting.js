import axios from 'axios';
import React, { useState } from 'react';
import md5 from 'js-md5';
import { BASE_URL } from './BaseUrl';

const Setting = () => {
  const [value, setValues] = useState({
    user_id: localStorage.getItem('user_id'),
    password: '',
    cpassword: ''
  });
  const [errors, setErrors] = useState({})
  const [loader , setLoader] = useState()

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!value.password) {
      isValid = false;
      newErrors.password = "Password is required"
    }
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    if (!passwordPattern.test(value.password)) {
      isValid = false;
      newErrors.password = "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
    }

    if (value.password !== value.cpassword) {
      isValid = false;
      newErrors.cpassword = "Password & Confirm Password dont match"

    }




    setErrors(newErrors);
    setTimeout(() => {
      setErrors("")
    }, 5000);
    return isValid;


  }

  const [msg, setMsg] = useState()

  const pass = value.password;
  const hashpassword = md5(pass);

  const onhandlesubmit = (e) => {
    e.preventDefault();

    const data = {
      password: hashpassword,
      user_id: localStorage.getItem('user_id'),
    };


    if (validateForm()) {
     setLoader("Please wait..")

      axios
        .post(`${BASE_URL}/change_pass`, data)
        .then((res) => {
          console.log(res);
          if (res.data) {
            setMsg("Password reset Successfully")
            setLoader("")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }




  };

  const handleinput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  return (
    <div className='help'>
      <form onSubmit={onhandlesubmit}>
        <div className='form' >
          <p style={{ background: '#eee', padding: '15px', fontSize: '14px' }}>Change Passsword</p>

          <div className='name-holder'>
            <label htmlFor='password'>New Password</label>
            <input type='password' name='password' className='form-control' id='password' value={value.password} onChange={handleinput} placeholder='New password' />
            <span className='text-danger'>{errors.password}</span>
          </div>
          <div className='name-holder'>
            <label htmlFor='cpassword'>Confirm Password</label>
            <input type='text' name='cpassword' className='form-control' id='cpassword' onChange={handleinput} placeholder='Confirm password' />
            <span className='text-danger'>{errors.cpassword}</span>
          </div>
          <button type='submit'>Send</button>
        </div>
        <span className='text-success'>{msg}</span>
        <span className='text-danger'>{loader}</span>
      </form>
    </div>
  );
};

export default Setting;
