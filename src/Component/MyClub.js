import CloseIcon from '@mui/icons-material/Close';
import loader from '../images/loader.gif'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { BASE_URL } from './BaseUrl';
import Loader from './Loader';
import _debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getgroupCount, getlikedata } from '../Store/CountActions';





const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MyClub = () => {
    const [loading, setLoading] = useState({});
    const [post, setPost] = useState([])
    const [Search, setSearch] = useState("")
    const [groupdata, setgroupData] = useState([]);
    const [likedata, setlikedata] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [comlike, setcomlike] = useState([]);
    const [open2, setOpen2] = React.useState(false);
    const [likecount, setlikeCount] = useState([]);
    const [clickedItemId, setClickedItemId] = useState(null);
    const [animate, setAnimate] = useState(null)
    const [value, setvalue] = useState({
        comment: '',
    });
    const handleImageLoad = (id) => {
        console.log(id)
        setLoading(false);
    };
    const longPressTimeout = useRef(null);

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

    const handleTouchEnd = () => {
        clearTimeout(longPressTimeout.current);
    };





    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const handleClickOpen2 = (id) => {
    //     setOpen2(true);
    //     dispatch(getgroupCount(id))
    //     getcommentlikeData();
    // };
    // const handleClose2 = () => {
    //     setOpen2(false);
    // };

    const onhandleClose = () => {
        dispatch(getgroupCount())

    }

    const dispatch = useDispatch();
    const comment = useSelector((state) => state.Count.groupcount);
    const currentPostId = useSelector((state) => state.Count.grouppostId);

    const settings = {
        dots: true,
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



    async function getgroupdata() {

        axios
            .get(`${BASE_URL}/group_all`)
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

    async function getcommentlikeData() {
        const data = {
            user_id: localStorage.getItem('user_id'),
        };
        axios
            .post(`${BASE_URL}/group_comment_like_data`, data)
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



    const onhandlechange = (event) => {
        setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };




    return (

        <div className='mainDash' style={{ overflow: "hidden" }}>
            <div className='  mb-4 w-100' style={{ position: "fixed", background: "white", left: "0px", top: "0px", zIndex: "2", marginTop: "58px" }} >
                <TextField className='w-100 ' id="outlined-basic" label="Search Group" variant="outlined" onClick={handleClickOpen} />
            </div>
            <div style={{ marginTop: "118px" }}>


                {post?.map((item, index) => {
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

                    return post?.data?.length === 0 ? (
                        <Loader />
                    ) : (
                        <div className='talent-post ' key={index} >
                            <div className='px-3 py-2 post-head d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <div className='post-img'>
                                        <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                                            <img src={`https://thetalentclub.co.in/upload/group_images/${item.image}`} alt='' />
                                        </SlideshowLightbox>
                                    </div>

                                    <h4 className='person-name px-2'>
                                        {item.name}
                                    </h4>
                                </div>
                                <div >
                                    <p className='follow'>follow</p>
                                </div>
                            </div>

                            <Slider {...settings}>
                                <div className='post-main-img' id='postclick' >
                                    {item?.post_images?.[0] && item.post_images?.[0].endsWith('.mp4') ? (
                                        <ReactPlayer url={`https://thetalentclub.co.in/upload/group_post_files/${item.post_images?.[0]}`} loop={false} playing={false} controls={true} playIcon={<button>Play</button>} />
                                    ) : (
                                        <>
                                            {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}
                                            <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                                                <img
                                                    src={`https://thetalentclub.co.in/upload/group_post_files/${item?.post_images?.[0]}`}
                                                    alt=''
                                                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onLoad={() => handleImageLoad(item.post_id)}
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
                                                    src={`https://thetalentclub.co.in/upload/group_post_files/${item}`}
                                                    alt=''
                                                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onLoad={() => handleImageLoad(item.post_id)}
                                                />
                                            </SlideshowLightbox>

                                        </div>
                                    );
                                })}

                            </Slider>







                            <div className='click-like' id='className1' style={{ display: 'none' }}>
                                <i className='ri-trophy-fill mx-2 text-danger'></i>
                            </div>
                            <div className='click-dislike' id='className2' style={{ display: 'none' }}>
                                <i className='ri-trophy-line mx-2 text-danger'></i>
                            </div>

                            <div className=' '>


                                {likecount?.filter(ele => ele.post_id === item.post_id)
                                    .map(filteredLike => {
                                        return (
                                            <div key={filteredLike.post_id}>
                                                {filteredLike.like_count !== null ? (
                                                    <p className='like-count' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal2'>

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



                                <div className='post-activity py-1 d-flex justify-content-between'>
                                    <div>

                                        <i className={likedata.some((ele) => ele.post_id === item.post_id) ? 'ri-trophy-fill mx-2 animate__animated animate__fadeInDown' : 'ri-trophy-line mx-2'} onClick={() => handlelike(item.post_id)}></i>
                                        <i
                                            className='ri-chat-1-line mx-2'
                                            type='button'
                                            data-bs-toggle='modal'
                                            data-bs-target='#exampleModal'
                                            onClick={() => dispatch(getgroupCount(item.post_id))}
                                        // onClick={() => handleClickOpen2(item.post_id)}

                                        ></i>
                                    </div>

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


                                <div className='px-2 py-2' style={{ width: "350px", overflow: "scroll" }}>
                                    <p className='post-title m-0 py-1'>{item.title}</p>
                                    {/* <p className='post-hash m-0 py-1'>
                                        {item.description.includes('#') ? (
                                            renderClickableText(item.description)
                                        ) : (
                                            )} 
                                    </p> */}
                                    <p className='item-desc '>{item.description}</p>
                                    <p style={{ fontSize: "12px" }}>{item.createdDate == null ? "--" : formattedDate}</p>

                                </div>
                            </div>

                            {/* <div className='modal fade' id='exampleModal2' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                            <div className='modal-dialog modal-fullscreen'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <h1 className='modal-title fs-5' id='exampleModalLabel'>
                                            User Like
                                        </h1>
                                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                    </div>
                                    <div className='modal-body'>

                                        <div className='d-flex align-items-center py-1' key={index}>
                                            <div className='post-img'>
                                                <img src="" alt='' />
                                            </div>
                                            <h4 className='person-name px-2'>

                                            </h4>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div> */}

                            <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                <div className='modal-dialog modal-fullscreen'>
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h1 className='modal-title fs-5' id='exampleModalLabel'>
                                                Comments &nbsp;({comment.length})
                                            </h1>
                                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={onhandleClose}></button>
                                        </div>
                                        <div className='modal-body' style={{ padding: "0px 10px" }}  >
                                            {comment?.map((item, index) => {
                                                return (
                                                    <div key={index}>

                                                        <div className={`comment-box d-flex align-items-center justify-content-between my-2 comm-box ${animate === item.id ? 'animate__animated animate__fadeOutRight' : ''}  ${clickedItemId === item.id ? 'bg-lightblue' : ''}`} id={`comm-box${item.id}`}   >
                                                            <button className='delete-ovr' onTouchEnd={handleTouchEnd} onTouchStart={() => handleTouchStart(item.id, item.user_id)}>Touch</button>
                                                            <div>
                                                                <p className='name-text'>
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
                                                                                axios.post(`${BASE_URL}/group_comment_like_delete`, data)
                                                                                    .then((res) => {
                                                                                        dispatch(getgroupCount(item.post_id))
                                                                                        getcommentlikeData()
                                                                                    })
                                                                            } else {
                                                                                axios.post(`${BASE_URL}/group_comment_like`, data)
                                                                                    .then((res) => {
                                                                                        dispatch(getgroupCount(item.post_id))
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
                                                                axios.post(`${BASE_URL}/delete_group_comment`, data)
                                                                    .then((res) => {
                                                                        dispatch(getgroupCount(currentPostId))
                                                                        getlikeCount()
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log(err)
                                                                    })
                                                            }}></i>
                                                        </div>
                                                    </div>
                                                )


                                            })}
                                        </div>

                                        <div className='modal-footer' style={{ display: 'block', position: 'relative' }}>
                                            <input type='text' placeholder='...' name='comment' value={value.comment} onChange={onhandlechange} />
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
                                                        <img src="" alt='' />
                                                    </div>
                                                </div>

                                                <div className='px-2 col-7'>
                                                    <h4 className='person-name m-0'>d</h4>
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


                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative', background: "#E73758" }}>
                        <Toolbar>

                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Group Search
                            </Typography>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div className='mx-2 my-3'>
                        <TextField className='w-100 ' id="outlined-basic" label="Search Group" variant="outlined" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className='mygrop-holder'>
                        {groupdata?.filter((item) => (item.title.toLowerCase()).includes(Search.toLowerCase())).map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className='px-1 py-2 post-head d-flex align-items-center justify-content-between'>
                                        <Link to={`/grouppost/${item.id}`}>
                                            <div className='d-flex align-items-center'>
                                                <div className='post-img'>
                                                    <img src={'https://thetalentclub.co.in/upload/group_images/' + item.image} alt='' />
                                                </div>
                                                <h4 className='person-name px-2'>{item.title}</h4>
                                            </div>
                                        </Link>
                                        <MoreVertIcon className=' dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false' />
                                        <ul className='dropdown-menu'>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component='nav' aria-labelledby='nested-list-subheader'>

                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <RssFeedIcon />
                                                    </ListItemIcon>
                                                    <Link to={`/grouppost/${item.id}`}>
                                                        <ListItemText primary='Group Posts' />
                                                    </Link>
                                                </ListItemButton>
                                            </List>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Dialog>
            </div>
        </div>
    )
}



export default MyClub