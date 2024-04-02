import React from 'react';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import getPoints2 from '../../Store/DashboardMarksActions';
import DashBarProgress from './DashSubComponents/DashBarProgress';
import PostSection from './DashSubComponents/PostSection';
import SuggestedGroup from './DashSubComponents/SuggestedGroup';
import YourGroups from './DashSubComponents/YourGroups';
import UserPostCard from './ProfileComponents.js/UserPostCard';
import UserProfile from './ProfileComponents.js/UserProfile';
import landscape from '../../images/landscape.jpg'
import { BASE_URL } from '../Utils/BaseUrl';

const Offer = () => {
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
        <>


            <main >
                <div className="main-section">
                    <div className="container">
                        <div className="main-section-data">
                            <div className="row">

                                {/* <div className="col-lg-3 col-md-4 pd-left-none no-pd " id='left-section'>

                            
                                </div> */}
                                <div className="col-lg-9 col-md-8 no-pd " id='mid-section'>
                                    <div className="main-ws-sec">

                                        <div class="post-topbar">
                                            <div class="">

                                                <h1>Offers And Coupons</h1>
                                            </div>

                                        </div>



                                        <div class="">
                                            <div className='page-container'>
                                                {offer.map((item, index) => {
                                                    return (
                                                        <div className='card p-3 my-3' key={index}>
                                                            <div className='offer-img text-center'>
                                                                <img src={item.image} alt='offer1' />
                                                            </div>
                                                            <h2 className='offer-title' >{item.title}</h2>
                                                            <span className='offer-discount'>{item.percent}% Disc</span>
                                                            <span className='offer-discount'>{item.percent}% Discount</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        </div>







                                    </div>
                                </div>


                                <div className="col-lg-3 pd-right-none no-pd " id='right-section'>
                                    <div className="right-sidebar">
                                        <div className="card mb-3 p-2 text-center " style={{ display: 'flex', justifyContent: "center" }} >
                                            <DashBarProgress style={{ marginLeft: "50%" }} />


                                        </div>
                                        <YourGroups />


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Offer