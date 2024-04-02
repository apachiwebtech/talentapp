import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import likeimg from '../../../images/liked-img.png'
import { BASE_URL } from '../../Utils/BaseUrl';
import axios from 'axios';
import _debounce from 'lodash.debounce';
import img from '../../../images/userimg.jpg';
import ReactPlayer from 'react-player/lazy';
import loader from '../../../images/loader.gif';
import { SlideshowLightbox } from 'lightbox.js-react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getgroupCount, getlikedata } from '../../../Store/CountActions';

const GroupCard = () => {
    const [lastid, setLastid] = useState();
    const [likecount, setlikeCount] = useState([])
    const [userlike, setUserlike] = useState([]);
    const [loading, setLoading] = useState({});
    const [post, setPost] = useState([])
    const [likedata, setlikedata] = useState([]);
    const [commentshow, setCommentShow] = useState(false)

    const handleImageLoad = (id) => {
        setLoading(false);
    };

    const handlecomment = (id) => {
        setCommentShow('')

        setTimeout(() => {
            setCommentShow((prevMap) => ({
                ...prevMap,
                [id]: !commentshow[id], // Toggle the state for the specific id
            }));
        }, 500);

    };

    async function getLikedata() {

        const data = {
            user_id: localStorage.getItem('user_id'),
        };
        axios
            .post(`${BASE_URL}/group_post_like_data`, data)
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




    const handlelike = _debounce((id) => {
        const data = {
            post_id: id,
            user_id: localStorage.getItem("user_id")
        }
        axios
            .post(`${BASE_URL}/group_like`, data)
            .then((res) => {

                getLikedata()
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
    });
    const onhandlechange = (event) => {
        setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    async function getfollowpost() {
        const data = {
            user_id: localStorage.getItem('user_id')
        }
        axios
            .post(`${BASE_URL}/follow_group`, data)
            .then((res) => {
                setPost(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getfollowpost()
    }, [])


    async function getlikeCount() {
        const data = {
            user_id: localStorage.getItem('user_id'),
        };
        axios
            .post(`${BASE_URL}/group_post_count`, data)
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



    const dispatch = useDispatch();
    const comment = useSelector((state) => state.Count.groupcount);
    const currentPostId = useSelector((state) => state.Count.grouppostId);
    return (
        <>
            {post.map((item, index) => {

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
                                    {/* <SlideshowLightbox iconColor="#000" backgroundColor='#fff'> */}
                                    <img src={item.profile_image === '' ? img : 'https://thetalentclub.co.in/upload/group_images/' + item.image} alt='' />
                                    {/* </SlideshowLightbox > */}
                                    <Link to={`/clubdetailpage/${item.group_id}`}>
                                        <div className="usy-name">
                                            <h3>         {item.name}</h3>
                                            {/* <span>  3 min ago</span> */}
                                            <p style={{ fontSize: "12px" }}>{item.createdDate == null ? "--" : formattedDate}</p>

                                        </div>
                                    </Link>
                                </div>

                            </div>

                            <div className="job_descp">

                                <Carousel showThumbs={false} showIndicators={false} emulateTouch={true} preventMovementUntilSwipeScrollTolerance={true}>
                                    <div className='post-main-img' id='postclick'>
                                        {item?.post_images?.[0] && item.post_images?.[0].endsWith('.mp4') ? (
                                            <ReactPlayer url={`https://thetalentclub.co.in/upload/group_post_files/${item.post_images?.[0]}`} loop={false} playing={false} controls={true} playIcon={<button>Play</button>} />
                                        ) : (
                                            <>
                                                {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}
                                                {/* <SlideshowLightbox iconColor="#000" backgroundColor='#fff'> */}
                                                <img
                                                    src={`https://thetalentclub.co.in/upload/group_post_files/${item?.post_images?.[0]}`}
                                                    alt=''
                                                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onLoad={() => handleImageLoad(index)}


                                                />
                                                {/* </SlideshowLightbox> */}

                                            </>
                                        )}
                                    </div>
                                    {item.post_images.slice(1).map((item, index) => {
                                        return (
                                            <div className='post-main-img' id='postclick' key={index}>
                                                {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}
                                                {/* <SlideshowLightbox iconColor="#000" backgroundColor='#fff'> */}
                                                <img
                                                    src={`https://thetalentclub.co.in/upload/group_post_files/${item}`}
                                                    alt=''
                                                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onLoad={() => handleImageLoad(index)}
                                                />
                                                {/* </SlideshowLightbox> */}
                                            </div>
                                        );
                                    })}
                                </Carousel>

                                <p className='post-title m-0 py-1 break-word'>
                                    <b>{item.title}</b>
                                </p>
                                <p className='item-desc break-word'  >{item.description}</p>
                                {/* {item.description.includes('#') ? (
                                    renderClickableText(item.description)
                                ) : (
                                )} */}


                            </div>
                            <div className="job-status-bar">
                                <ul className="like-com">

                                    {likecount?.filter(ele => ele.post_id === item.post_id)
                                        .map(filteredLike => {
                                            return (
                                                <li key={filteredLike.post_id}>
                                                    {filteredLike.like_count !== null ? (


                                                        <li>
                                                            <Link href="#" onClick={() => handlelike(item.post_id)}>  <i className={likedata.some((ele) => ele.post_id === item.post_id) ? 'fas fa-heart text-danger' : 'fas fa-heart '} id='like1' ></i> Like</Link>
                                                            <img onClick={() => onhandlelikeuser(item.post_id)} src={likeimg} alt="" />
                                                            <span> {filteredLike.like_count}</span>
                                                        </li>
                                                    ) : (
                                                        <li>
                                                            <Link href="#" onClick={() => handlelike(item.post_id)}><i className={likedata.some((ele) => ele.post_id === item.post_id) ? 'fas fa-heart text-danger' : 'fas fa-heart '} id='like1' ></i> Like</Link>
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

                                                        <li onClick={() => handlecomment(index)}><Link href="#" className="com" onClick={() => dispatch(getgroupCount(item.post_id))}><i className="fas fa-comment-alt"></i> Comment   {filteredLike.comment_count} </Link></li>
                                                    ) : (
                                                        <li onClick={() => handlecomment(index)}><Link href="#" onClick={() => dispatch(getgroupCount(item.post_id))} className="com"><i className="fas fa-comment-alt"></i> Comment  0 </Link></li>
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
                                {comment?.map((item, index) => {
                                    return (
                                        <ul>
                                            <li>
                                                <div className="comment-list">

                                                    <div className="comment-img" >
                                                        <img src={item.profile_image === '' ? img : 'https://thetalentclub.co.in/upload/profile/' + item.profile_image} alt="" />
                                                    </div>
                                                    <div className="comment">
                                                        <h3> {item.firstname} {item.lastname}</h3>
                                                        {/* <span><img src="images/clock.png" alt="" /> 3 min ago</span> */}
                                                        <p>{item.comment} </p>
                                                        <Link onClick={() => {

                                                            const data = {
                                                                comment_id: item.id
                                                            }
                                                            axios.post(`${BASE_URL}/delete_group_comment`, data)
                                                                .then((res) => {
                                                                    dispatch(getgroupCount(currentPostId))
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
                                        if (currentPostId !== null) {
                                            const data = {
                                                user_id: localStorage.getItem('user_id'),
                                                post_id: currentPostId, // Use the currentPostId
                                                comment: value.comment,
                                            };
                                            axios
                                                .post(`${BASE_URL}/add_group_comment`, data)
                                                .then((res) => {
                                                    dispatch(getgroupCount(currentPostId))
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

        </>

    )
}

export default GroupCard