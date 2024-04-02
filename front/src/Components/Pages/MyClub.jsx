import React from 'react'
import { Link } from 'react-router-dom'

import { useState } from 'react';
import axios from 'axios'
import { BASE_URL } from '../Utils/BaseUrl';
import { useEffect } from 'react';
import ProfileSection from './DashSubComponents/ProfileSection';
import PostSection from './DashSubComponents/PostSection';
import DashBarProgress from './DashSubComponents/DashBarProgress';
import { useDispatch } from 'react-redux';
import getPoints2 from '../../Store/DashboardMarksActions';
import PostCard from './DashSubComponents/PostCard';
import SuggestedGroup from './DashSubComponents/SuggestedGroup';
import YourGroups from './DashSubComponents/YourGroups';
import GroupCard from './GroupComponents/GroupCard';

const MyClub = () => {
    const [hide, setHide] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPoints2());
    }, [])


    return (

        <main className={hide ? "overlay" : ""} >
            <div className="main-section">
                <div className="container">
                    <div className="main-section-data">
                        <div className="row">
                            
                            <div className="col-lg-3 col-md-4 pd-left-none no-pd " id='left-section'>

                                <div className="main-left-sidebar no-margin">
                                    <ProfileSection />

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

                                    {/* <PostSection hide={hide} setHide={setHide} /> */}

                                    <GroupCard />

                                    {/* <div className="posts-section">

                                        <div className="process-comm">
                                            <div className="spinner">
                                                <div className="bounce1"></div>
                                                <div className="bounce2"></div>
                                                <div className="bounce3"></div>
                                            </div>
                                        </div>

                                    </div> */}
                                </div>
                            </div>


                            <div className="col-lg-3 pd-right-none no-pd " id='right-section'>
                                <div className="right-sidebar">
                                    <div className="card mb-3 p-2 text-center " style={{ display: 'flex', justifyContent: "center" }} >
                                        <DashBarProgress  style={{marginLeft : "50%"}}/>


                                    </div>
                                    <YourGroups />
                              
                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>


    )
}

export default MyClub