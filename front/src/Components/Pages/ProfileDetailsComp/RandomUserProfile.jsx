import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../../Utils/BaseUrl'
import axios from 'axios'
import img from '../../../images/userimg.jpg';

const RandomUserProfile = () => {
    const [prodata, setProData] = useState([])
    const {userid} = useParams()
    async function userdetailsget() {
        const data = {
            user_id: userid,
        };
        axios
            .post(`${BASE_URL}/user_detail_get`, data)
            .then((res) => {
                setProData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        userdetailsget();
    }, []);


    return (
        <>
            {prodata.map((item) => {
                return (
                    <div class="user-data full-width">
                        <div class="user-profile">
                            <div class="username-dt">
                                <div class="usr-pic">
                                    <img src={item.profile_image == "" ?  img:  `https://thetalentclub.co.in/upload/profile/${item.profile_image}`} alt='profile' />
                                </div>
                            </div>
                            <div class="user-specs">
                                <h3>{item.firstname} {item.lastname}</h3>
                                <span>Graphic Designer at Self Employed</span>
                            </div>
                        </div>
                   
                    </div>
                )
            })}
        </>
    )
}

export default RandomUserProfile