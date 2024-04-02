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

const Profile = () => {
    const [hide, setHide] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPoints2());
    }, [])


    return (
        <>


            <section class="cover-sec">
                <img src={landscape} alt=""/>
                    <div class="add-pic-box">
                        <div class="container">
                            <div class="row no-gutters">
                                <div class="col-lg-12 col-sm-12">
                                    <input type="file" id="file"/>
                                        <label for="file">Change Image</label>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            <main className={hide ? "overlay" : ""} >
                <div className="main-section">
                    <div className="container">
                        <div className="main-section-data">
                            <div className="row">

                                <div className="col-lg-3 col-md-4 pd-left-none no-pd " id='left-section'>

                                    <div className="main-left-sidebar no-margin">
                                        <UserProfile />

                                        <SuggestedGroup />

                                        <div className="tags-sec full-width">
                                            <ul>
                                                <li><Link href="#" title="">Help Center</Link></li>
                                                <li><Link href="#" title="">About</Link></li>
                                                <li><Link href="#" title="">Privacy Policy</Link></li>
                                                <li><Link href="#" title="">Community Guidelines</Link></li>
                                                <li><Link href="#" title="">Cookies Policy</Link></li>
                                                <li><Link href="#" title="">Career</Link></li>
                                                <li><Link href="#" title="">Language</Link></li>
                                                <li><Link href="#" title="">Copyright Policy</Link></li>
                                            </ul>
                                            <div className="cp-sec">
                                                <img src="images/logo2.png" alt="" />
                                                <p><img src="images/cp.png" alt="" />Copyright 2019</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-8 no-pd " id='mid-section'>
                                    <div className="main-ws-sec">

                                        <PostSection hide={hide} setHide={setHide} />

                                        <UserPostCard />




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

export default Profile