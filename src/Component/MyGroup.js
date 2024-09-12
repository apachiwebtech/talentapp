import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';

const MyGroup = () => {
  const [groupdata, setgroupData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [value, setValues] = useState({
    title: '',
    keyword: '',
    image: '',
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };


  //this is for removing the group
  const onhandleClick = async (id) => {
    const data = {
      group_id: id,
      user_id: localStorage.getItem('user_id'),
    };
    console.log(id);
    axios
      .post(`${BASE_URL}/remove_group`, data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    getgroupdata();
  };

  async function getgroupdata() {
    const data = {
      user_id: localStorage.getItem('user_id'),
    };
    axios
      .post(`${BASE_URL}/group_name`, data)
      .then((res) => {
        setgroupData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
     
  }

  useEffect(() => {
    getgroupdata();
  }, []);

  const [image, setImage] = useState(null);

  async function ImageBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

    return data;
  }

  const handleUpload = async (e) => {
    const data = await ImageBase64(e.target.files[0]);
    setImage(e.target.files[0]);
    setValues((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handlSubmit = (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem('user_id');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('user_id', user_id);
    formData.append('title', value.title);
    formData.append('keyword', value.keyword);

    fetch(`${BASE_URL}/create_group`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        
        getgroupdata();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      })
      .finally(()=>{
        setShowForm(false);
      })
  };

  const handleinput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div className='page-container'>
      <div>
        <div className='tab-content'>
          <div className='tab-pane active'>
            <div className='grp-title-btn'>
              <h4>Groups</h4>
              <div id='add_btn' onClick={toggleForm}>
                <button type='button' className='add-group'>
                  Add +
                </button>
              </div>
            </div>
            {showForm && (
              <div id='add_box' className='add_box'>
                <div className='add-holder'>
                  <b onClick={toogle_login} title='close' style={{ width: '40px' }}>
                    <i className='ri-close-fill'></i>
                  </b>
                  <form action='' method='POST' onSubmit={handlSubmit}>
                    <div className='mygrop-holder'>
                      <ul>
                        <li>
                          <span className='grp-post' style={{ position: 'relative' }}>
                            <div className='box'>
                              <div className='js--image-preview' ></div>
                              <div className='upload-options'>
                                <label>
                                  <input type='file' accept='image/*' onChange={handleUpload} className='image-upload' />
                                </label>
                              </div>
                            </div>
                           {value.image == "" ?<p></p> :<img src={value.image} accept='image/*'  className='image-pre' id='output' alt='profile' />} 
                          </span>
                          <span className='grp-post-dis'>
                            <input className='placeholder hide-on-focus' type='text' placeholder='Title' name='title'onChange={handleinput} />
                          </span>
                        </li>
                        <li>
                          <div className='keywords-label'>
                            <div className='form-group row'>
                              <div className='col-12'>
                                <label htmlFor='input' className='col-12 '>
                                  Add Keywords
                                </label>
                                <input type='text' name='keyword' value={value.keyword} className='form-control' onChange={handleinput} />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
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

            <div className='mygrop-holder'>
              {groupdata?.map((item, index) => {
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
                          <ListItemButton onClick={() => onhandleClick(item.id)}>
                            <ListItemIcon>
                              <DeleteOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary='Remove Group' />
                          </ListItemButton>
                          <ListItemButton>
                            <ListItemIcon>
                              <RssFeedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Group Posts' />
                          </ListItemButton>
                        </List>
                      </ul>
                    </div>
                  </div>
                );
              })}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function toogle_login() {
  var login_btn = document.querySelector('#add_btn');
  var login_box = document.querySelector('#add_box');
  if (login_box.style.display === 'none') {
    login_box.style.display = 'block';
    login_btn.style.display = 'none';
  } else {
    login_box.style.display = 'none';
    login_btn.style.display = 'block';
  }
}

export default MyGroup;
