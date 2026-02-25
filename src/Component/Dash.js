import Slide from "@mui/material/Slide";
import axios from "axios";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import _debounce from "lodash.debounce";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import img from "../Assets/userimg.jpg";
import { getCount } from "../Store/CountActions";
import getPoints from "../Store/DashboardMarksActions";
import cup from "../images/achievments.png";
import cal from "../images/daily-habit.png";
import run from "../images/endurance.png";
import loader from "../images/loader.gif";
import logo from "../images/logo.png";
import satyamimg from "../images/satyam.jpg";
import { BASE_URL, IMG_ADVERTSIMENT_URL } from "./BaseUrl";
import DashBarProgress from "./DashBarProgress";
import Loader from "./Loader";
import { red } from "@mui/material/colors";
import "../dash.css";
import { Browser } from "@capacitor/browser";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dash = () => {
  const loggeduser = localStorage.getItem("userName");
 const navigate = useNavigate();
const dispatch = useDispatch();
const count = useSelector((state) => state.Count.count);
const currentPostId = useSelector((state) => state.Count.postId);

  const Lastname = localStorage.getItem("Lastname");
  const [loading, setLoading] = useState({});
  const [proloading, setProLoading] = useState(true);
  const [post, setgetpost] = useState([]);
  const [getaddvertsiment, setgetaddvertsiment] = useState([]);
  const [followinfo, setFollowdata] = useState([]);
  const [likedata, setlikedata] = useState([]);
  const [comlike, setcomlike] = useState([]);
  const [userlike, setUserlike] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [lastid, setLastid] = useState();
  const [likecount, setlikeCount] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [animate, setAnimate] = useState(null);
  const longPressTimeout = useRef(null);
  const [announce, setAnnounce] = useState([]);
  const [prodata, setPro] = useState([]);
  const [addcount, setCount] = useState(0);
  const [advertisement_pages, setadvertisement_pages] = useState(1);

  const [show, setShow] = useState(false);

  const tapedTwice = useRef(false);

  const handleTouchStart = (id, userid) => {
    const user_id = localStorage.getItem("user_id");

    if (user_id == userid) {
      longPressTimeout.current = setTimeout(() => {
        setClickedItemId((prevId) => (prevId === id ? null : id));
      }, 1000);
    } else {
      console.log("id does not match");
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  const handleImageLoad = (id) => {
    // console.log(id)

    setLoading(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const onhandleclose = () => {
    dispatch(getCount());
  };

  const [value, setvalue] = useState({
    comment: "",
  });

  useEffect(() => {
    getDatapost();
    getlikeCount();
  }, []);

  const handleScroll = _debounce(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      getDatapost();
      console.log("calling........");
    }
  }, 200);

  async function getProfiledata() {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .post(`${BASE_URL}/profile_data`, data)
      .then((res) => {
        setPro(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProfiledata();
  }, []);

  useEffect(() => {
    // Add an event listener to the scroll event
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastid]);

  useEffect(() => {
    dispatch(getPoints());
  }, []);

  // const dispatch = useDispatch();
  // const count = useSelector((state) => state.Count.count);
  // const currentPostId = useSelector((state) => state.Count.postId);

  const profile_img = localStorage.getItem("profile_pic");

  let addvertsimentid = 0;

  async function getDatapost() {
    const data = {
      post_id: lastid,
      advertisement_pages: advertisement_pages,
    };
    axios
      .post(`${BASE_URL}/dash_post`, data)
      .then((res) => {
        // console.log('API call succeeded');
        setCount(addcount + 1);
        console.log('Post count:', res.data.advertisements);

        setLastid(res.data.lastPostId);
        setgetpost((prevData) => [...prevData, ...res.data.result]);
        setgetaddvertsiment(() => [...res.data.advertisements]);
        setadvertisement_pages(res.data.advertisement_pages + 1);

        setShow(true);
        // if (addcount % 2 == 0) {
        // fetchAdvertisement();
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getanounce() {
    axios
      .get(`${BASE_URL}/announcement`)
      .then((res) => {
        setAnnounce(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getanounce();
  }, []);

  async function getLikedata() {
    const data = {
      user_id: localStorage.getItem("user_id"),
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

  async function getlikeCount() {
    const data = {
      user_id: localStorage.getItem("user_id"),
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

  async function getcommentlikeData() {
    const data = {
      user_id: localStorage.getItem("user_id"),
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

  // const handleLike = async (id) => {
  //   const data = {
  //     post_id: id,
  //     user_id: localStorage.getItem('user_id'),
  //   };
  //   if (likedata.some((item) => item.post_id === id)) {
  //     axios
  //       .post(`${BASE_URL}/post_unlike`, data)
  //       .then((res) => {
  //         getLikedata();
  //         getlikeCount()

  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     axios
  //       .post(`${BASE_URL}/post_like`, data)
  //       .then((res) => {
  //         getLikedata();
  //         getlikeCount()
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  // };

 const handleLike = useRef(
  _debounce((id) => {
    const data = {
      post_id: id,
      user_id: localStorage.getItem("user_id"),
    };
    axios.post(`${BASE_URL}/dash_post_like`, data).then(() => {
      getLikedata();
      getlikeCount();
    });
  }, 200)
).current;

  const tapHandler = async (id) => {
  if (!tapedTwice.current) {
    tapedTwice.current = true;

    setTimeout(() => {
      tapedTwice.current = false;
    }, 300);

    return;
  }

  const data = {
    post_id: id,
    user_id: localStorage.getItem("user_id"),
  };

  axios.post(`${BASE_URL}/dash_post_like`, data).then(() => {
    getLikedata();
    getlikeCount();
  });
};

  const fetchData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/follow_data`, {
        user_id: localStorage.getItem("user_id"),
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
      user_id: localStorage.getItem("user_id"),
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

  const onhandlechange = (event) => {
    setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const settings = {
    dots: true,
  };

  const handleProLoad = () => {
    setProLoading(false);
  };

  const gotoweb = async () => {
    const advertisementId =
      getaddvertsiment.length > 0 ? getaddvertsiment[0].id : null; // Get the ID of the first advertisement

    if (advertisementId) {
      try {
        // Send the post_id and advertisement_id to the API to update the click count
        const res = await axios.post(`${BASE_URL}/updateAdClickCount`, {
          advertisement_id: advertisementId,
        });
        console.log(res.data); // Handle the response if needed (e.g., store data in state)

        // If the API call is successful, open the URL of the advertisement
        await Browser.open({
          url: getaddvertsiment.map((item) =>
            item.link.startsWith("http://") || item.link.startsWith("https://")
              ? item.link
              : `http://${item.link}`,
          )[0], // Ensure you're opening a single link
        });
      } catch (err) {
        console.log("Error during API request or opening browser:", err);
        // Handle the error (e.g., show a notification to the user)
      }
    } else {
      console.log("No advertisement found.");
      // Handle the case where there are no advertisements (optional)
    }
  };

  const PullToRefresh = ({ onRefresh, children }) => {
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [isPulling, setIsPulling] = useState(false);

    useEffect(() => {
      const handleTouchStart = (e) => {
        if (window.scrollY === 0) {
          setStartY(e.touches[0].clientY);
        }
      };

      const handleTouchMove = (e) => {
        if (startY > 0 && window.scrollY === 0) {
          const distance = e.touches[0].clientY - startY;
          if (distance > 0) {
            setCurrentY(distance);
            setIsPulling(true);
            // Prevent default behavior to avoid page scrolling
            e.preventDefault();
          }
        }
      };

      const handleTouchEnd = () => {
        if (isPulling) {
          // Trigger refresh if enough pull distance
          if (currentY > 100) {
            // Adjust threshold as needed
            onRefresh();
          }
          setCurrentY(0);
          setIsPulling(false);
        }
      };

      window.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }, [isPulling, startY, currentY, onRefresh]);

    return (
      <>
        <div
          className={`pull-indicator ${isPulling ? "visible" : ""}`}
          style={{ height: `${Math.min(currentY, 200)}px` }} // Adjust height as needed
        ></div>
        <div>{children}</div>
      </>
    );
  };

  const handleRefresh = () => {
    // Refresh logic here
    console.log("Refreshing...");
    window.location.reload(); // Reload the page
  };

  return (
    <div className="mainDash" style={{ overflow: "hidden" }}>
      <PullToRefresh onRefresh={handleRefresh}>
        {prodata.map((item) => {
          return (
            <div className="headerWrapper">
              <div className="userpart d-flex align-items-center justify-content-between">
                {/* <div className='logo-img'>
                    {proloading && <div><img src={loader} alt='' /></div>}
                    <img src={profile_img === '' ? img : `https://thetalentclub.co.in/upload/profile/${item.profile_image}`} alt='profile' onClick={togglePopup} onLoad={handleProLoad} />
                  </div> */}
                <div
                  className="logo-img"
                  style={{ position: "relative", width: 40, height: 40 }}
                >
                  {proloading && item?.profile_image?.trim() && (
                    <div>
                      <img src={loader} alt="" />
                    </div>
                  )}

                  {/* PROFILE IMAGE */}
                  {item?.profile_image?.trim() && (
                    <img
                      src={`https://thetalentclub.co.in/upload/profile/${item.profile_image}`}
                      alt="profile"
                      // onClick={togglePopup}
                      onClick={() => navigate("/profile")}
                      // onLoad={() => setProLoading(false)}
                      onError={(e) => {
                        setProLoading(false);
                        e.target.style.display = "none";
                      }}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  {/* INITIALS — only when NO image */}
                  {!item?.profile_image?.trim() && (
                    <div
                      // onClick={togglePopup}
                      onClick={() => navigate("/profile")}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#0d6efd",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: "14px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                    >
                      {(item?.firstname?.charAt(0) || "") +
                        (item?.lastname?.charAt(0) || "") || "U"}
                    </div>
                  )}
                </div>

                {/* {showPopup && (
                    <div className="popup34">
                      <span className="close" onClick={togglePopup}>
                        &times;
                      </span>
                       <img src={profile_img === '' ? img : `https://thetalentclub.co.in/upload/profile/${item.profile_image}`} alt='profile' /> 
                      {item?.profile_image?.trim() ? (
                        <img
                          src={`https://thetalentclub.co.in/upload/profile/${item.profile_image}`}
                          alt="profile"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover"
                          }}
                        />
                      ) : null}
                    </div>
                  )} */}

                <div className="user_nameHolder d-flex justify-content-between">
                  <div className="">
                    <Link to="/profile">
                      <h2
                        id="loggedin_name"
                        className="animate__animated animate__bounce"
                      >
                        {item.firstname} {item.lastname}
                      </h2>
                    </Link>
                  </div>
                </div>
                <div className="text-end">
                  <img src={logo} width="100px" alt="logo" />
                </div>
              </div>
            </div>
          );
        })}

        <div className="talentscoretext animate__animated animate__fadeInRight">
          <div className="roundscore " style={{ position: "relative" }}>
            <div
              className="scrore-round"
              style={{
                backgroundColor: "",
                position: "absolute",
                top: "3px",
                left: "10px",
              }}
            >
              <DashBarProgress />
              <h1 id="cat_avg_all"></h1>
            </div>
            {/* <img src={round} width='100px' alt='round' /> */}
          </div>
          <Link
            to="/questionaire/5"
            className="yellow-strip d-flex justify-content-end p-2 my-1"
          >
            <div className="px-2">
              <p className="ach-bottom">Achievement</p>
              <p className="comp-text">Completed</p>
            </div>
            <div className="px-2">
              <i className="ri-arrow-right-line"></i>
            </div>
            <div className="px-2">
              <img src={cup} alt="cup" />
            </div>
          </Link>
          <Link
            to="/questionaire/6"
            className="yellow-strip green-strip d-flex justify-content-end p-2 mb-1"
          >
            <div className="px-2">
              <p className="ach-bottom">Daily habits</p>
              <p className="comp-text">Completed</p>
            </div>
            <div className="px-2">
              <i className="ri-arrow-right-line"></i>
            </div>
            <div className="px-2">
              <img src={cal} alt="cup" />
            </div>
          </Link>
          <Link
            to="/questionaire/7"
            className="yellow-strip red-strip d-flex justify-content-end p-2"
          >
            <div className="px-2">
              <p className="ach-bottom">Fitness</p>
              <p className="comp-text">Completed</p>
            </div>
            <div className="px-2">
              <i className="ri-arrow-right-line"></i>
            </div>
            <div className="px-2">
              <img src={run} alt="cup" />
            </div>
          </Link>
        </div>

        {announce.map((item, index) => {
          return (
            <div key={index}>
              <div className="Announcement">
                <img
                  src={
                    "https://thetalentclub.co.in/upload/announcement/" +
                    item.image
                  }
                  width="100%"
                  alt=""
                />
              </div>
            </div>
          );
        })}

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
            <>
              <div className="talent-post " key={index}>
                <div className="px-3 py-2 post-head d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    {/* <div className='post-img'>
                      <SlideshowLightbox iconColor="#000" backgroundColor='#fff'>
                        <img src={item.profile_image === '' ? img : 'https://thetalentclub.co.in/upload/profile/' + item.profile_image} alt='' />
                      </SlideshowLightbox >
                    </div> */}
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
                              e.target.parentElement.nextSibling.style.display =
                                "flex";
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
                          background: "#0d6efd",
                          color: "#fff",
                          display: item?.profile_image?.trim()
                            ? "none"
                            : "flex",
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
                    <Link to={`/profiledetailpage/${item.user_id}`}>
                      <h4 className="person-name px-2">
                        {item.firstname} {item.lastname} 
                        {/* {index} {index % 5} */}
                      </h4>
                    </Link>
                  </div>
                  <div onClick={() => onhandleClick(item.user_id)}>
                    <p className="follow">
                      {followdata.some(
                        (ele) => ele.follow_user_id === item.user_id,
                      )
                        ? "Following"
                        : "Follow"}
                    </p>
                  </div>
                </div>

                <Slider {...settings}>
                  <div
                    className="post-main-img"
                    id="postclick"
                    onClick={() => tapHandler(item.post_id)}
                  >
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
                            onLoad={() => handleImageLoad(index)}
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
                            onLoad={() => handleImageLoad(index)}
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

                  <div className="post-activity py-1 d-flex justify-content-between align-items-center">
                    <div>
                      <i
                        className={
                          likedata.some((ele) => ele.post_id === item.post_id)
                            ? "ri-trophy-fill mx-2"
                            : "ri-trophy-line mx-2"
                        }
                        id="like1"
                        onClick={() => handleLike(item.post_id)}
                      ></i>

                      <i
                        className="ri-chat-1-line mx-2"
                        onClick={() => dispatch(getCount(item.post_id))}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        {" "}
                      </i>
                    </div>
                    <div>
                      {likecount
                        ?.filter((ele) => ele.post_id === item.post_id)
                        .map((filteredLike) => {
                          return (
                            <span key={filteredLike.post_id} className="px-2">
                              {filteredLike.comment_count !== null ? (
                                <span
                                  className="like-count"
                                  style={{ fontSize: "15px" }}
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal2"
                                >
                                  {filteredLike.comment_count} comment
                                </span>
                              ) : (
                                <span className="like-count">No comment</span>
                              )}
                            </span>
                          );
                        })}
                    </div>
                  </div>

                  <div
                    className="px-2 py-2"
                    style={{ width: "350px", overflow: "scroll" }}
                  >
                    <p className="post-title m-0 py-1">
                      <b>{item.title}</b>
                    </p>
                    {item.description.includes("#") ? (
                      renderClickableText(item.description)
                    ) : (
                      <p className="item-desc">{item.description}</p>
                    )}

                    <p style={{ fontSize: "12px" }}>
                      {item.createdDate == null ? "--" : formattedDate}
                    </p>
                  </div>
                </div>
              </div>
              
              {index % 5 == 0 ? (
                  <div className="talent-post">
                    {/* <SlideshowLightbox iconColor="#000" backgroundColor='#fff'> */}
                    <Link to={`${getaddvertsiment.map((item) => item.link)}`}>
                    <img
                      src={`${IMG_ADVERTSIMENT_URL}${getaddvertsiment.map((item) => item.image_path)}`}
                      alt=""
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onLoad={() => handleImageLoad(index)}
                    />
                    <div className="d-flex justify-content-between border-2 align-items-center p-2 bg-light border-top">
                      <span className="text-dark  ">
                        <b>{getaddvertsiment.map((item) => item.vtitle)}</b>
                      </span>
                      <button
                        onClick={gotoweb}
                        className="btn btn-sm btn-primary rounded-2"
                      >
                        {getaddvertsiment.map((item) => item.vbtitle)}
                      </button>
                    </div>

                    </Link>
                    {/* </SlideshowLightbox> */}
                  </div>
                ) : null
              }
            </>
          );
        })}
      </PullToRefresh>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
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
                  <div className="d-flex align-items-center py-1" key={index}>
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
                onClick={onhandleclose}
              ></button>
            </div>

            <div className="modal-body" style={{ padding: "0px 10px" }}>
              {count?.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className={`comment-box d-flex align-items-center justify-content-between my-2 ${animate === item.id ? "animate__animated animate__fadeOutRight" : ""} ${clickedItemId === item.id ? "bg-lightblue" : ""}`}
                      key={index}
                    >
                      <button
                        className="delete-ovr"
                        onTouchEnd={handleTouchEnd}
                        onTouchStart={() =>
                          handleTouchStart(item.id, item.user_id)
                        }
                      >
                        Touch
                      </button>
                      <div>
                        <p className="name-text">
                          {" "}
                          {item.firstname} {item.lastname}
                        </p>
                        <p className="comment">{item.comment}</p>
                      </div>

                      <div className="d-flex">
                        <div>
                          <i
                            className={
                              comlike.some((ele) => ele.comment_id === item.id)
                                ? "ri-thumb-up-fill"
                                : "ri-thumb-up-line"
                            }
                            onClick={() => {
                              const selectComment_id = item.id;

                              const data = {
                                comment_id: selectComment_id,
                                user_id: localStorage.getItem("user_id"),
                              };
                              if (
                                comlike.some(
                                  (ele) => ele.comment_id === selectComment_id,
                                )
                              ) {
                                axios
                                  .post(`${BASE_URL}/comment_like_delete`, data)
                                  .then((res) => {
                                    dispatch(getCount(item.post_id));
                                    getcommentlikeData();
                                  });
                              } else {
                                axios
                                  .post(`${BASE_URL}/comment_like`, data)
                                  .then((res) => {
                                    dispatch(getCount(item.post_id));
                                    getcommentlikeData();
                                  });
                              }
                            }}
                          ></i>
                          <span className="fw-bold">
                            <span>{item.like_count} </span>Like
                          </span>
                        </div>
                        <div className="mx-2">
                          <i className="ri-reply-line"></i>
                          <span className="fw-bold">Reply</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`delete-btn text-center ${animate === item.id ? "animate__animated animate__fadeOutRight" : ""} ${clickedItemId === item.id ? "delete-trans" : ""}`}
                      style={{ height: "30px", display: "none" }}
                      id={`del-box${item.id}`}
                      onClick={() => {
                        setAnimate((prevId) =>
                          prevId === item.id ? null : item.id,
                        );
                        const data = {
                          comment_id: item.id,
                        };
                        axios
                          .post(`${BASE_URL}/delete_user_comment`, data)
                          .then((res) => {
                            dispatch(getCount(currentPostId));
                            getlikeCount();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      <i className="ri-delete-bin-5-line text-light"></i>
                    </div>
                  </div>
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
};

export default Dash;

