import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import $ from 'jquery';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Carousel } from 'react-responsive-carousel';

import { getCount } from "../Store/CountActions";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import img from '../Assets/userimg.jpg';
import satyamimg from '../images/satyam.jpg';
import { BASE_URL } from './BaseUrl';
import Slider from 'react-slick';
import { SlideshowLightbox } from 'lightbox.js-react';
import { LinearProgress } from '@mui/material';
import _debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Mypost = () => {
  const loggeduser = localStorage.getItem('userName');
  const profile_img = localStorage.getItem('profile_pic');
  const [post, setgetpost] = useState({});
  const [likecount, setlikeCount] = useState([])
  const longPressTimeout = useRef(null);
  const [comment, setcomments] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [progress, setprogress] = useState(false)
  const [comlike, setcomlike] = useState([]);
  const [animate, setAnimate] = useState(null)
  const [userlike, setUserlike] = useState([]);
  // const [currentPostId, setCurrentPostId] = useState(null);
  const [value, setvalue] = useState({
    comment: '',
  });
  const [likedata, setlikedata] = useState([]);

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

  useEffect(() => {
    getDatapost();
  }, []);

  const handleClose = () => {
    setUserlike("");
  }

  async function getDatapost() {
    const data = {
      user_id: localStorage.getItem('user_id'),
    };
    axios
      .post(`${BASE_URL}/posts`, data)
      .then((res) => {
        setgetpost(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const handleLike = async (id) => {
  //   const data = {
  //     post_id: id,
  //     user_id: localStorage.getItem('user_id'),
  //   };
  //   if (likedata.some((item) => item.post_id === id)) {
  //     axios.post(`${BASE_URL}/post_unlike`, data);
  //   } else {
  //     axios.post(`${BASE_URL}/post_like`, data);
  //   }

  //   getlikedata();
  //   getDatapost();
  // };
  const dispatch = useDispatch();
  const count = useSelector((state) => state.Count.count);
  const currentPostId = useSelector((state) => state.Count.postId);

  useEffect(() => {
    handleLike();
  }, []);

  async function getlikedata() {
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
    handleLike();
  }, []);

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



  const handlePostdelete = async (id) => {
    setprogress(true)
    const data = {
      user_id: localStorage.getItem('user_id'),
      post_id: id,
    };

    axios
      .post(`${BASE_URL}/remove_post`, data)
      .then((res) => {
        getDatapost();
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setprogress(false)
      })

  };

  const onhandlelikeuser = async (id) => {
    axios
      .post(`${BASE_URL}/post_like_user`, { post_id: id })
      .then((res) => {
        // console.log(res);
        setUserlike(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleLike = _debounce((id) => {
    const data = {
      post_id: id,
      user_id: localStorage.getItem("user_id")
    }
    axios
      .post(`${BASE_URL}/dash_post_like`, data)
      .then((res) => {

        getlikedata();
        getlikeCount()
      })
      .catch((err) => {
        console.log(err);
      });


  }, 200)

  const onhandlechange = (event) => {
    setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const settings = {
    dots: true,
  };


  return (
    <div className='mainDash'>
      {post?.data?.map((item, index) => {
        const handleWordClick = (word) => {
          // Define the logic for handling clicks based on the clicked word
          console.log(`Clicked on: ${word}`);
          // Add your own logic to navigate or perform actions based on the clicked word
        };

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


        return (

          <div className='talent-post mt70' key={index}>
            {progress ? <LinearProgress sx={{ color: "red" }} /> : null}
            <div className='px-3 py-2 post-head d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <div className='post-img'>
                  <SlideshowLightbox iconColor="#000" backgroundColor='#fff' >
                    <img src={item.profile_image === '' ? img : 'https://thetalentclub.co.in/upload/profile/' + item.profile_image} alt='' />
                  </SlideshowLightbox>
                </div>

                <h4 className='person-name px-2'>{loggeduser}</h4>
              </div>
              <DeleteOutlineIcon onClick={() => handlePostdelete(item.post_id)} />
            </div>

            <Slider {...settings}>
              <div className='post-main-img' id='postclick' >
                <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                  {item.post && item.post.endsWith('.mp4') ? <ReactPlayer url={`https://thetalentclub.co.in/upload/post_files/${item.post}`} loop={true} playing={true} /> : <img src={`https://thetalentclub.co.in/upload/post_files/${item?.post_images?.[0]}`} alt='' />}
                </SlideshowLightbox>
              </div>
              {/* <div className='post-main-img'>
                <img src={satyamimg} alt='' />
              </div>
              <div className='post-main-img'>
                <img src={satyamimg} alt='' />
              </div> */}
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
                            <span className='like-count' style={{ fontSize: "15px" }} type='button' >
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
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
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
                    <input type='text' placeholder='...' name='comment' onChange={onhandlechange} />
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

                              setvalue({
                                comment: ""
                              })
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
  );
};
