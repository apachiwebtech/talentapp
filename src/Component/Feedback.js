import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from './BaseUrl';

const Feedback = () => {
  const [errors, setErrors] = useState({})
  const [msg , setMsg] = useState('')
  const [loader , setLoader] = useState()
  const [value, setValues] = useState({
    message: '',
    subject: '',
    user_id: localStorage.getItem('user_id'),
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!value.message) {
      isValid = false;
      newErrors.message = "Message is required"
    }

    if (!value.subject) {
      isValid = false;
      newErrors.subject = "Subject is required"
    }


    setErrors(newErrors);
    // setTimeout(() => {
    //   setErrors("")
    // }, 5000);


    return isValid;


  }

  const handleinput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoader("Please wait...")
      axios
        .post(`${BASE_URL}/feedback`, value)
        .then((res) => {
          console.log(res);
          if(res.data){
            setMsg("Thank you.. for your feedback")
            setLoader("")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };


  return (
    <div className='mt70 mx-2'>
      <div className='feed-head'>
        <p className='mb-0'>Send your feedback, queries or suggestions to us.</p>
      </div>

      <div className='mt-3'>
        <form onSubmit={onSubmit}>
          <div className='mb-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Subject
            </label>
            <input type='text' className='form-control' id='exampleFormControlInput1' placeholder='subject' name='subject' onChange={handleinput} />
            <span className='text-danger'>{errors.subject}</span>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleFormControlTextarea1' className='form-label'>
              Message
            </label>
            <textarea className='form-control' id='exampleFormControlTextarea1' rows='3' placeholder='message' onChange={handleinput} name='message'></textarea>
            <span className='text-danger'>{errors.message}</span>
          </div>
          <button className='btn btn-sm btn-danger' type='submit'>
            Submit
          </button>
        </form>
        <span className='text-success'>{msg}</span>
        <span className='text-danger'>{loader}</span>
      </div>
    </div>
  );
};

export default Feedback;
