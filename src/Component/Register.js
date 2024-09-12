import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import md5 from 'js-md5';
import React, { useState } from 'react';
import { BASE_URL } from './BaseUrl';
import Validation from './LoginValidation';

const Register = () => {
  const [errors, setErrors] = useState({})
  const [errmsg , setErroMsg] = useState() 
  const [loader , setLoader] = useState()
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    passWord: '',
    cpassword: '',
  });

  // const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(values.email)) {
      isValid = false;
      newErrors.email = "Invalid email address";
    }
    if (!values.firstname) {
      isValid = false;
      newErrors.firstname = "FirstName is required"
    }
    if (!values.lastname) {
      isValid = false;
      newErrors.lastname = "Lastname is required"
    }
    if (!values.passWord) {
      isValid = false;
      newErrors.password = "Password is required"
    }
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    if (!passwordPattern.test(values.passWord)) {
      isValid = false;
      newErrors.password = "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
    }

    if (values.passWord !== values.cpassword) {
      isValid = false;
      newErrors.cpassword = "Password & Confirm Password dont match"

    }
    const mobileNumberRegex = /^\d{10,15}$/;
    if (!mobileNumberRegex.test(values.mobile)) {
      isValid = false;
      newErrors.mobile = "Please enter valid mobile no";
    }



    setErrors(newErrors);
    setTimeout(() => {
      setErrors("")
    }, 5000);
    return isValid;


  }



  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoader("Please wait..")
      const pass = values.passWord;
      const hashedPassword = md5(pass);
      console.log(hashedPassword)

      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        mobile: values.mobile,
        passWord: hashedPassword,
      }

      if (values.fullname !== "" || values.email !== "" || values.passWord !== "" || values.mobile !== "") {
        axios.post(`${BASE_URL}/register`, data)
          .then((res) => {
          
            if (res.data.insertId) {
              document.getElementById("alert").style.display = "block"
            }

            if (res.data.errno == 1062) {
              setErroMsg('Emailid is Already Taken')
            }

            setLoader("")

					setTimeout(() => {
						setErroMsg("")
					}, 4000);
          })
          .catch((err) => console.log(err));
      } else {
        alert("should not be em")
      }
    }



  }



  const handleinput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  return (
    <div class='wrapper' id='registerPage'>
      <div class='text-right'>
        <a href='index.html' class='linkAccount'>
          Already Have An Account
        </a>
      </div>

      <div class='form-bodyReg'>
        <form method='POST' id='register_form' onSubmit={handleSubmit}>
          <div class='form-wrapper'>
            <div class='form_group text-wrapper-form m-2'>
              <input type='text' id='fullname' placeholder='Firstname' onChange={handleinput} name='firstname' />
              <p class='text-danger m-0 pl-31'>{errors.firstname}</p>
            </div>
            <div class='form_group text-wrapper-form m-2'>
              <input type='text' id='lastname' placeholder='Lastname' onChange={handleinput} name='lastname' />
              <p class='text-danger m-0 pl-31'>{errors.lastname}</p>
            </div>

            <div class='form_group text-wrapper-form m-2'>
              <input type='email' id='email' placeholder='Email id' onChange={handleinput} name='email' />
              <p class='text-danger m-0 pl-31'>{errors.email}</p>
            </div>
            <div class='form_group text-wrapper-form m-2'>
              <input type='number' id='mobile' placeholder='Mobile' onChange={handleinput} name='mobile' />
              <p class='text-danger m-0 pl-31'>{errors.mobile}</p>
            </div>
            <div class='form_group text-wrapper-form m-2'>
              <input type='password' id='password' placeholder='Password' onChange={handleinput} name='passWord' />
              <p class='text-danger m-0 pl-31'>{errors.password}</p>
            </div>
            <div class='form_group text-wrapper-form m-2'>
              <input type='text' id='cpassword' placeholder='Confirm Password' onChange={handleinput} name='cpassword' />
              <p class='text-danger m-0 pl-31'>{errors.cpassword}</p>
            </div>

            <div id='password_message'></div>
            <div id='error_message'></div>
            <div class='text-rightReg'>
              <button type='submit' class='btn btn-submit'>
                Submit
              </button>
            </div>
            <span className='text-danger px-4'>{errmsg}</span>
            <span className='text-danger'>{loader}</span>
            <Stack sx={{ width: '100%', display: "none" }} id="alert" className='mt-3' spacing={1}>
              <Alert variant="outlined" severity="success">
                Account Created Succesfully Please go <a href='/'><span style={{ textDecoration: "underline" }}>back to login</span></a>
              </Alert>
            </Stack>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
