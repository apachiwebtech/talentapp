import React, { useState } from 'react';
import { useEffect } from 'react';
import { BASE_URL } from './BaseUrl';

const TodaysOffer = () => {
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    Offerdetail();
  }, []);

  async function Offerdetail() {
    const data = await fetch(`${BASE_URL}/awt_offers`);

    const json = await data.json();

    setOffer(json);
  }

  return (
    <div className='page-container' style={{ height: '100vh' }}>
      {offer.length > 0 ? (
        offer.map((item, index) => (
          <div className='card p-3 my-3' key={index}>
            <div className='offer-img text-center'>
              <img src={item.image} alt={`offer-${index}`} />
            </div>
            <h2 className='offer-title'>{item.title}</h2>
            <span className='offer-discount'>{item.percent}% Disc</span>
          </div>
        ))
      ) : (
        <div className='card p-3 my-3'>
          <h2 className='offer-title'>No Offer Available</h2>
        </div>
      )}
    </div>
  );
};

export default TodaysOffer;
