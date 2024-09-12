import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';

const Faq = () => {
  const [info, setinfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/faq`)
      .then((res) => {
        setinfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=' mt70'>
      {info.map((item , index) => {
        return (
          <div className='faq border ' key={index}>
            <div className='quation-head'>
              <h2>{item.title}</h2>
            </div>
            <div className='faq-para'>
              <p>{item.faq}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
