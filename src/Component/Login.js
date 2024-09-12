import React from 'react';
import logo from '../images/logo.png';
import back from '../images/back.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import md5 from 'js-md5';
import { BASE_URL } from './BaseUrl';

const Login = () => {
  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState([]);
  const [load, setLoad] = useState("")
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const Navigate = useNavigate();


  const validateForm = () => {
    let isValid = true;
    const newErrors = {};




    if (!values.email) {
      isValid = false;
      newErrors.email = "Email is required"
    }

    if (!values.password) {
      isValid = false;
      newErrors.password = "Password is required"
    }


    setErrors(newErrors);
    // setTimeout(() => {
    //   setErrors("")
    // }, 5000);


    return isValid;


  }

  const handleSubmit = (event) => {
    event.preventDefault();


    if (validateForm()) {

      setLoad("Please Wait...")


      const mail = values.email;
      const pass = values.password;

      const hashedPassword = md5(pass);
      console.log(hashedPassword)

      const data = {
        email: values.email,
        password: hashedPassword,
      };


      axios
        .post(`${BASE_URL}/login`, data)
        .then((res) => {

          setValid(res.data)
          setTimeout(() => {

            setValid("")
          }, 2000);

          if (res.data.id) {
            localStorage.setItem("user_loggedin", true);
            localStorage.setItem('user_id', res.data.id);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('userName', res.data.userName);
            localStorage.setItem('Lastname', res.data.lastName);
            localStorage.setItem('profile_pic', res.data.profile_pic);
            Navigate('/dash');


          } else {
            setTimeout(() => {
              // window.location.pathname = "/"
              // Navigate('/');

            }, 1000);
          }


        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoad("")
        })
    }




  };



  const handleinput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <>
      <div className='mainRed'>
        <div className='text-right'>
          <Link to='/reg' className='text-light'>Create Account</Link>
        </div>
      </div>

      {/* <div className='shadowBg'>
        <img src={back} alt='The Talent Club' style={{ width: '100%' }} />
      </div> */}
      <div className='form-body'>
        <div className='logo'>
          <img src={logo} alt='The Talent Club' />
        </div>

        <div className='heading'>
          <h1>Sign In</h1>
        </div>

        <form method='POST' id='login_form' onSubmit={handleSubmit}>
          <div className='form-wrapper mx-3'>
            <div className='form_group text-wrapper'>
              <input name='email' type='email' value={values.email} className='userIcon' placeholder='Email' onChange={handleinput} />

              {errors.email && <span style={{ paddingLeft: "17px" }} className='text-danger'>{errors.email}</span>}
            </div>

            <div className=' form_group text-wrapper mt-3'>
              <input id='password' name='password' value={values.password} type='password' className='passIcon' placeholder='Password' onChange={handleinput} />

              {errors.password && <span style={{ paddingLeft: "17px" }} className='text-danger'>{errors.password}</span>}
            </div>
            {/* <a href='forgot_password.html' style={{ color: 'black' }}>
              Forgot Password
            </a> */}

            <div className='text-center mt-3'>
              <button type='submit' className='btn btn-submit'>
                Login
              </button>
              <span style={{ color: "red" }}>{valid}</span>
              <span style={{ color: "red" }}>{load}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
