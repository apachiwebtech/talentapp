import React, { useEffect, useState } from 'react';
import plus from '../images/plus-icon.png';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MyBucketList = () => {

  const [value, setValue] = useState({
    interested: '',
    title: '',
    user_id: localStorage.getItem('user_id')
  });

  const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [to_do, setTodo] = useState({});
  const [done, setDone] = useState({});
  const [categories, setCategories] = useState([]);

  // EDIT STATE
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');

  // ================= SWITCH =================

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ================= ADD / UPDATE =================

  const handleSubmit = (e) => {

    e.preventDefault();

    // UPDATE
    if (isEdit) {

      axios.post(`${BASE_URL}/update_bucket_list`, {
        bucket_id: editId,
        bucket_category: value.interested,
        bucket_title: value.title
      })

        .then((res) => {

          getTodolist();
          getdonelist();

          setIsEdit(false);
          setEditId('');

          setValue({
            interested: '',
            title: '',
            user_id: localStorage.getItem('user_id')
          });

          setIsAddBoxVisible(false);
        })

        .catch((err) => {
          console.log(err);
        });

      return;
    }

    // ADD

    const selectedData = isChecked ? 'done' : 'to_do';

    axios.post(`${BASE_URL}/add_bucket_list`, {
      ...value,
      selectedData,
    })

      .then((res) => {

        getTodolist();
        getdonelist();

        setValue({
          interested: '',
          title: '',
          user_id: localStorage.getItem('user_id')
        });

        setIsAddBoxVisible(false);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // ================= GET TODO =================

  async function getTodolist() {

    const data = {
      user_id: localStorage.getItem("user_id")
    };

    axios.post(`${BASE_URL}/to_do`, data)

      .then((res) => {
        setTodo(res);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  // ================= GET DONE =================

  async function getdonelist() {

    const data = {
      user_id: localStorage.getItem("user_id")
    };

    axios.post(`${BASE_URL}/done_list`, data)

      .then((res) => {
        setDone(res);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  // ================= DONE BUTTON =================

  const onhandledone = async (id) => {

    const data = {
      user_id: localStorage.getItem('user_id'),
      bucket_id: id,
      done: "done"
    };

    axios.post(`${BASE_URL}/done`, data)

      .then((res) => {
        getTodolist();
        getdonelist();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // ================= EDIT =================

  const handleEdit = (item) => {

    setIsEdit(true);

    setEditId(item.id);

    setValue({
      interested: item.bucket_category,
      title: item.bucket_title,
      user_id: localStorage.getItem('user_id')
    });

    setIsAddBoxVisible(true);
  };

  // ================= DELETE =================

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure want to delete this goal?"
    );

    if (!confirmDelete) return;

    axios.post(`${BASE_URL}/delete_bucket_list`, {
      bucket_id: id
    })

      .then((res) => {

        getTodolist();
        getdonelist();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // ================= TOGGLE MODAL =================

  const toggleAddBox = () => {

    setIsAddBoxVisible((prev) => !prev);

    if (isAddBoxVisible) {

      setIsEdit(false);

      setEditId('');

      setValue({
        interested: '',
        title: '',
        user_id: localStorage.getItem('user_id')
      });
    }
  };

  // ================= CATEGORY =================

  const getCategory = async () => {

    const response = await fetch(`${BASE_URL}/getcategory`);

    const data = await response.json();

    setCategories(data);
  };

  // ================= USE EFFECT =================

  useEffect(() => {

    getTodolist();
    getdonelist();
    getCategory();

  }, []);

  return (

    <div className='page-container'>

      {/* HEADER */}

      <div className='mybucket-list'>

        <div className='switch-btn d-flex justify-content-center'>

          <label className='switch btn-color-mode-switch'>

            <input
              type='checkbox'
              name='color_mode'
              id='color_mode'
              className='switch-input'
              value='1'
              checked={isChecked}
              onChange={handleSwitchChange}
            />

            <label
              htmlFor='color_mode'
              data-on='Done'
              data-off='To Do'
              className='btn-color-mode-switch-inner switch-label'
            ></label>

          </label>

        </div>

      </div>

      {/* CONTENT */}

      <div className='mt-3'>

        {

          isChecked ? (

            // ================= DONE LIST =================

            <div>

              {

                done?.data?.length > 0 ? (

                  done?.data?.map((item, Index) => {

                    return (

                      <div
                        className='card p-3 bucket-card my-2'
                        key={Index}
                        style={{
                          borderRadius: "16px",
                          border: "none",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
                        }}
                      >

                        <div className='d-flex justify-content-between align-items-start'>

                          {/* LEFT */}

                          <div style={{ width: "100%" }}>

                            <div className='d-flex align-items-center flex-wrap'>

                              <b style={{ fontSize: "16px" }}>
                                {Index + 1}.
                              </b>

                              <span
                                style={{
                                  background: "#dcfce7",
                                  color: "#15803d",
                                  padding: "4px 12px",
                                  borderRadius: "30px",
                                  fontSize: "12px",
                                  marginLeft: "10px",
                                  fontWeight: "600"
                                }}
                              >
                                {item.bucket_category}
                              </span>

                            </div>

                            <p
                              style={{
                                textAlign: "left",
                                margin: "10px 0 0 0",
                                color: "#374151",
                                fontSize: "14px"
                              }}
                            >
                              {item.bucket_title}
                            </p>

                          </div>

                          {/* ACTIONS */}

                          <div
                            className='d-flex'
                            style={{ gap: "8px" }}
                          >
{/* 
                            <button
                              className='btn btn-sm'
                              onClick={() => handleEdit(item)}
                              style={{
                                background: "#eef2ff",
                                color: "#4f46e5",
                                borderRadius: "10px",
                                width: "38px",
                                height: "38px"
                              }}
                            >
                              <EditIcon style={{ fontSize: "18px" }} />
                            </button> */}

                            <button
                              className='btn btn-sm'
                              onClick={() => handleDelete(item.id)}
                              style={{
                                background: "#fee2e2",
                                color: "#dc2626",
                                borderRadius: "10px",
                                width: "38px",
                                height: "38px"
                              }}
                            >
                              <DeleteIcon style={{ fontSize: "18px" }} />
                            </button>

                          </div>

                        </div>

                      </div>
                    )
                  })

                ) : (

                  <div
                    className='text-center'
                    style={{
                      marginTop: "40px",
                      color: "#6b7280",
                      fontWeight: "500"
                    }}
                  >
                    No completed goals found
                  </div>

                )
              }

            </div>

          ) : (

            // ================= TODO LIST =================

            <div>

              {/* ADD BUTTON */}

             <div
  onClick={toggleAddBox}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: "24px"
  }}
>

  <div
    style={{
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      // background: "#ff4d6d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 12px rgba(255,77,109,0.25)"
    }}
  >
    <img src={plus} width='16px' alt='plus' />
  </div>

  <span
    style={{
      fontWeight: "600",
      fontSize: "17px",
      color: "#111827"
    }}
  >
    Set New Goal
  </span>

</div>

              {/* TODO CARDS */}

             {
  to_do?.data?.length > 0 ? (

    to_do?.data?.map((item, Index) => {

      return (

        <div
          className='card my-3'
          key={Index}
          style={{
            borderRadius: "20px",
            border: "none",
            padding: "16px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            background: "#fff"
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "14px"
            }}
          >

            {/* LEFT CONTENT */}

            <div
              style={{
                flex: 1,
                minWidth: 0
              }}
            >

              {/* NUMBER + CATEGORY */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "12px"
                }}
              >

                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "17px",
                    color: "#111827"
                  }}
                >
                  {Index + 1}.
                </span>

                <span
                  style={{
                    background: "#f3ecff",
                    color: "#7c3aed",
                    padding: "5px 14px",
                    borderRadius: "30px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                >
                  {item.bucket_category}
                </span>

              </div>

              {/* TITLE */}

              <p
                style={{
                  margin: 0,
                  color: "#374151",
                  fontSize: "15px",
                  lineHeight: "26px",
                  textAlign: "left",
                  wordBreak: "break-word"
                }}
              >
                {item.bucket_title}
              </p>

            </div>

            {/* ACTION BUTTONS */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flexShrink: 0
              }}
            >

              {/* DONE */}

              <button
                className='btn'
                onClick={() => onhandledone(item.id)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "#dcfce7",
                  color: "#16a34a",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <DoneIcon style={{ fontSize: "18px" }} />
              </button>

              {/* EDIT */}

              <button
                className='btn'
                onClick={() => handleEdit(item)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "#eef2ff",
                  color: "#4f46e5",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <EditIcon style={{ fontSize: "18px" }} />
              </button>

              {/* DELETE */}

              <button
                className='btn'
                onClick={() => handleDelete(item.id)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <DeleteIcon style={{ fontSize: "18px" }} />
              </button>

            </div>

          </div>

        </div>
      )
    })

  ) : (

    <div
      className='text-center'
      style={{
        marginTop: "40px",
        color: "#6b7280",
        fontWeight: "500"
      }}
    >
      No goals added yet
    </div>

  )
}

            </div>
          )
        }

      </div>

      {/* ================= ADD / EDIT MODAL ================= */}

      {

        isAddBoxVisible && (

          <div
            className='add_box'
            style={{
              display: isAddBoxVisible ? 'block' : 'none'
            }}
          >

            <div
              className='add-holder'
              style={{
                zIndex: '9999'
              }}
            >

              <b
                onClick={toggleAddBox}
                title='close'
              >
                <i className='ri-close-fill'></i>
              </b>

              <form onSubmit={handleSubmit}>

                <div className='mygole'>

                  {/* CATEGORY */}

                  <div className='grp-post-dis'>

                    <select
                      className='placeholder goles'
                      name='interested'
                      id='bucket_category'
                      style={{ boxSizing: 'border-box' }}
                      onChange={handleChange}
                      value={value.interested}
                      required
                    >

                      <option value="">
                        Select Category
                      </option>

                      {

                        categories.map((item, index) => {

                          return (

                            <option
                              value={item.bucket_category}
                              key={index}
                            >
                              {item.bucket_category}
                            </option>
                          )
                        })
                      }

                    </select>

                    <div
                      id='dataref'
                      style={{
                        marginBottom: '15px',
                        fontSize: '13px'
                      }}
                    >
                      Select your interested category
                    </div>

                  </div>

                  {/* TITLE */}

                  <div className='grp-post-dis'>

                    <input
                      className='placeholder goles hide-on-focus'
                      type='text'
                      name='title'
                      id='bucket_title'
                      placeholder='Bucket Title...'
                      style={{ boxSizing: 'border-box' }}
                      value={value.title}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className='submit-holder'>

                  <button
                    className='add_btn'
                    type='submit'
                  >

                    {
                      isEdit
                        ? 'Update Goal'
                        : 'Submit'
                    }

                  </button>

                </div>

              </form>

            </div>

          </div>
        )
      }

    </div>
  );
};

export default MyBucketList;