import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { SlideshowLightbox } from 'lightbox.js-react';
import _debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import loader from '../images/loader.gif';
import searchimg from '../images/searchimg.png';
import { BASE_URL } from './BaseUrl';
import Loader from './Loader';

import ReactPlayer from 'react-player/lazy';
import { useDispatch, useSelector } from "react-redux";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import img from '../Assets/userimg.jpg';
import { getCount } from "../Store/CountActions";
import getPoints from '../Store/DashboardMarksActions';
import satyamimg from '../images/satyam.jpg';

const PostlistingPage = () => {

    const [searchdata, setsearchdata] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState({});
    const [cancelToken, setCancelToken] = useState(null);
    const [namedata, setNameData] = useState([])
    const [followinfo, setFollowdata] = useState([]);
    const [likecount, setlikeCount] = useState([])
    const loggeduser = localStorage.getItem('userName');
    const Lastname = localStorage.getItem('Lastname');
    const [likedata, setlikedata] = useState([]);
    const [userlike, setUserlike] = useState([]);
    const [clickedItemId, setClickedItemId] = useState(null);
    const [animate, setAnimate] = useState(null)
    const [comlike, setcomlike] = useState([]);
    const longPressTimeout = useRef(null);
    const { desc } = useParams()

    console.log(desc)

    useEffect(() => {
        dispatch(getPoints());
    }, [])


    const dispatch = useDispatch();
    const count = useSelector((state) => state.Count.count);
    const currentPostId = useSelector((state) => state.Count.postId);

    const profile_img = localStorage.getItem('profile_pic');

    const handleTouchEnd = () => {
        clearTimeout(longPressTimeout.current);
    };

    const handleTouchStart = (id, userid) => {

        const user_id = localStorage.getItem("user_id")



        if (user_id == userid) {
            longPressTimeout.current = setTimeout(() => {
                setClickedItemId((prevId) => (prevId === id ? null : id));
            }, 1000);
        }
        else {
            console.log("id does not match")
        }
    };

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

    useEffect(() => {
        getLikedata()
    }, [])


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

    useEffect(() => {
        getlikeCount()
    }, [])

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


    const onhandleChange = _debounce((e) => {

        setSearch(e.target.value);
        // Clear the cache
        // getSerachpost();
        // getNamepost()

    }, 2000);

    const [value, setvalue] = useState({
        comment: '',
    });

    useEffect(() => {
        setSearch(desc)
    }, [])

    const onhandleclose = () => {
        dispatch(getCount())
    }
    const handleClose = () => {
        setUserlike("");
    }

    useEffect(() => {
        getSerachpost();
        getNamepost()
        return () => {

            setsearchdata([])
            setNameData([])
        };
    }, [search]);


    const onhandlechange2 = (event) => {
        setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };



    const handleLoad = (id) => {
        console.log(id)
        setLoading(false);
    }
    const followdata = followinfo

    const onhandleClick = async (id) => {
        const data = {
            follow_user_id: id,
            user_id: localStorage.getItem('user_id'),
        };
        if (followdata.some((item) => item.follow_user_id === id)) {
            axios.post(`${BASE_URL}/unfollow_user`, data);
            fetchData();
        } else {
            axios.post(`${BASE_URL}/follow_user`, data);
            fetchData();

        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/follow_data`, {
                user_id: localStorage.getItem('user_id'),
            });

            setFollowdata(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleImageLoad = (id) => {
        console.log(id)

        setLoading(false);

    };


    const settings = {
        dots: true,
    };

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

    async function getcommentlikeData() {
        const data = {
            user_id: localStorage.getItem('user_id'),
        };
        axios
            .post(`${BASE_URL}/comment_like_data`, data)
            .then((res) => {
                setcomlike(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getcommentlikeData();
    }, []);



    return (
        <div className='Postlisting Main pt70'>
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
                                <Link to={`/profiledetailpage/${option.id}`} color="inherit" className='d-flex align-items-center'>
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

                    <TextField label="Search Here..." value={desc} sx={{ width: "100%" }} />
                }
            </div>

            <div className=''>
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

                    const handleWordClick = (word) => {
                        // Define the logic for handling clicks based on the clicked word
                        console.log(`Clicked on: ${word}`);
                        // Add your own logic to navigate or perform actions based on the clicked word
                    };

                    const renderClickableText = (text) => {
                        const words = text.split('#');
                        const elements = [];

                        for (let i = 0; i < words.length; i++) {
                            const word = words[i];

                            if (word !== '') {
                                elements.push(
                                    <Link
                                        key={i}
                                        to={`/postlistingpage/${word}`}
                                        className='post-hash m-0 py-1'
                                        onClick={() => handleWordClick(word)}
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
                    const originalDate = new Date(item.created_date);
                    return searchdata?.data?.length === 0 ? (
                        <Loader />
                    ) : (
                        <div className='talent-post ' key={index}>
                            <div className='px-3 py-2 post-head d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <div className='post-img'>
                                        <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                                            <img src={item.profile_image === '' ? img : 'https://thetalentclub.co.in/upload/profile/' + item.profile_image} alt='' />
                                        </SlideshowLightbox >
                                    </div>
                                    <Link to={`/profiledetailpage/${item.user_id}`}>
                                        <h4 className='person-name px-2'>
                                            {item.firstname} {item.lastname}
                                        </h4>
                                    </Link>

                                </div>
                                <div onClick={() => onhandleClick(item.user_id)}>
                                    <p className='follow'>{followdata.some((ele) => ele.follow_user_id === item.user_id) ? 'Following' : 'Follow'}</p>
                                </div>
                            </div>


                            <Slider {...settings}>
                                <div className='post-main-img' id='postclick'>
                                    {item?.post_images?.[0] && item.post_images?.[0].endsWith('.mp4') ? (
                                        <ReactPlayer url={`https://thetalentclub.co.in/upload/post_files/${item.post_images?.[0]}`} loop={false} playing={false} controls={true} playIcon={<button>Play</button>} />
                                    ) : (
                                        <>
                                            {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}
                                            <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                                                <img
                                                    src={`https://thetalentclub.co.in/upload/post_files/${item?.post_images?.[0]}`}
                                                    alt=''
                                                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onLoad={() => handleImageLoad(index)}


                                                />
                                            </SlideshowLightbox>

                                        </>
                                    )}
                                </div>
                                {item.post_images.slice(1).map((item, index) => {
                                    return (
                                        <div className='post-main-img' id='postclick' key={index}>
                                            {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}
                                            <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                                                <img
                                                    src={`https://thetalentclub.co.in/upload/post_files/${item}`}
                                                    alt=''
                                                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onLoad={() => handleImageLoad(index)}
                                                />
                                            </SlideshowLightbox>
                                        </div>
                                    );
                                })}
                            </Slider>




                            <div className='click-like' id='class1' style={{ display: 'none' }}>
                                <i className='ri-trophy-fill mx-2 text-danger'></i>
                            </div>
                            <div className='click-dislike' id='class2' style={{ display: 'none' }}>
                                <i className='ri-trophy-line mx-2 text-danger'></i>
                            </div>

                            <div className=' '>
                                {likecount?.filter(ele => ele.post_id === item.post_id)
                                    .map(filteredLike => {
                                        return (
                                            <div key={filteredLike.post_id}>
                                                {filteredLike.like_count !== null ? (
                                                    <p className='like-count' onClick={() => onhandlelikeuser(item.post_id)} type='button' data-bs-toggle='modal' data-bs-target='#exampleModal2'>

                                                        {filteredLike.like_count}  <i className='ri-trophy-fill'></i>
                                                    </p>
                                                ) : (
                                                    <p className='like-count'>

                                                        0 <i className='ri-trophy-line'></i>
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}

                                <div className='post-activity py-1 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <i className={likedata.some((ele) => ele.post_id === item.post_id) ? 'ri-trophy-fill mx-2' : 'ri-trophy-line mx-2'} id='like1' onClick={() => handleLike(item.post_id)}></i>

                                        <i
                                            className='ri-chat-1-line mx-2'
                                            onClick={() => dispatch(getCount(item.post_id))}
                                            type='button'
                                            data-bs-toggle='modal'
                                            data-bs-target='#exampleModal'

                                        > </i>
                                    </div>
                                    <div>
                                        {likecount?.filter(ele => ele.post_id === item.post_id)
                                            .map(filteredLike => {
                                                return (
                                                    <span key={filteredLike.post_id} className='px-2'>
                                                        {filteredLike.comment_count !== null ? (
                                                            <span className='like-count' style={{ fontSize: "15px" }} type='button' data-bs-toggle='modal' data-bs-target='#exampleModal2'>
                                                                {filteredLike.comment_count} comment
                                                            </span>
                                                        ) : (
                                                            <span className='like-count'>

                                                                No comment
                                                            </span>
                                                        )}
                                                    </span>
                                                );
                                            })}
                                    </div>



                                </div>


                                <div className='px-2 py-2' style={{ width: "350px", overflow: "scroll" }}>
                                    <p className='post-title m-0 py-1'>
                                        <b>{item.title}</b>
                                    </p>
                                    {item.description.includes('#') ? (
                                        renderClickableText(item.description)
                                    ) : (
                                        <p className='item-desc'>{item.description}</p>
                                    )}
                                    <p style={{ fontSize: "12px" }}>{item.createdDate == null ? "--" : formattedDate}</p>
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

                            <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                <div className='modal-dialog modal-fullscreen'>
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h1 className='modal-title fs-5' id='exampleModalLabel'>
                                                Comments &nbsp;({count.length})
                                            </h1>
                                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={onhandleclose}></button>
                                        </div>

                                        <div className='modal-body' style={{ padding: "0px 10px" }}  >
                                            {count?.map((item, index) => {
                                                return (
                                                    <div key={index}>

                                                        <div className={`comment-box d-flex align-items-center justify-content-between my-2 ${animate === item.id ? 'animate__animated animate__fadeOutRight' : ''} ${clickedItemId === item.id ? 'bg-lightblue' : ''}`} key={index} >
                                                            <button className='delete-ovr' onTouchEnd={handleTouchEnd} onTouchStart={() => handleTouchStart(item.id, item.user_id)}>Touch</button>
                                                            <div>
                                                                <p className='name-text'>
                                                                    {' '}
                                                                    {item.firstname} {item.lastname}
                                                                </p>
                                                                <p className='comment'>{item.comment}</p>
                                                            </div>

                                                            <div className='d-flex'>
                                                                <div>
                                                                    <i
                                                                        className={comlike.some((ele) => ele.comment_id === item.id) ? 'ri-thumb-up-fill' : 'ri-thumb-up-line'}
                                                                        onClick={() => {
                                                                            const selectComment_id = item.id;


                                                                            const data = {
                                                                                comment_id: selectComment_id,
                                                                                user_id: localStorage.getItem('user_id'),
                                                                            };
                                                                            if (comlike.some((ele) => ele.comment_id === selectComment_id)) {
                                                                                axios.post(`${BASE_URL}/comment_like_delete`, data)
                                                                                    .then((res) => {
                                                                                        dispatch(getCount(item.post_id))
                                                                                        getcommentlikeData()
                                                                                    })
                                                                            } else {
                                                                                axios.post(`${BASE_URL}/comment_like`, data)
                                                                                    .then((res) => {
                                                                                        dispatch(getCount(item.post_id))
                                                                                        getcommentlikeData()
                                                                                    });
                                                                            }

                                                                        }}
                                                                    ></i>
                                                                    <span className='fw-bold'>
                                                                        <span>{item.like_count} </span>Like
                                                                    </span>
                                                                </div>
                                                                <div className='mx-2'>
                                                                    <i className='ri-reply-line'></i>
                                                                    <span className='fw-bold'>Reply</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`delete-btn text-center ${animate === item.id ? 'animate__animated animate__fadeOutRight' : ''} ${clickedItemId === item.id ? 'delete-trans' : ''}`} style={{ height: "30px", display: "none" }} id={`del-box${item.id}`} >
                                                            <i className="ri-delete-bin-5-line text-light" onClick={() => {
                                                                setAnimate((prevId) => (prevId === item.id ? null : item.id));
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
                                                            }}></i>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className='modal-footer' style={{ display: 'block', position: 'relative' }}>
                                            <input type='text' placeholder='...' name='comment' onChange={onhandlechange2} />
                                            <i
                                                className='ri-send-plane-2-line sent'
                                                onClick={() => {
                                                    if (currentPostId !== null) {
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
                                                }}
                                            ></i>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className='modal fade' id='exampleModal1' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                <div className='modal-dialog modal-dialog-centered'>
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h1 className='modal-title fs-5' id='exampleModalLabel'>
                                                Share With
                                            </h1>
                                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                        </div>
                                        <div className='modal-body'>
                                            <div className='social-share d-flex justify-content-between'>
                                                <div className='soc-d'>
                                                    <i className='ri-whatsapp-line'></i>
                                                </div>
                                                <div className='soc-d'>
                                                    <i className='ri-instagram-line'></i>
                                                </div>
                                                <div className='soc-d'>
                                                    <i className='ri-twitter-line'></i>
                                                </div>
                                                <div className='soc-d'>
                                                    <i className='ri-facebook-line'></i>
                                                </div>
                                                <div className='soc-d'>
                                                    <i className='ri-attachment-line'></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='modal-footer' style={{ display: 'block', position: 'relative' }}>
                                            <input type='text' placeholder='Search' />
                                            <div className='Sharelist row align-items-center my-3'>
                                                <div className='col-2'>
                                                    <div className='post-img'>
                                                        <img src={satyamimg} alt='' />
                                                    </div>
                                                </div>

                                                <div className='px-2 col-7'>
                                                    <h4 className='person-name m-0'>{loggeduser}</h4>
                                                    <p className='user_name m-0'>happiest</p>
                                                </div>
                                                <div className='col-3'>
                                                    <button className='send-btn'>Send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

            <div>
                {searchdata.length === 0 ? <img src={searchimg} width="100%" style={{ marginTop: "50%" }} alt='' /> : null}

            </div>

        </div>

    )
}

export default PostlistingPage