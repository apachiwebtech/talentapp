import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import logo from '../../images/whitelogo.png'
import { useDispatch, useSelector } from "react-redux";
import { getProfiledata } from "../../Store/ProdataAction";
const Header = () => {
    const [show, setShow] = useState(false)

    const prodata = useSelector((state) => state.ProData.profiledata);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getProfiledata())
    }, [])



    return (
        <header>
            <div class="container">
                <div class="header-data d-flex align-items-center justify-content-between">
                    <div class="logo">
                        <Link href="index.html" title=""><img src={logo} alt="" /></Link>
                    </div>
                    {/* <div class="search-bar">
                        <form>
                            <input type="text" name="search" placeholder="Search..." />
                            <button type="submit"><i class="la la-search"></i></button>
                        </form>
                    </div> */}
                    <nav>
                        <ul>
                            <li>
                                <Link to="/dash" title="">
                                    <i class="las la-home d-block"></i>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="companies.html" title="">
                                    <i class="las la-chart-pie d-block"></i>
                                    Talent Score
                                </Link>

                            </li>
                            <li>
                                <Link to="/myclub" title="">
                                    <i class="las la-building d-block"></i>
                                    My Clubs
                                </Link>
                            </li>
                            <li>
                                <Link to="/offer" title="">
                                    <i class="las la-tag d-block"></i>
                                    Todays Offer
                                </Link>

                            </li>

                            <li>
                                <Link href="#" title="" class="not-box-openm">
                                    <i class="las la-briefcase d-block"></i>
                                    My Bucket List
                                </Link>

                            </li>

                        </ul>
                    </nav>
                    <div class="menu-btn">
                        <a href="#" title=""><i class="fa fa-bars"></i></a>
                    </div>

                    {prodata.map((item) => {
                        return (
                            <div class="user-account " style={{ width: "170px" }}>
                                <div class="user-info d-flex align-items-center " onClick={() => setShow(!show)}>
                                    <div className="comment-img" >
                                        <img src={`https://thetalentclub.co.in/upload/profile/${item.profile_image}`} alt='profile' />
                                    </div>
                                    <a href="#" title="" className="mx-2">{item.firstname}</a>

                                    <i class="la la-sort-down"></i>

                                </div>

                                <div class={show ? "user-account-settingss d-block" : "user-account-settingss"} id="users">

                                    <h3>Setting</h3>
                                    <ul class="us-links px-2">
                                        <li><a href="profile-account-setting.html" title="">Account Setting</a></li>
                                        <li><a href="#" title="">Privacy</a></li>
                                        <li><a href="#" title="">Faqs</a></li>
                                        <li><a href="#" title="">Terms & Conditions</a></li>
                                    </ul>
                                    <h3 class="tc"><Link title="">Logout</Link></h3>
                                </div>
                            </div>
                        )
                    })}

                    <Link to="/searchpage/:id">
                        <i class="fa-solid fa-magnifying-glass text-light"></i>
                    </Link>




                </div>
            </div>
        </header>
    )
}

export default Header
