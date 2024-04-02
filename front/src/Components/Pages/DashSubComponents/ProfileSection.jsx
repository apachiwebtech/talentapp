import React from 'react'
import { useState } from 'react';
import { BASE_URL } from '../../Utils/BaseUrl';
import { useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProfiledata } from '../../../Store/ProdataAction';

const ProfileSection = () => {
    const loggeduser = localStorage.getItem('userName');
    const Lastname = localStorage.getItem('Lastname');

    const prodata = useSelector((state) => state.ProData.profiledata);

    const dispatch = useDispatch()

    useEffect(() => {
         dispatch(getProfiledata())
    }, [])


    return (
        <>
            {prodata.map((item) => {
                return (
                    <div class="user-data full-width">
                        <div class="user-profile">
                            <div class="username-dt">
                                <div class="usr-pic">
                                    <img src={`https://thetalentclub.co.in/upload/profile/${item.profile_image}`} alt='profile' />
                                </div>
                            </div>
                            <div class="user-specs">
                                <h3>{loggeduser} {Lastname}</h3>
                                <span>Graphic Designer at Self Employed</span>
                            </div>
                        </div>
                        <ul class="user-fw-status">
                        
                            <li>
                                <Link to="/profile" title="">View Profile</Link>
                            </li>
                        </ul>
                    </div>
                )
            })}
        </>
    )
}

export default ProfileSection