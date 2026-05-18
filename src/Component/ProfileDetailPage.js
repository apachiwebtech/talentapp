import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "./BaseUrl";
import img from "../Assets/userimg.jpg";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import _debounce from "lodash.debounce";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getCount } from "../Store/CountActions";
import getPoints from "../Store/DashboardMarksActions";
import cup from "../images/achievments.png";
import loader from "../images/loader.gif";
import logo from "../images/logo.png";
import satyamimg from "../images/satyam.jpg";
import DashBarProgress from "./DashBarProgress";
import Loader from "./Loader";
import { Browser } from "@capacitor/browser";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileDetailPage = () => {
  const [getfollow, setFollow] = useState([]);
  const [follower, setFollower] = useState([]);
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post, setgetpost] = useState([]);
  const [followinfo, setFollowdata] = useState([]);
  const [likedata, setlikedata] = useState([]);
  const [comlike, setcomlike] = useState([]);
  const [userlike, setUserlike] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [likecount, setlikeCount] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [animate, setAnimate] = useState(null);
  const [user, setUser] = useState({});
  const longPressTimeout = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTitle, setExpandedTitle] = useState({});
  const param = useParams();
  const { profileid } = param;

  const loggeduser = localStorage.getItem("userName");
  const handleTouchStart = (event, id) => {
    event.preventDefault();

    if (event.type === "touchstart" && event.touches.length === 1) {
      longPressTimeout.current = setTimeout(() => {
        if (event.touches.length === 1) {
          setClickedItemId((prevId) => (prevId === id ? null : id));
        }
      }, 1000);
    }
  };
  const handleTouchEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const onhandleClose = () => {
    dispatch(getCount());
  };

  const [value, setvalue] = useState({
    comment: "",
  });

  const dispatch = useDispatch();
  const count = useSelector((state) => state.Count.count);
  const currentPostId = useSelector((state) => state.Count.postId);

  async function userdetailsget() {
    const data = {
      user_id: profileid,
    };
    axios
      .post(`${BASE_URL}/user_detail_get`, data)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    userdetailsget();
  }, []);

  async function getDatapost() {
    const data = {
      user_id: profileid,
    };
    axios
      .post(`${BASE_URL}/posts`, data)
      .then((res) => {
        setgetpost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getDatapost();
  }, []);

  async function getLikedata() {
    const data = {
      user_id: profileid,
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
    getLikedata();
  }, []);

  async function getlikeCount() {
    const data = {
      user_id: profileid,
    };
    axios
      .post(`${BASE_URL}/dash_post_count`, data)
      .then((res) => {
        setlikeCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getlikeCount();
  }, []);

  async function getcommentlikeData() {
    const data = {
      user_id: profileid,
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

  const handleLike = _debounce((id) => {
    const data = {
      post_id: id,
      user_id: profileid,
    };
    axios
      .post(`${BASE_URL}/dash_post_like`, data)
      .then((res) => {
        getLikedata();
        getlikeCount();
      })
      .catch((err) => {
        console.log(err);
      });
  }, 200);

  const deletePost = async (post_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) return;

    try {
      await axios.post(`${BASE_URL}/delete_post`, {
        post_id: post_id,
        user_id: localStorage.getItem("user_id"),
      });

      // remove post from UI
      setgetpost((prev) => prev.filter((p) => p.post_id !== post_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/follow_data`, {
        user_id: profileid,
      });

      setFollowdata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const followdata = followinfo;

  const onhandleClick = async (id) => {
    const data = {
      follow_user_id: id,
      user_id: profileid,
    };
    if (followdata.some((item) => item.follow_user_id === id)) {
      axios.post(`${BASE_URL}/unfollow_user`, data);
      fetchData();
    } else {
      axios.post(`${BASE_URL}/follow_user`, data);
      fetchData();
    }
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

  const handleClose = () => {
    setUserlike("");
  };

  async function proflepost() {}
  useEffect(() => {
    proflepost();
  }, []);

  useEffect(() => {
    const data = {
      user_id: profileid,
    };

    async function getfollowing() {
      axios
        .post(`${BASE_URL}/following`, data)
        .then((res) => {
          setFollow(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getfollowing();
  }, []);

  useEffect(() => {
    const data = {
      user_id: profileid,
    };

    async function getPosts() {
      axios
        .post(`${BASE_URL}/posts_count`, data)
        .then((res) => {
          setposts(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getPosts();
  }, []);

  useEffect(() => {
    const data = {
      user_id: profileid,
    };

    async function getfollower() {
      axios
        .post(`${BASE_URL}/follower`, data)
        .then((res) => {
          setFollower(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getfollower();
  }, []);

  const onhandlechange = (event) => {
    setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const settings = {
    dots: true,
  };

  const handleImageLoad2 = () => {
    console.log("Image loaded successfully!");
    setIsLoading(false);
  };

  const Shareprofile = async (profileid) => {
    // window.open(`https://webapp.thetalentclub.co.in/profileshare/${profileid}`, '_blank');
    await Browser.open({
      url: `https://webapp.thetalentclub.co.in/profileshare/${profileid}`,
    });
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="page-container">
        {user?.data?.length === 0 ? (
          <>
            <Loader />
          </>
        ) : (
          user?.data?.map((item, index) => {
            return (
              <div className="tab-content" key={index}>
                <div className="tab-pane active">
                  <div className="myprofile-holder">
                    <div className="myprofile-img">
                      <div className="img-frame">
                        <div className="profile-pic">
                          <div
                            style={{
                              width: "103px",
                              height: "120px",
                              borderRadius: "20px",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#e9ecef",
                            }}
                          >
                            {item?.profile_image ? (
                              <SlideshowLightbox
                                iconColor="#000"
                                backgroundColor="#fff"
                              >
                                <img
                                  src={`https://thetalentclub.co.in/upload/profile/${item.profile_image}`}
                                  alt="profile"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                  onLoad={handleImageLoad2}
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.parentElement.nextSibling?.classList.remove(
                                      "d-none",
                                    );
                                  }}
                                />
                              </SlideshowLightbox>
                            ) : (
                              <span
                                style={{
                                  fontSize: "55px",
                                  fontWeight: "600",
                                  color: "#e73758",
                                  textTransform: "uppercase",
                                }}
                              >
                                {`${item?.firstname?.charAt(0) || ""}${
                                  item?.lastname?.charAt(0) || ""
                                }` || "U"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="myprofile-des"
                      style={{ position: "relative" }}
                    >
                      <div className="profiledetails">
                        <h2 id="h1_username">
                          {item.firstname} {item.lastname}
                        </h2>
                        <h4 id="h1_designation">{item.designation}</h4>
                        <h4 id="h1_designation">{item.address}</h4>
                      </div>
                      <p
                        className="edit-p mt-3 py-1"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.bio ? item.bio : "No bio added"}
                      </p>

                      <p
                        className="edit-p mt-3 py-1 share-profile"
                        onClick={() => Shareprofile(item.id)}
                      >
                        Share Profile <i class="ri-share-forward-line"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="card">
          <div className="followstatus row p-2">
            {follower?.data?.map((item, index) => {
              return (
                <div className="text-center col-4" key={index}>
                  <p>Followers</p>
                  <span>{item.follower}</span>
                </div>
              );
            })}
            {getfollow?.data?.map((item, index) => {
              return (
                <div className="text-center col-4" key={index}>
                  <p>Following</p>
                  <span>{item.following === null ? 0 : item.following}</span>
                </div>
              );
            })}
            {posts?.data?.map((item, index) => {
              return (
                <div className="text-center col-4" key={index}>
                  <p>Posts</p>
                  <span>{item.post === null ? 0 : item.post}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ background: "white" }}>
        {post?.map((item, index) => {
          const timestampStr = item.createdDate; // Assuming item.createdDate is the timestamp string
          const timestamp = new Date(timestampStr);

          // Extract day, month, and year
          let dd = timestamp.getDate();
          let mm = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
          let yy = timestamp.getFullYear().toString().substr(-2); // Get last two digits of the year

          // Pad day and month with leading zeros if necessary
          if (dd < 10) {
            dd = "0" + dd;
          }
          if (mm < 10) {
            mm = "0" + mm;
          }

          // Concatenate to get the desired format
          const formattedDate = dd + "-" + mm + "-" + yy;

          const handleWordClick = (word) => {
            // Define the logic for handling clicks based on the clicked word
            console.log(`Clicked on: ${word}`);
            // Add your own logic to navigate or perform actions based on the clicked word
          };

          const renderClickableText = (text) => {
            const words = text.split("#");
            const elements = [];

            for (let i = 0; i < words.length; i++) {
              const word = words[i];

              if (word !== "") {
                elements.push(
                  <Link
                    key={i}
                    to={`/postlistingpage/${word}`}
                    className="post-hash m-0 py-1"
                    onClick={() => handleWordClick(word)}
                  >
                    {word}
                  </Link>,
                );

                if (i < words.length - 1) {
                  // Add the '#' separator between words (excluding the last word)
                  elements.push(
                    <span key={`sep${i}`} style={{ color: "blue" }}>
                      #
                    </span>,
                  );
                }
              }
            }

            return elements;
          };

          return post?.data?.length === 0 ? (
            <Loader />
          ) : (
            <div className="talent-post " key={index}>
              <div className="px-3 py-2 post-head d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="post-img" style={{ width: 50, height: 50 }}>
                    {item?.profile_image?.trim() ? (
                      <SlideshowLightbox
                        iconColor="#000"
                        backgroundColor="#fff"
                      >
                        <img
                          src={`https://thetalentclub.co.in/upload/profile/${item.profile_image}`}
                          alt="profile"
                          width="50"
                          height="50"
                          className="rounded-circle"
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";

                            // show initials
                            const fallback =
                              e.target.parentElement.nextElementSibling;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      </SlideshowLightbox>
                    ) : null}

                    {/* ✅ INITIALS — OUTSIDE LIGHTBOX */}
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "#e73758",
                        color: "#fff",
                        display: item?.profile_image?.trim() ? "none" : "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: "16px",
                        textTransform: "uppercase",
                      }}
                    >
                      {(item?.firstname?.charAt(0) || "") +
                        (item?.lastname?.charAt(0) || "") || "U"}
                    </div>
                  </div>

                  <h4 className="person-name px-2">
                    {item.firstname} {item.lastname}
                  </h4>
                </div>
                {/* {Number(localStorage.getItem("user_id")) !==
                  Number(item.user_id) && (
                  <div onClick={() => onhandleClick(item.user_id)}>
                    <p className="follow">
                      {followdata.some(
                        (ele) => ele.follow_user_id === item.user_id,
                      )
                        ? "Following"
                        : "Follow"}
                    </p>
                  </div>
                )} */}
                {Number(localStorage.getItem("user_id")) ===
                Number(item.user_id) ? (
                  <div>
                    <p
                      className="follow text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => deletePost(item.post_id)}
                    >
                      Remove
                    </p>
                  </div>
                ) : (
                  <div onClick={() => onhandleClick(item.user_id)}>
                    <p className="follow">
                      {followdata.some(
                        (ele) => ele.follow_user_id === item.user_id,
                      )
                        ? "Following"
                        : "Follow"}
                    </p>
                  </div>
                )}
              </div>
              <p className="post-title m-0 py-1 m-1">
                <b>
                  {item.title.length > 40
                    ? expandedTitle[item.post_id]
                      ? item.title
                      : item.title.slice(0, 100) + "..."
                    : item.title}
                </b>

                {item.title.length > 40 && (
                  <span
                    onClick={() =>
                      setExpandedTitle((prev) => ({
                        ...prev,
                        [item.post_id]: !prev[item.post_id],
                      }))
                    }
                    style={{
                      color: "#0d6efd",
                      cursor: "pointer",
                      marginLeft: "5px",
                      fontSize: "13px",
                    }}
                  >
                    {expandedTitle[item.post_id] ? "Show Less" : "Show More"}
                  </span>
                )}
              </p>
              <Slider {...settings}>
                <div className="post-main-img" id="postclick">
                  {item?.post_images?.[0] &&
                  item.post_images?.[0].endsWith(".mp4") ? (
                    <ReactPlayer
                      url={`https://thetalentclub.co.in/upload/post_files/${item.post_images?.[0]}`}
                      loop={false}
                      playing={false}
                      controls={true}
                      playIcon={<button>Play</button>}
                    />
                  ) : (
                    <>
                      {loading && (
                        <div>
                          <img
                            src={loader}
                            style={{
                              width: "70px",
                              position: "absolute",
                              left: "50%",
                              transform: "translateX(-50%)",
                            }}
                            alt=""
                          />
                        </div>
                      )}
                      <SlideshowLightbox
                        iconColor="#000"
                        backgroundColor="#fff"
                      >
                        <img
                          src={`https://thetalentclub.co.in/upload/post_files/${item?.post_images?.[0]}`}
                          alt=""
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onLoad={handleImageLoad}
                          // onClick={() => toggleModal(`https://thetalentclub.co.in/upload/post_files/${item?.post_images?.[0]}`)}
                        />
                      </SlideshowLightbox>
                    </>
                  )}
                </div>
                {item.post_images.slice(1).map((item, index) => {
                  return (
                    <div className="post-main-img" id="postclick" key={index}>
                      {loading && (
                        <div>
                          <img
                            src={loader}
                            style={{
                              width: "70px",
                              position: "absolute",
                              left: "50%",
                              transform: "translateX(-50%)",
                            }}
                            alt=""
                          />
                        </div>
                      )}
                      <SlideshowLightbox
                        iconColor="#000"
                        backgroundColor="#fff"
                      >
                        <img
                          src={`https://thetalentclub.co.in/upload/post_files/${item}`}
                          alt=""
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onLoad={handleImageLoad}
                        />
                      </SlideshowLightbox>
                    </div>
                  );
                })}
              </Slider>

              <div
                className="click-like"
                id="class1"
                style={{ display: "none" }}
              >
                <i className="ri-trophy-fill mx-2 text-danger"></i>
              </div>
              <div
                className="click-dislike"
                id="class2"
                style={{ display: "none" }}
              >
                <i className="ri-trophy-line mx-2 text-danger"></i>
              </div>
              <div className=" ">
                <div
                  className="px-2 py-2"
                  style={{ width: "350px", overflow: "scroll" }}
                >
                  {item.description.includes("#") ? (
                    renderClickableText(item.description)
                  ) : (
                    <p className="item-desc">{item.description}</p>
                  )}

                  <p style={{ fontSize: "12px" }}>
                    {item.createdDate == null ? "--" : formattedDate}
                  </p>
                </div>

                {likecount
                  ?.filter((ele) => ele.post_id === item.post_id)
                  .map((filteredLike) => {
                    return (
                      <div key={filteredLike.post_id}>
                        {filteredLike.like_count !== null ? (
                          <p
                            className="like-count"
                            onClick={() => onhandlelikeuser(item.post_id)}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal2"
                          >
                            {filteredLike.like_count}{" "}
                            <i className="ri-trophy-fill"></i>
                          </p>
                        ) : (
                          <p className="like-count">
                            0 <i className="ri-trophy-line"></i>
                          </p>
                        )}
                      </div>
                    );
                  })}
                <div
                  className="post-activity py-1 d-flex justify-content-between align-items-center"
                 
                >
                  <div className="d-flex align-items-center"  style={{ paddingBottom: "5rem" }}>
                    {/* Like Icon */}
                    <div
                      className="d-flex align-items-center mx-2"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={
                          likedata.some((ele) => ele.post_id === item.post_id)
                            ? "ri-trophy-fill"
                            : "ri-trophy-line"
                        }
                        id="like1"
                        onClick={() => handleLike(item.post_id)}
                        style={{ fontSize: "20px" }}
                      ></i>
                    </div>

                    {/* Comment Icon */}
                    <div
                      className="d-flex align-items-center mx-2"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="ri-chat-1-line"
                        onClick={() => dispatch(getCount(item.post_id))}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ fontSize: "20px" }}
                      ></i>
                      {likecount
                        ?.filter((ele) => ele.post_id === item.post_id)
                        .map((filteredLike) => {
                          return (
                            <span
                              key={filteredLike.post_id}
                              className="px-1 d-flex align-items-center"
                            >
                              {filteredLike.comment_count !== null ? (
                                <span
                                  className="like-count"
                                  style={{
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal2"
                                >
                                  {filteredLike.comment_count}
                                </span>
                              ) : null}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="exampleModal2"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-fullscreen">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        User Like
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                      ></button>
                    </div>
                    <div className="modal-body2 p-2">
                      {userlike?.data?.map((item, index) => {
                        return (
                          <div
                            className="d-flex align-items-center py-1"
                            key={index}
                          >
                            <div className="post-img">
                              <img
                                src={
                                  item.profile_image === ""
                                    ? img
                                    : "https://thetalentclub.co.in/upload/profile/" +
                                      item.profile_image
                                }
                                alt=""
                              />
                            </div>
                            <h4 className="person-name px-2">
                              {item.firstname} {item.lastname}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-fullscreen">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Comments &nbsp;({count.length})
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={onhandleClose}
                      ></button>
                    </div>

                    <div className="modal-body" style={{ padding: "0px 10px" }}>
                      {count?.map((item, index) => {
                        return (
                          <Link to={`/profiledetailpage/${item.user_id}`}>
                            <div key={index}>
                              <div
                                className={`comment-box d-flex align-items-center justify-content-between my-2 ${animate === item.id ? "animate__animated animate__fadeOutRight" : ""} ${clickedItemId === item.id ? "bg-lightblue" : ""}`}
                                key={index}
                                onTouchEnd={handleTouchEnd}
                                onTouchStart={(event) =>
                                  handleTouchStart(event, item.id)
                                }
                              >
                                <div>
                                  <p className="name-text">
                                    {" "}
                                    {item.firstname} {item.lastname}
                                  </p>
                                  <p className="comment">{item.comment}</p>
                                </div>

                                <div className="d-flex">
                                  <div>
                                    <span
                                      className="fw-small"
                                      onClick={() => {
                                        const selectComment_id = item.id;

                                        const data = {
                                          comment_id: selectComment_id,
                                          user_id:
                                            localStorage.getItem("user_id"),
                                        };
                                        if (
                                          comlike.some(
                                            (ele) =>
                                              ele.comment_id ===
                                              selectComment_id,
                                          )
                                        ) {
                                          axios
                                            .post(
                                              `${BASE_URL}/comment_like_delete`,
                                              data,
                                            )
                                            .then((res) => {
                                              dispatch(getCount(item.post_id));
                                              getcommentlikeData();
                                            });
                                        } else {
                                          axios
                                            .post(
                                              `${BASE_URL}/comment_like`,
                                              data,
                                            )
                                            .then((res) => {
                                              dispatch(getCount(item.post_id));
                                              getcommentlikeData();
                                            });
                                        }
                                      }}
                                    >
                                      <span>{item.like_count} </span>
                                    </span>
                                    <i
                                      className={
                                        comlike.some(
                                          (ele) => ele.comment_id === item.id,
                                        )
                                          ? "ri-thumb-up-fill"
                                          : "ri-thumb-up-line"
                                      }
                                      onClick={() => {
                                        const selectComment_id = item.id;

                                        const data = {
                                          comment_id: selectComment_id,
                                          user_id:
                                            localStorage.getItem("user_id"),
                                        };
                                        if (
                                          comlike.some(
                                            (ele) =>
                                              ele.comment_id ===
                                              selectComment_id,
                                          )
                                        ) {
                                          axios
                                            .post(
                                              `${BASE_URL}/comment_like_delete`,
                                              data,
                                            )
                                            .then((res) => {
                                              dispatch(getCount(item.post_id));
                                              getcommentlikeData();
                                            });
                                        } else {
                                          axios
                                            .post(
                                              `${BASE_URL}/comment_like`,
                                              data,
                                            )
                                            .then((res) => {
                                              dispatch(getCount(item.post_id));
                                              getcommentlikeData();
                                            });
                                        }
                                      }}
                                    ></i>
                                  </div>
                                  {/* <div className="mx-2">
                                  <i className="ri-reply-line"></i>
                                  <span className="fw-bold">Reply</span>
                                </div> */}
                                </div>
                              </div>
                              <div
                                className={`delete-btn text-center ${animate === item.id ? "animate__animated animate__fadeOutRight" : ""} ${clickedItemId === item.id ? "delete-trans" : ""}`}
                                style={{ height: "30px", display: "none" }}
                                id={`del-box${item.id}`}
                              >
                                <i
                                  className="ri-delete-bin-5-line text-light"
                                  onClick={() => {
                                    setAnimate((prevId) =>
                                      prevId === item.id ? null : item.id,
                                    );
                                    const data = {
                                      comment_id: item.id,
                                    };
                                    axios
                                      .post(
                                        `${BASE_URL}/delete_user_comment`,
                                        data,
                                      )
                                      .then((res) => {
                                        dispatch(getCount(currentPostId));
                                        getlikeCount();
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  }}
                                ></i>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div
                      className="modal-footer"
                      style={{ display: "block", position: "relative" }}
                    >
                      <input
                        type="text"
                        placeholder="..."
                        name="comment"
                        value={value.comment}
                        onChange={onhandlechange}
                      />
                      <i
                        className="ri-send-plane-2-line sent"
                        onClick={() => {
                          if (currentPostId !== null) {
                            const data = {
                              user_id: localStorage.getItem("user_id"),
                              post_id: currentPostId, // Use the currentPostId
                              comment: value.comment,
                            };
                            axios
                              .post(`${BASE_URL}/add_comment`, data)
                              .then((res) => {
                                dispatch(getCount(currentPostId));
                                getlikeCount();
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }

                          setvalue({
                            comment: "",
                          });
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="exampleModal1"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Share With
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="social-share d-flex justify-content-between">
                        <div className="soc-d">
                          <i className="ri-whatsapp-line"></i>
                        </div>
                        <div className="soc-d">
                          <i className="ri-instagram-line"></i>
                        </div>
                        <div className="soc-d">
                          <i className="ri-twitter-line"></i>
                        </div>
                        <div className="soc-d">
                          <i className="ri-facebook-line"></i>
                        </div>
                        <div className="soc-d">
                          <i className="ri-attachment-line"></i>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal-footer"
                      style={{ display: "block", position: "relative" }}
                    >
                      <input type="text" placeholder="Search" />
                      <div className="Sharelist row align-items-center my-3">
                        <div className="col-2">
                          <div className="post-img">
                            <img src={satyamimg} alt="" />
                          </div>
                        </div>

                        <div className="px-2 col-7">
                          <h4 className="person-name m-0">{loggeduser}</h4>
                          <p className="user_name m-0">happiest</p>
                        </div>
                        <div className="col-3">
                          <button className="send-btn">Send</button>
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
    </div>
  );
};

export default ProfileDetailPage;
