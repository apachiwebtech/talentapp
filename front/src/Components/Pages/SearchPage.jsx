import React from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import _debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import likeimg from "../../images/liked-img.png";
import { BASE_URL } from '../Utils/BaseUrl';
import DashBarProgress from './DashSubComponents/DashBarProgress';
import ProfileSection from './DashSubComponents/ProfileSection';
import SuggestedGroup from './DashSubComponents/SuggestedGroup';
import YourGroups from './DashSubComponents/YourGroups';

import img from '../../images/userimg.jpg';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import loader from '../../images/loader.gif';

import { Autocomplete, Avatar, TextField } from '@mui/material';
import { getCount } from '../../Store/CountActions';

const SearchPage = () => {
    const [searchdata, setsearchdata] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState({});
    const [cancelToken, setCancelToken] = useState(null);
    const [namedata, setNameData] = useState([])
    const [likecount, setlikeCount] = useState([])
    const [likedata, setlikedata] = useState([]);
    const [userlike, setUserlike] = useState([]);
    const [searchloader, setSearchLaoder] = useState(false)

    const handleImageLoad = (id) => {
        setLoading(false);
    };
    const [commentshow, setCommentShow] = useState(false)
    const { desc } = useParams()



    function getSerachpost() {
        if (cancelToken) {
            cancelToken.cancel('Request canceled due to new search');
        }

        const newCancelToken = axios.CancelToken.source();
        setCancelToken(newCancelToken);

        const searchdata = search

        const data = {
            newsearch: searchdata
        }


        axios
            .post(`${BASE_URL}/posts_search`, data, {
                cancelToken: newCancelToken.token,
            })
            .then((res) => {
                setSearchLaoder(false)
                setsearchdata(res.data)

            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    // Request was canceled, ignore
                } else {
                    console.log(err);
                }
            })

    }

    function getNamepost() {
        if (cancelToken) {
            cancelToken.cancel('Request canceled due to new search');
        }

        const newCancelToken = axios.CancelToken.source();
        setCancelToken(newCancelToken);

        const searchdata = search

        const data = {
            newsearch: searchdata
        }

        axios
            .post(`${BASE_URL}/name_search`, data, {
                cancelToken: newCancelToken.token,
            })
            .then((res) => {

                setNameData(res.data)

            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    // Request was canceled, ignore
                } else {
                    console.log(err);
                }
            })

    }

    useEffect(() => {
        getSerachpost();
        getNamepost()
        return () => {

            setsearchdata([])
            setNameData([])
        };
    }, [search]);


    const handlecomment = (id) => {
        setCommentShow('')

        setTimeout(() => {
            setCommentShow((prevMap) => ({
                ...prevMap,
                [id]: !commentshow[id], // Toggle the state for the specific id
            }));
        }, 500);

    };

    const dispatch = useDispatch()




    async function getLikedata() {

        const data = {
            user_id: localStorage.getItem('user_id'),
        };
        axios
            .post(`${BASE_URL}/post_like_data`, data)
            .then((res) => {
                setlikedata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleLike = _debounce((id) => {
        const data = {
            post_id: id,
            user_id: localStorage.getItem("user_id")
        }
        axios
            .post(`${BASE_URL}/dash_post_like`, data)
            .then((res) => {

                getLikedata();
                getlikeCount()
            })
            .catch((err) => {
                console.log(err);
            });


    }, 200)


    useEffect(() => {
        getlikeCount()

    }, [])





    const [value, setvalue] = useState({
        comment: '',
        valuename :"" || desc
    });
    const onhandlechange = (event) => {
        setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };



    async function getlikeCount() {
        const data = {
            user_id: localStorage.getItem('user_id'),
        };
        axios
            .post(`${BASE_URL}/dash_post_count`, data)
            .then((res) => {
                setlikeCount(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onhandlelikeuser = async (id) => {
        axios
            .post(`${BASE_URL}/post_like_user`, { post_id: id })
            .then((res) => {
                setUserlike(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClose = () => {
        setUserlike("");
    }



    const count = useSelector((state) => state.Count.count);
    const currentPostId = useSelector((state) => state.Count.postId);

    const onhandleChange = _debounce((e) => {

        setSearchLaoder(true)

        setSearch(e.target.value);
        // Clear the cache
        // getSerachpost();
        // getNamepost()

    }, 2000);

    useEffect(() => {
        setSearch(desc)

        setvalue({
            valuename: desc 
        })
    }, [])


    console.log(searchdata.length,"***")


    return (

        <>
            <div class="search-sec">
                <div class="container">
                <div className='mx-2'>
                {desc == ":id" ?
                    <Autocomplete
                        id="combo-box-demo"
                        options={namedata}
                        getOptionLabel={(option) => option.firstname}

                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Search Here..." onChange={onhandleChange} />}
                        renderOption={(props, option) => (
                            <li {...props}>
                                <Link to={`/ProfileDetail/${option.id}`} color="inherit" className='d-flex align-items-center'>
                                    <div>
                                        <Avatar src="/broken-image.jpg" />
                                    </div>
                                    <p className='px-3'>
                                        {option.firstname} {option.lastname}
                                    </p>
                                </Link>
                            </li>
                        )}
                        noOptionsText=""
                    /> :

                    <TextField label="Search Here..." value={value.name} name='valuename' onChange={onhandleChange}  sx={{ width: "100%" }} />
                }
            </div>
                </div>
            </div>


            <main >
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



                                        {searchdata?.map((item, index) => {

                                            const timestampStr = item.createdDate; // Assuming item.createdDate is the timestamp string
                                            const timestamp = new Date(timestampStr);

                                            // Extract day, month, and year
                                            let dd = timestamp.getDate();
                                            let mm = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
                                            let yy = timestamp.getFullYear().toString().substr(-2); // Get last two digits of the year

                                            // Pad day and month with leading zeros if necessary
                                            if (dd < 10) {
                                                dd = '0' + dd;
                                            }
                                            if (mm < 10) {
                                                mm = '0' + mm;
                                            }

                                            // Concatenate to get the desired format
                                            const formattedDate = dd + '-' + mm + '-' + yy;


                                            // ************************************                


                                            const renderClickableText = (text) => {
                                                const words = text.split('#');
                                                const elements = [];

                                                for (let i = 0; i < words.length; i++) {
                                                    const word = words[i];

                                                    if (word !== '') {
                                                        elements.push(
                                                            <Link
                                                                style={{ overflowWrap: "break-word" }}
                                                                key={i}
                                                                to={`/searchpage/${word}`}
                                                                className='post-hash m-0 py-1'
                                                            >
                                                                {word}
                                                            </Link>
                                                        );

                                                        if (i < words.length - 1) {
                                                            // Add the '#' separator between words (excluding the last word)
                                                            elements.push(<span key={`sep${i}`} style={{ color: "blue" }}>#</span>);
                                                        }
                                                    }
                                                }

                                                return elements;
                                            };


                                            return (
                                                <div className="posty">
                                                    <div className="post-bar no-margin">
                                                        <div className="post_topbar">
                                                            <div className="usy-dt d-flex">

                                                                <img src={item.profile_image === '' ? img : 'https://thetalentclub.co.in/upload/profile/' + item.profile_image} alt='' />


                                                                <Link to={`/profiledetail/${item.user_id}`}>
                                                                    <div className="usy-name">
                                                                        <h3> {item.firstname} {item.lastname}</h3>
                                                                        {/* <span>  3 min ago</span> */}
                                                                        <p style={{ fontSize: "12px" }}>{item.createdDate == null ? "--" : formattedDate}</p>

                                                                    </div>
                                                                </Link>

                                                            </div>

                                                        </div>

                                                        <div className="job_descp">

                                                            <Carousel showThumbs={false}>
                                                                <div className='post-main-img' id='postclick'>
                                                                    {item?.post_images?.[0] && item.post_images?.[0].endsWith('.mp4') ? (
                                                                        <ReactPlayer url={`https://thetalentclub.co.in/upload/post_files/${item.post_images?.[0]}`} loop={false} playing={false} controls={true} playIcon={<button>Play</button>} />
                                                                    ) : (
                                                                        <>
                                                                            {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}

                                                                            <img
                                                                                src={`https://thetalentclub.co.in/upload/post_files/${item?.post_images?.[0]}`}
                                                                                alt=''
                                                                                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                                                onLoad={() => handleImageLoad(index)}


                                                                            />


                                                                        </>
                                                                    )}
                                                                </div>
                                                                {item.post_images.slice(1).map((item, index) => {
                                                                    return (
                                                                        <div className='post-main-img' id='postclick' key={index}>
                                                                            {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}

                                                                            <img
                                                                                src={`https://thetalentclub.co.in/upload/post_files/${item}`}
                                                                                alt=''
                                                                                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                                                onLoad={() => handleImageLoad(index)}
                                                                            />

                                                                        </div>
                                                                    );
                                                                })}
                                                            </Carousel>

                                                            <p className='post-title m-0 py-1 break-word'>
                                                                <b>{item.title}</b>
                                                            </p>
                                                            {item.description.includes('#') ? (
                                                                renderClickableText(item.description)
                                                            ) : (
                                                                <p className='item-desc break-word'  >{item.description}</p>
                                                            )}


                                                        </div>
                                                        <div className="job-status-bar">
                                                            <ul className="like-com">

                                                                {likecount?.filter(ele => ele.post_id === item.post_id)
                                                                    .map(filteredLike => {
                                                                        return (
                                                                            <li key={filteredLike.post_id}>
                                                                                {filteredLike.like_count !== null ? (


                                                                                    <li>
                                                                                        <Link href="#" onClick={() => handleLike(item.post_id)}>  <i className={likedata.some((ele) => ele.post_id === item.post_id) ? 'fas fa-heart text-danger' : 'fas fa-heart '} id='like1' ></i> Like</Link>
                                                                                        <img onClick={() => onhandlelikeuser(item.post_id)} src={likeimg} alt="" />
                                                                                        <span> {filteredLike.like_count}</span>
                                                                                    </li>
                                                                                ) : (
                                                                                    <li>
                                                                                        <Link href="#" onClick={() => handleLike(item.post_id)}><i className={likedata.some((ele) => ele.post_id === item.post_id) ? 'fas fa-heart text-danger' : 'fas fa-heart '} id='like1' ></i> Like</Link>
                                                                                        <img onClick={() => onhandlelikeuser(item.post_id)} src={likeimg} alt="" />
                                                                                        <span>0</span>
                                                                                    </li>
                                                                                )}
                                                                            </li>
                                                                        );
                                                                    })}

                                                                {likecount?.filter(ele => ele.post_id === item.post_id)
                                                                    .map(filteredLike => {
                                                                        return (
                                                                            <li key={filteredLike.post_id} className='px-2'>
                                                                                {filteredLike.comment_count !== null ? (

                                                                                    <li onClick={() => handlecomment(index)}><Link href="#" className="com" onClick={() => dispatch(getCount(item.post_id))}><i className="fas fa-comment-alt"></i> Comment   {filteredLike.comment_count} </Link></li>
                                                                                ) : (
                                                                                    <li onClick={() => handlecomment(index)}><Link href="#" onClick={() => dispatch(getCount(item.post_id))} className="com"><i className="fas fa-comment-alt"></i> Comment  0 </Link></li>
                                                                                )}
                                                                            </li>
                                                                        );
                                                                    })}

                                                            </ul>
                                                            {/* <Link ><i className="fas fa-eye"></i>Views 50</Link> */}
                                                        </div>
                                                    </div>
                                                    <div className='modal fade' id='exampleModal2' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                                        <div className='modal-dialog modal-dialog-centered'>
                                                            <div className='modal-content'>
                                                                <div className='modal-header'>
                                                                    <h1 className='modal-title fs-5' id='exampleModalLabel'>
                                                                        User Like
                                                                    </h1>
                                                                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={handleClose}></button>
                                                                </div>
                                                                <div className='modal-body2 p-2'>
                                                                    {userlike?.data?.map((item, index) => {
                                                                        return (
                                                                            <div className='d-flex align-items-center py-1' key={index}>
                                                                                <div className='post-img'>
                                                                                    <img src={item.profile_image === '' ? img : 'https://thetalentclub.co.in/upload/profile/' + item.profile_image} alt='' />
                                                                                </div>
                                                                                <h4 className='person-name px-2'>
                                                                                    {item.firstname} {item.lastname}
                                                                                </h4>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* **********************************************************                 */}



                                                    {commentshow[index] && <div className="comment-section">

                                                        <div className="comment-sec">
                                                            {count?.map((item, index) => {
                                                                return (
                                                                    <ul>
                                                                        <li>
                                                                            <div className="comment-list">

                                                                                <div className="comment-img" >
                                                                                    <img src={item.profile_image === '' ? img : 'https://thetalentclub.co.in/upload/profile/' + item.profile_image} alt="" />
                                                                                </div>
                                                                                <div className="comment">
                                                                                    <h3>  {item.firstname} {item.lastname}</h3>
                                                                                    {/* <span><img src="images/clock.png" alt="" /> 3 min ago</span> */}
                                                                                    <p>{item.comment} </p>
                                                                                    <Link onClick={() => {

                                                                                        const data = {
                                                                                            comment_id: item.id
                                                                                        }
                                                                                        axios.post(`${BASE_URL}/delete_user_comment`, data)
                                                                                            .then((res) => {
                                                                                                dispatch(getCount(currentPostId))
                                                                                                getlikeCount()
                                                                                            })
                                                                                            .catch((err) => {
                                                                                                console.log(err)
                                                                                            })
                                                                                    }} title="" className="active"><i class="fa-solid fa-trash-can"></i>Delete</Link>
                                                                                </div>

                                                                            </div>


                                                                        </li>

                                                                    </ul>
                                                                )
                                                            })}

                                                        </div>


                                                        <div className="post-comment">

                                                            <div className="comment-sec d-flex align-items-center">

                                                                <input type="text" placeholder="Post a comment" name='comment' value={value.comment} onChange={onhandlechange} />

                                                                <i class="lar la-paper-plane px-2" style={{ cursor: "pointer", fontSize: "36px" }} onClick={() => {

                                                                    if (currentPostId !== null && value.comment !== "") {
                                                                        const data = {
                                                                            user_id: localStorage.getItem('user_id'),
                                                                            post_id: currentPostId, // Use the currentPostId
                                                                            comment: value.comment,
                                                                        };
                                                                        axios
                                                                            .post(`${BASE_URL}/add_comment`, data)
                                                                            .then((res) => {
                                                                                dispatch(getCount(currentPostId))
                                                                                getlikeCount()
                                                                            })
                                                                            .catch((err) => {
                                                                                console.log(err);
                                                                            });
                                                                    }
                                                                    setvalue({
                                                                        comment: ""
                                                                    })

                                                                }}>

                                                                </i>

                                                                {/* <button className='btn btn-primary' >Send</button> */}


                                                            </div>
                                                        </div>
                                                    </div>}

                                                </div >
                                            )
                                        })}

                                        {searchdata.length === 0 && !searchloader ? <h2 className='text-center'>Search Something...</h2> :null }

                                        {searchloader && <div className="posts-section">

                                            <div className="process-comm">
                                                <div className="spinner">
                                                    <div className="bounce1"></div>
                                                    <div className="bounce2"></div>
                                                    <div className="bounce3"></div>
                                                </div>
                                            </div>

                                        </div>}

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

export default SearchPage