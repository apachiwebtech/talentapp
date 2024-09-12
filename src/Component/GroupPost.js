import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import _debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { getgroupCount } from '../Store/CountActions';
import loader from '../images/loader.gif';
import satyamimg from '../images/satyam.jpg';
import { BASE_URL } from './BaseUrl';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const GroupPost = () => {
  const [getpost, setPost] = useState([]);
  const [joindata, setJoindata] = useState({})
  const params = useParams();
  const { groupid } = params
  const [likedata, setlikedata] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [comlike, setcomlike] = useState([]);
  const [likecount, setlikeCount] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [animate, setAnimate] = useState(null)
  const [hide, setHide] = useState("")
  const [progress, setprogress] = useState(false)
  const [error, setError] = useState("")
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setvalue] = useState({
    comment: '',
    title: '',
    description: '',
    user_id: localStorage.getItem('user_id'),
  });
  const handleImageLoad = () => {
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

  async function handleImageUpload(event) {
    const file = event.target.files[0];

    // Check if the file has a valid extension
    // const allowedExtensions = ['png', 'jpg', 'jpeg', 'mp4'];
    // const fileExtension = file.name.split('.').pop().toLowerCase();
    // if (!allowedExtensions.includes(fileExtension)) {
    //   console.log('Invalid file type. Please upload a .png, .jpg, or .mp4 file.');
    //   return;
    // }

    // console.log(file, "jhsd");
    // console.log('file instanceof Blob', file instanceof Blob); // true
    // console.log(`file size ${file.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      let convertedFile;

      if (file.type.includes('video')) {
        setImage(file)
      } else {
        // Handle image file using imageCompression library
        const compressedFile = await imageCompression(file, options);
        // console.log("nbchjvbhj");
        // console.log(compressedFile);
        // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        // Convert Blob to File with the desired extension
        const fileName = `compressedFile.${file.type.split('/').pop()}`;
        convertedFile = new File([compressedFile], fileName, { type: file.type });
        await setImage(convertedFile);
      }


      // You can replace the following line with your own logic to handle the converted file
    } catch (error) {
      console.log(error);
    }
  }





  const dispatch = useDispatch();
  const comment = useSelector((state) => state.Count.groupcount);
  const currentPostId = useSelector((state) => state.Count.grouppostId);

  const settings = {
    dots: true,
  };

  async function getgroupdata() {
    fetch(`${BASE_URL}/group_posts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const filteredData = data.filter((element) => element.id == groupid);
        // const filteredData = data
        // console.log(filteredData)
        setPost(filteredData);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getgroupdata();
  }, [groupid]);


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

  const onhandleclick = () => {
    const data = {
      group_id: groupid,
      user_id: localStorage.getItem("user_id")
    }
    axios.post(`${BASE_URL}/join_group`, data)
      .then((res) => {
        groupjoindetail()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function groupjoindetail() {
    const data = {
      user_id: localStorage.getItem("user_id")
    }
    axios.post(`${BASE_URL}/group_joindata`, data)
      .then((res) => {
        setJoindata(res)
      })
  }

  useEffect(() => {
    groupjoindetail()
  }, [])

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



  const handleSubmit = async (event) => {
    event.preventDefault();



    if (value.title !== "" && value.discription !== "" && image !== "") {

      setprogress(true)
      setHide("Please Wait...")

      const data = {
        title: value.title,
        description: value.description,
        user_id: value.user_id,
        group_id: groupid,
      }


      axios.post(`${BASE_URL}/group_post_disc`, data).then((res) => {
        if (res.data.post_id) {
          localStorage.setItem('post_id', res.data.post_id);

        }
        const post_id = res.data.post_id;


        const formData = new FormData();
        formData.append('image', image);
        formData.append('post_id', post_id);
        formData.append('group_id', groupid);

        setTimeout(() => {
          fetch(`${BASE_URL}/group_post_upload`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            })
            .finally(() => {
              setprogress(false)
              setHide("")
              getgroupdata()
              setOpen(false);
            })
        }, 3000);
      });
    }
    else {
      setError("Please fill the all feild")
      setTimeout(() => {

        setError("")
      }, 3000);
    }



  };

  const onhandlechange = (event) => {
    setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const loggeduser = localStorage.getItem('userName');
  return (
    <div>
      <div className='d-flex mb-2 justify-content-evenly pt70'>
        {joindata?.data?.some((ele) => ele.group_id == groupid) ?
          <button className='btn btn-danger btn-sm' onClick={handleClickOpen}>Add Post</button> : null}
        {joindata?.data?.some((ele) => ele.group_id == groupid) ?
          null : <button className='btn btn-danger btn-sm' onClick={onhandleclick}>Join Group</button>}
      </div>
      <div className='mainDash'>
        {getpost.map((item, index) => {
          return (
            <div className='talent-post ' key={index}>

              <div className='px-3 py-2 post-head d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <div className='post-img'>
                    <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                      <img src={'https://thetalentclub.co.in/upload/group_images/' + item.image} alt='' />
                    </SlideshowLightbox>
                  </div>
                  <h4 className='person-name px-2'>{item.title}</h4>
                </div>
              </div>

              <Slider {...settings}>
                <div className='post-main-img' id='postclick'>
                  {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}
                  <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                    <img src={'https://thetalentclub.co.in/upload/group_post_files/' + item.post} alt='' onLoad={handleImageLoad} />
                  </SlideshowLightbox>
                </div>

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
                <div className='px-2 py-2'>
                  <p className='post-title m-0 py-1'>
                    <b>{item.post_title}</b>
                  </p>
                  <p className='item-desc'>{item.description}</p>
                </div>
              </div>







              <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog modal-fullscreen'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-5' id='exampleModalLabel'>
                        Comments &nbsp;({comment.length})
                      </h1>
                      <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body' style={{ padding: "0px 10px" }}  >
                      {comment?.map((item, index) => {
                        return (
                          <div key={index}>

                            <div className={`comment-box d-flex align-items-center justify-content-between my-2 comm-box  ${clickedItemId === item.id ? 'bg-lightblue' : ''}`} id={`comm-box${item.id}`}   >
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
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle>Add Post</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>

            <section id='section0' className=' targetDiv'>
              <form onSubmit={handleSubmit} method='POST'>
                {progress ? <LinearProgress sx={{ color: "red" }} /> : null}
                <div>
                  <input className='autosuggestion' type='text' name='title' id='title' placeholder='Title' style={{ backgroundColor: '#fff' }} onChange={onhandlechange} />
                  <label htmlFor='title' className='errormesssage' id='title_err'></label>
                </div>
                
                <div data-emojiarea data-type='unicode' data-global-picker='false'>
                  <textarea className='form-control textarea-control' name='description' id='discription' rows='2' onChange={onhandlechange} placeholder='About Post or #tag' spellCheck='false'></textarea>
                  <label htmlFor='description' className='errormesssage' id='description_err'></label>
                </div>

                <div className='drag-area'>
                  <h5>
                    <span>Add Photos/Videos</span>
                  </h5>

                  <div className='fileinput'>
                    <input type='file' id='file_post' name='post' accept="image/*,video/*" onChange={handleImageUpload} />

                    <label htmlFor='file_post'>Browse</label>
                  </div>

                  <div id='imagepath1'></div>
                  <div className='gall'></div>
                </div>

                <div className='keywords-label'></div>

                <button type='submit' className='done-btn w-100'>
                  Done
                </button>
                <span className='text-primary'>{hide}</span>
                <span className='text-danger'>{error}</span>
              </form>
            </section>



          </DialogContent>
        </BootstrapDialog>

      </div>
    </div>
  );
};

export default GroupPost;
