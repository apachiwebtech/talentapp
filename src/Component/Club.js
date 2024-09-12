import satyamimg from '../images/satyam.jpg';
import img from '../Assets/userimg.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import $ from 'jquery';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { getCount, getlikedata } from "../Store/CountActions";
import { getPostlikecount } from '../Store/CountActions';
import ReactPlayer from 'react-player/lazy'
import { BASE_URL } from './BaseUrl';
import Loader from './Loader';
const Club = () => {
  const [info, setInfo] = useState([]);
  const [followinfo, setFollowdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedata, setlikedata] = useState([]);
  const [comlike, setcomlike] = useState([]);
  const [likecount, setlikeCount] = useState([])
  const [userlike, setUserlike] = useState([]);
  const [lastid, setLastid] = useState();
  const [value, setvalue] = useState({
    comment: '',
  });

  const handleImageLoaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    getpost()
  }, [])



  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;


    if (scrollTop + clientHeight >= scrollHeight - 10) {

      getpost();

    }
  };

  useEffect(() => {
    // Add an event listener to the scroll event
    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastid]);






  const dispatch = useDispatch();
  const count = useSelector((state) => state.Count.count);
  const like_data = useSelector((state) => state.Count.likedata);
  const post_like_data = useSelector((state) => state.Count.postLikeData);
  const currentPostId = useSelector((state) => state.Count.postId);






  async function getpost() {
    const data = {
      user_id: localStorage.getItem('user_id'),
      post_id: lastid
    };
    axios
      .post(`${BASE_URL}/follo_post`, data)
      .then((res) => {
        if (res.data.length == 1) {

          setLastid(res.data.lastPostId)
        } else {
          setLastid(null)

        }
        setInfo((prevData) => [...prevData, ...res.data.result]);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // async function getlikeCount() {
  //   const data = {
  //     user_id: localStorage.getItem('user_id'),
  //   };
  //   axios
  //     .post(`${BASE_URL}/post_count`, data)
  //     .then((res) => {
  //       setlikeCount(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }





  // async function getlikedata() {
  //   const data = {
  //     user_id: localStorage.getItem('user_id'),
  //   };
  //   axios
  //     .post(`${BASE_URL}/post_like_data`, data)
  //     .then((res) => {
  //       setlikedata(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // useEffect(() => {
  //   handleLike();
  // }, []);

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



  const handleLike = (id) => {
    const data = {
      post_id: id,
      user_id: localStorage.getItem('user_id'),
    };

    if (post_like_data.some((item) => item.post_id === id)) {
      axios.post(`${BASE_URL}/post_unlike`, data);
   
    } else {
      axios.post(`${BASE_URL}/post_like`, data);
    
    }
    dispatch(getlikedata())
    dispatch(getPostlikecount())
  };

  useEffect(() => {
    handleLike()
    }, [])
  
  const tapHandler = async (id) => {
    if (!tapedTwice) {
      tapedTwice = true;
      setTimeout(function () {
        tapedTwice = false;
      }, 300);
      return false;
    }
    
    const data = {
      post_id: id,
      user_id: localStorage.getItem('user_id'),
    };
    if (post_like_data.some((item) => item.post_id === id)) {
      axios.post(`${BASE_URL}/post_unlike`, data);
      $('.click-dislike').fadeIn();
      setTimeout(function () {
        $('.click-dislike').fadeOut();
      }, 500);
    } else {
      axios.post(`${BASE_URL}/post_like`, data);
      $('.click-like').fadeIn();
      setTimeout(function () {
        $('.click-like').fadeOut();
      }, 500);
    }
    
    dispatch(getlikedata());
    dispatch(getPostlikecount())
    // getpost();
  };
  

  // const handlecomment = async (id) => {
  //   const Post_id = id;
  //   const data = { post_id: Post_id };
  //   axios
  //     .post(`${BASE_URL}/comment`, data)
  //     .then((response) => {
  //       setcomments(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   setCurrentPostId(Post_id);
  // };

  // useEffect(() => {
  //   handlecomment();
  // }, []);
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
  
  const onhandleClick = async (id) => {
    const data = {
      follow_user_id: id,
      user_id: localStorage.getItem('user_id'),
    };
    if (followdata.some((item) => item.follow_user_id === id)) {
      axios.post(`${BASE_URL}/unfollow_user`, data);
    } else {
      axios.post(`${BASE_URL}/follow_user`, data);
    }
    
    fetchData();
  };

  const onhandlechange = (event) => {
    setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const followdata = followinfo;

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

  return (
    <div className='talent-post mt70'>
      {info?.map((item, index) => {
        return (
          <div key={index}>
            <div className='px-3 py-2 post-head d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <div className='post-img'>
                  <img src={item.profile_image === '' ? img : `https://thetalentclub.co.in/upload/profile/` + item.profile_image} alt='' />
                </div>
                <h4 className='person-name px-2'>
                  {item.firstname} {item.lastname}
                </h4>
              </div>
              <div>
                <div onClick={() => onhandleClick(item.user_id)}>
                  <p className='follow'>{followdata.some((ele) => ele.follow_user_id == item.user_id) ? 'Following' : 'Follow'}</p>
                </div>
              </div>
            </div>

            <Carousel showThumbs={false}>
              <div className='post-main-img' id='postclick' onClick={() => tapHandler(item.post_id)}>
                {item.post && item.post.endsWith('.mp4') ? <ReactPlayer url={`https://thetalentclub.co.in/upload/post_files/${item.post}`} loop={false} playing={false} controls={true} stopOnUnmount={true} /> : (<>{loading && (<Loader />)}<img src={item.post ? `https://thetalentclub.co.in/upload/post_files/${item.post}` : img} alt='' style={{ display: loading ? 'none' : 'block', width: '100%', height: '100%', objectFit: 'cover' }} onLoad={handleImageLoaded} /></>)}
              </div>
          
            </Carousel>
            <div className='click-like' style={{ display: 'none' }}>
              <i className='ri-trophy-fill mx-2 text-danger'></i>
            </div>
            <div className='click-dislike' style={{ display: 'none' }}>
              <i className='ri-trophy-line mx-2 text-danger'></i>
            </div>
         

            {like_data?.filter(ele => ele.post_id === item.post_id)
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

            <div className=' '>

              <div className='post-activity py-1'>
                <i className={post_like_data.some((ele) => ele.post_id === item.post_id) ? 'ri-trophy-fill mx-2' : 'ri-trophy-line mx-2'} id='like1' onClick={() => handleLike(item.post_id)}></i>
                <i className='ri-chat-1-line mx-2' onClick={() => dispatch(getCount(item.post_id))} type='button' data-bs-toggle='modal' data-bs-target='#exampleModal'></i>
                <i className='ri-send-plane-line mx-2 ' data-bs-toggle='modal' data-bs-target='#exampleModal1'></i>
              </div>
              <div className='px-2 py-2'>
                <p className='post-title m-0 py-1'>
                  <b>{item.title}</b>
                </p>
                <p className='post-hash m-0 py-1'>{item.description}</p>
              </div>
            </div>
            <div className='modal fade' id='exampleModal2' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
              <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>
                      User Like
                    </h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
                    {userlike?.data?.map((item, index) => {
                      return (
                        <div className='d-flex align-items-center py-1' key={index}>
                          <div className='post-img'>
                            <img src={item.profile_image === '' ? img : `https://thetalentclub.co.in/upload/profile/` + item.profile_image} alt='' />
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
              <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>
                      Comments
                    </h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
                    {count?.map((item, index) => {
                      return (
                        <div className='comment-box d-flex align-items-center justify-content-between my-2' key={index}>
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
                                onClick={(event, value) => {
                                  const selectComment_id = item.id;

                                  const data = {
                                    comment_id: selectComment_id,
                                    user_id: localStorage.getItem('user_id'),
                                  };
                                  if (comlike.some((ele) => ele.comment_id === selectComment_id)) {
                                    axios.post(`${BASE_URL}/comment_like_delete`, data);
                                    dispatch(getCount(item.post_id))
                                  } else {
                                    axios.post(`${BASE_URL}/comment_like`, data);
                                    dispatch(getCount(item.post_id))
                                  }
                                  getcommentlikeData();
                                  // handlecomment()
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
                            post_id: currentPostId,
                            comment: value.comment,
                          };
                          axios
                            .post(`${BASE_URL}/add_comment`, data)
                          dispatch(getCount(currentPostId))
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          // getpost();
                          // handlecomment()
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
                        <h4 className='person-name m-0'>Satyam_Satkar</h4>
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

export default Club;

$(document).ready(function () {
  $('#btn-1').dblclick(function () {
    $('.show').show();
  });
});

var tapedTwice = false;
