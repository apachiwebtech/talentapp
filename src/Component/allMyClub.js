import CloseIcon from "@mui/icons-material/Close";
import loader from "../images/loader.gif";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { BASE_URL } from "./BaseUrl";
import Loader from "./Loader";
import _debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { getgroupCount, getlikedata } from "../Store/CountActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MyClub = () => {
  const [loading, setLoading] = useState({});
  const [post, setPost] = useState([]);
  const [Search, setSearch] = useState("");
  const [groupdata, setgroupData] = useState([]);
const [cancelToken, setCancelToken] = useState(null);
  const [likedata, setlikedata] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [comlike, setcomlike] = useState([]);
  const [open2, setOpen2] = React.useState(false);
  const [likecount, setlikeCount] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(null);
  const [value, setvalue] = useState({
    comment: "",
  });
  const [joinedGroups, setJoinedGroups] = useState([]);
  const handleImageLoad = (id) => {
    // console.log(id)
    setLoading(false);
  };
  const longPressTimeout = useRef(null);

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
    dispatch(getgroupCount());
  };

  const dispatch = useDispatch();
  const comment = useSelector((state) => state.Count.groupcount);
  const currentPostId = useSelector((state) => state.Count.grouppostId);

  const settings = {
    dots: true,
  };
  async function getfollowpost() {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .post(`${BASE_URL}/follow_group`, data)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getfollowpost();
  }, []);

  // async function getgroupdata() {
  //   axios
  //     .get(`${BASE_URL}/group_all`)
  //     .then((res) => {
  //       setgroupData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // useEffect(() => {
  //   getgroupdata();
  // }, []);


  const searchGroup = async (value) => {

  if (value.trim() === "") {
    setgroupData([]);
    return;
  }

  if (cancelToken) {
    cancelToken.cancel("New request");
  }

  const newCancelToken = axios.CancelToken.source();

  setCancelToken(newCancelToken);

  axios.post(
    `${BASE_URL}/search_group`,
    {
      search: value,
    },
    {
      cancelToken: newCancelToken.token,
    }
  )
  .then((res) => {
    setgroupData(res.data);
  })
  .catch((err) => {

    if (axios.isCancel(err)) {
      return;
    }

    console.log(err);

  });

};



async function getJoinedGroups() {
  const data = {
    user_id: localStorage.getItem("user_id"),
  };

  axios.post(`${BASE_URL}/group_joindata`, data)
    .then((res) => {
      const ids = res.data.map((g) => g.group_id);
      setJoinedGroups(ids);
    })
    .catch((err) => console.log(err));
}

useEffect(() => {
  getJoinedGroups();
}, []);

const handleJoin = (group_id) => {
  const data = {
    group_id,
    user_id: localStorage.getItem("user_id"),
  };

  axios.post(`${BASE_URL}/join_group`, data)
    .then((res) => {

      // 1. update joined state instantly
      setJoinedGroups((prev) => [...prev, group_id]);

      // 2. REFRESH LATEST DATA (THIS IS WHAT YOU ASKED)
      getfollowpost();      // refresh posts
      getJoinedGroups();    // refresh join status

    })
    .catch((err) => console.log(err));
};

  async function getLikedata() {
    const data = {
      user_id: localStorage.getItem("user_id"),
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
    getLikedata();
  }, []);

  async function getlikeCount() {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .post(`${BASE_URL}/group_post_count`, data)
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

  const handlelike = _debounce((id) => {
    const data = {
      post_id: id,
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .post(`${BASE_URL}/group_like`, data)
      .then((res) => {
        getLikedata();
        getlikeCount();
      })
      .catch((err) => {
        console.log(err);
      });
  }, 200);

  async function getcommentlikeData() {
    const data = {
      user_id: localStorage.getItem("user_id"),
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
    <div className="mainDash" style={{ overflow: "hidden" }}>
   {/* ================= SEARCH BAR ================= */}

<div
  className="w-100 px-2 py-2"
  style={{
    position: "fixed",
    background: "#fff",
    left: "0",
    top: "58px",
    zIndex: "999",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
  }}
>

  <div style={{ position: "relative" }}>

    {/* SEARCH INPUT */}

 <TextField
  className="w-100"
  id="outlined-basic"
  label="Search Group"
  variant="outlined"
  value={Search}
  onChange={(e) => {

    setSearch(e.target.value);

    searchGroup(e.target.value);

  }}
/>

    {/* SEARCH SUGGESTION BOX */}

    {

      Search.trim() !== "" && (

        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "#fff",
            borderRadius: "14px",
            marginTop: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            maxHeight: "350px",
            overflowY: "auto",
            zIndex: 9999
          }}
        >

          {

           groupdata?.map((item, index) => {

                return (

                  <Link
                    key={index}
                    to={`/grouppost/${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#111827"
                    }}
                    onClick={() => setSearch("")}
                  >

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        borderBottom: "1px solid #f3f4f6",
                        transition: "0.3s"
                      }}
                    >

                      {/* GROUP IMAGE */}

                      <img
                        src={`https://thetalentclub.co.in/upload/group_images/${item.image}`}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #f3f4f6"
                        }}
                      />

                      {/* GROUP DETAILS */}

                      <div style={{ flex: 1 }}>

                        <h6
                          style={{
                            margin: 0,
                            fontWeight: "600",
                            fontSize: "15px",
                            color: "#111827"
                          }}
                        >
                          {item.title}
                        </h6>

                        <p
                          style={{
                            margin: "3px 0 0 0",
                            fontSize: "12px",
                            color: "#6b7280"
                          }}
                        >
                          Tap to open group
                        </p>

                      </div>

                    </div>

                  </Link>
                )
              })
          }

          {/* NO GROUP FOUND */}

          {

           groupdata.length === 0 && (

              <div
                style={{
                  padding: "18px",
                  textAlign: "center",
                  color: "#6b7280",
                  fontWeight: "500"
                }}
              >
                No groups found
              </div>
            )
          }

        </div>
      )
    }

  </div>

</div>

{/* ================= POST LIST ================= */}

<div style={{ marginTop: "130px" }}>

  {post?.map((item, index) => {

    const timestampStr = item.createdDate;
    const timestamp = new Date(timestampStr);

    let dd = timestamp.getDate();
    let mm = timestamp.getMonth() + 1;
    let yy = timestamp.getFullYear().toString().substr(-2);

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    const formattedDate = dd + "-" + mm + "-" + yy;

    return post?.data?.length === 0 ? (

      <Loader />

    ) : (

      <div className="talent-post" key={index}>

        {/* POST HEADER */}

        <div className="px-3 py-2 post-head d-flex align-items-center justify-content-between">

          <div className="d-flex align-items-center">

            <div className="post-img">

              <SlideshowLightbox
                iconColor="#000"
                backgroundColor="#fff"
              >

                <img
                  src={`https://thetalentclub.co.in/upload/group_images/${item.image}`}
                  alt=""
                />

              </SlideshowLightbox>

            </div>

            <h4 className="person-name px-2" onClick={() => navigate(`/grouppost/${item.group_id}`)}>
              {item.name}
            </h4>

          </div>

          <div>

           {joinedGroups.includes(item.group_id) ? (
  <p className="follow" style={{ color: "green" }}>
    Joined
  </p>
) : (
  <p
    className="follow"
    style={{ cursor: "pointer" }}
    onClick={() => handleJoin(item.group_id)}
  >
    Join
  </p>
)}

          </div>

        </div>

        {/* POST IMAGE */}

        <Slider {...settings}>

          <div className="post-main-img" id="postclick">

            {

              item?.post_images?.[0] &&
              item.post_images?.[0].endsWith(".mp4") ? (

                <ReactPlayer
                  url={`https://thetalentclub.co.in/upload/group_post_files/${item.post_images?.[0]}`}
                  loop={false}
                  playing={false}
                  controls={true}
                />

              ) : (

                <>

                  {

                    loading && (

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
                    )
                  }

                  <SlideshowLightbox
                    iconColor="#000"
                    backgroundColor="#fff"
                  >

                    <img
                      src={`https://thetalentclub.co.in/upload/group_post_files/${item?.post_images?.[0]}`}
                      alt=""
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onLoad={() => handleImageLoad(item.post_id)}
                    />

                  </SlideshowLightbox>

                </>
              )
            }

          </div>

        </Slider>

        {/* POST CONTENT */}

        <div className="px-2 py-2">

          <p className="post-title m-0 py-1">
            {item.title}
          </p>

          <p className="item-desc">
            {item.description}
          </p>

          <p style={{ fontSize: "12px" }}>
            {item.createdDate == null ? "--" : formattedDate}
          </p>

        </div>

      </div>
    )
  })}

</div>
    </div>
  );
};

export default MyClub;
