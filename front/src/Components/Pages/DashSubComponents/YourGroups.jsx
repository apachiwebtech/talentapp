import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../Utils/BaseUrl';
import axios from 'axios';

const YourGroups = () => {
    const [groupdata, setgroupData] = useState([]);

    async function getgroupdata() {
        const data = {
          user_id: localStorage.getItem('user_id'),
        };
        axios
          .post(`${BASE_URL}/group_name`, data)
          .then((res) => {
            setgroupData(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
         
      }

    useEffect(() => {
        getgroupdata();
    }, []);

    return (
        <div>
            <div className="suggestions full-width">
                <div className="sd-title">
                    <h3>Your Groups</h3>
                    <i className="la la-ellipsis-v"></i>
                </div>
                <div className="suggestions-list">
                    {groupdata.map((item) => {
                        return (
                            <div className="suggestion-usd">
                                 <img src={'https://thetalentclub.co.in/upload/group_images/' + item.image} style={{width:"50px",height:"50px"}} alt='' />
                                <div className="sgt-text">
                                    <h4>{item.title}</h4>
                                    <span>{item.keyword}</span>
                                </div>
                                {/* <span><i className="la la-plus"></i></span> */}
                            </div>
                        )
                    })}


                    {/* <div className="view-more">
                        <Link href="#" title="">View More</Link>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default YourGroups