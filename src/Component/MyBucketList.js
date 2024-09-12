import React, { useEffect, useState } from 'react';
import plus from '../images/plus-icon.png';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';

const MyBucketList = () => {
  const [value, setValue] = useState({
    interested: '',
    title: '',
    user_id: localStorage.getItem('user_id')
  });
  const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [to_do, setTodo] = useState({})
  const [done, setDone] = useState({})
  const [categories, setCategories] = useState([]);
  const Navigate = useNavigate()

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);


    const selectedData = isChecked ? 'Done' : 'Off';

    if (selectedData === 'Done') {
      getListing('done');
    } else {
      getListing('to_do');
    }


  };

  const getListing = (status) => {

    // console.log('Fetching data for:', status);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedData = isChecked ? 'done' : 'to_do';
    axios
      .post(`${BASE_URL}/add_bucket_list`, {
        ...value,
        selectedData,
      })

      .then((res) => {
        getTodolist() 
      })

      .catch((err) => {
        console.log(err);

      })
      .finally(()=>{
        setIsAddBoxVisible(false)
      })

    getTodolist()
  };

  async function getTodolist() {
    const data = {
      user_id: localStorage.getItem("user_id")
    }

    axios.post(`${BASE_URL}/to_do`, data)
      .then((res) => {
        setTodo(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onhandledone = async (id) => {
    const data = {
      user_id: localStorage.getItem('user_id'),
      bucket_id: id,
      done: "done"
    }
    axios.post(`${BASE_URL}/done`, data)
      .then((res) => {
        getTodolist() 
        getdonelist()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getTodolist()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAddBox = () => {
    setIsAddBoxVisible((prev) => !prev);
  };


  async function getdonelist() {
    const data = {
      user_id: localStorage.getItem("user_id")
    }

    axios.post(`${BASE_URL}/done_list`, data)
      .then((res) => {
        setDone(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getCategory = async()=>{
    const response = await fetch(`${BASE_URL}/getcategory`);

    const data = await response.json();
    setCategories(data)
    // console.log(data);
  }
  useEffect(() => {
    getdonelist()
    getCategory();
  }, [])

  return (
    <div className='page-container'>
      <div className='mybucket-list'>
        <div className='switch-btn'>
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
      <div className=''>

        {isChecked ? (
          <div className='text-center'>
            {
              done?.data?.map((item, Index) => {
                return (
                //  <div key={Index}>
                //   <p>{item.bucket_category}</p>
                //  </div>
                <div className='card p-2 bucket-card my-2' key={Index}>
                        <div className='d-flex  justify-content-between'>
                          <div>

                            <div className='d-flex'>
                              <b>{Index + 1}.</b>
                              <p className='px-2'>{item.bucket_category}</p>
                            </div>
                            
                            <p style={{textAlign:"left", margin:"0"}}>{item.bucket_title}</p>
                            
                          </div>
                          <div>
                            <button className='btn btn-sm btn-danger' onClick={() => onhandledone(item.id)}><DoneIcon/></button>
                          </div>

                        </div>
                      </div>
                )
              })
            }

          </div>
        ) : (
          <div className=''>

            <div>
              <p className='text-center'>
                <span onClick={toggleAddBox}>
                  <img src={plus} width='30px' alt='plus' />
                </span>
                <span onClick={toggleAddBox}>Set New Goal</span>
              </p>
              <div>
                {
                  to_do?.data?.map((item, Index) => {
                    return (
                      <div className='card p-3 bucket-card my-2' key={Index}>
                        <div className='d-flex justify-content-between'>
                          <div>

                            <div className='d-flex'>
                              <b>{Index + 1}.</b>
                              <p className='px-2'>{item.bucket_category}</p>
                            </div>
                            <p style={{textAlign:"left", margin:"0"}}>{item.bucket_title}</p>

                          </div>
                          <div>
                            <button className='btn btn-sm btn-danger' onClick={() => onhandledone(item.id)}><DoneIcon/></button>
                          </div>

                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>
        )}
      </div>




      {isAddBoxVisible && (
        <div className='add_box' style={{ display: isAddBoxVisible ? 'block' : 'none' }}>
          <div className='add-holder' style={{ zIndex: '9999' }}>
            <b onClick={toggleAddBox} title='close'>
              <i className='ri-close-fill'></i>
            </b>
            <form action='' onSubmit={handleSubmit}>
              <div className='mygole'>
                <div className='grp-post-dis'>
                  <select
                    className='placeholder goles'
                    name='interested'
                    id='bucket_category'
                    style={{ boxSizing: 'border-box' }}
                    onChange={handleChange}
                    value={value.interested}
                  >
                    {
                      categories.map((item)=>{
                        return (
                          <option value={item.bucket_category}>{item.bucket_category}</option>
                        )
                      })
                    }
                    {/* <option value='Trekking'>Trekking</option>
                    <option value='Diving'>Diving</option>
                    <option value='Scuba diving'>Scuba diving</option> */}
                  </select>
                  <div id='dataref' style={{ marginBottom: '15px', fontSize: '13px' }}>
                    Select your interested category
                  </div>
                  <label htmlFor='bucket_category_error' className='errormesssage' id='bucket_category_error'></label>
                </div>

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
                  />
                  <label htmlFor='bucket_title_error' className='errormesssage' id='bucket_title_error'></label>
                </div>
              </div>
              <div className='submit-holder'>
                <button className='add_btn' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default MyBucketList;
