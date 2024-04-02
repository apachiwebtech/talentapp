import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../Utils/BaseUrl';
import axios from 'axios';

const SuggestedGroup = () => {
    const [groupdata, setgroupData] = useState([]);

    async function getgroupdata() {
        const data = {
            user_id: localStorage.getItem('user_id')
        }

        axios
            .post(`${BASE_URL}/suggested_group`, data)
            .then((res) => {

                setgroupData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getgroupdata();
    }, []);


    const onhandleclick = (groupid) => {
        const data = {
            group_id: groupid,
            user_id: localStorage.getItem("user_id")
        }
        axios.post(`${BASE_URL}/join_group`, data)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="suggestions full-width">
                <div className="sd-title">
                    <h3>Group may you like</h3>
                    <i className="la la-ellipsis-v"></i>
                </div>
                <div class="search-bar">
                    <form>
                        <input type="text" name="search" placeholder="Search..." />
                        <button type="submit"><i class="la la-search"></i></button>
                    </form>
                </div>
                <div className="suggestions-list">

                    {groupdata.map((item) => {
                        return (
                            <div className="suggestion-usd d-flex align-items-center justify-content-between">
                                <div>
                                    <img src={'https://thetalentclub.co.in/upload/group_images/' + item.image} style={{ width: "50px", height: "50px" }} alt='' />
                                </div>
                                <Link to={`/clubdetailpage/${item.id}`}>
                                    <div className="sgt-text" style={{ width: "130px", overflow: "hidden" }}>
                                        <h4>{item.title}</h4>
                                        <span style={{ wordWrap: "unset" }}>{item.keyword}</span>
                                    </div>
                                </Link>
                                <span><i className="la la-plus" onClick={() => onhandleclick(item.id)}></i></span>
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

export default SuggestedGroup