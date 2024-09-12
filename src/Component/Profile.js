import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import loader from '../images/loader.gif';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from './BaseUrl';
import imageCompression from 'browser-image-compression';
import { LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});





const Profile = () => {
  const [values, setValues] = useState({
    image: '',
    user_id: localStorage.getItem('user_id'),
  });
  const [getfollow, setFollow] = useState([]);
  const [follower, setFollower] = useState([]);
  const [hide, setHide] = useState(false);
  const [posts, setposts] = useState([]);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [commonerr, setCommonerr] = useState("");
  const [progress, setprogress] = useState(false)
  const [prodata, setPro] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetails] = useState({
    firstname: '',
    lastname: '',
    designation: '',
    date: '',
    address: '',
    gender: '',
    user_id: localStorage.getItem('user_id')


  })

  const [error, setErrors] = useState({
    firstname: '',
    lastname: '',
    designation: '',
    address: '',
    // date: '',
    // gender: '',
  })


  const Designation = [
    {
      value: 'Select',
      label: 'Select Designation',
    },
    {
      value: 'Student',
      label: 'Student',
    },
    {
      value: 'Homemakers',
      label: 'Homemakers',
    },
    {
      value: 'Senior Citizens',
      label: 'Senior Citizens',
    },
    {
      value: 'Agriculturist',
      label: 'Agriculturist',
    },
    {
      value: 'Propriters',
      label: 'Propriters',
    },
    {
      value: 'Professionals',
      label: 'Professionals',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];


  const gender = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function proflepost() { }
  useEffect(() => {
    proflepost();
  }, []);

  useEffect(() => {
    const data = {
      user_id: localStorage.getItem('user_id'),
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
      user_id: localStorage.getItem('user_id'),
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


  async function getProfiledata() {

    const data = {
      user_id: localStorage.getItem("user_id")
    }
    axios.post(`${BASE_URL}/profile_data`, data)
      .then((res) => {
        setPro(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getProfiledata()
  }, [])

  function formatDateToYYYYMMDD(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }



  useEffect(() => {
    const data = {
      user_id: localStorage.getItem('user_id'),
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


  async function ImageBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

    return data;
  }



  async function handleImageUpload(event) {
    const file = event.target.files[0];
    setHide(true)

    const data = await ImageBase64(event.target.files[0]);
    setValues((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
    // Check if the file has a valid extension
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'mp4'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      // console.log('Invalid file type. Please upload a .png, .jpg, or .mp4 file.');
      return;
    }

    console.log(file, "jhsd");
    console.log('file instanceof Blob', file instanceof Blob); // true
    console.log(`file size ${file.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      let convertedFile;

      if (fileExtension === 'mp4') {
        setImage(file)
      } else {
        // Handle image file using imageCompression library
        const compressedFile = await imageCompression(file, options);
        console.log("nbchjvbhj");
        console.log(compressedFile);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        // Convert Blob to File with the desired extension
        const fileName = `compressedFile.${fileExtension}`;
        convertedFile = new File([compressedFile], fileName, { type: `image/${fileExtension}` });
        await setImage(convertedFile);
      }


      // You can replace the following line with your own logic to handle the converted file
    } catch (error) {
      console.log(error);
    }
  }

  const Navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setprogress(true)
    const formData = new FormData();
    formData.append('image', image);
    formData.append('user_id', values.user_id);

    fetch(`${BASE_URL}/profile_pic`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {

        const profile = data[0].profile_image
        localStorage.setItem("profile_pic", profile)
        Navigate('/dash')
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      })
      .finally(() => {
        setprogress(false)
      })
  };
  
  const onhandleSubmit = (e) => {
    e.preventDefault()



    // let errors = { ...error };
    // // Validation logic
    // if (!detail.firstname) {
    //   errors.firstname = 'First name is required';
    // }
    // if (!detail.lastname) {
    //   errors.lastname = 'Last name is required';
    // }
    // if (!detail.designation || detail.designation === 'Select') {
    //   errors.designation = 'Please select a designation';
    // }
    // if (!detail.address) {
    //   errors.address = 'Address is required';
    // }
    // if (!detail.date) {
    //   errors.date = 'Birth date is required';
    // }
    // if (!detail.gender) {
    //   errors.gender = 'Gender is required';
    // }


    // Set errors
    // setErrors(errors);

    // If there are no errors, submit the form
    if (detail.address && detail.designation && detail.firstname && detail.lastname) {
      const user = {
        firstName: detail.firstname,
        lastName: detail.lastname,
        designation: detail.designation,
        address: detail.address,
        // birthDate: formatDateToYYYYMMDD(detail.date.$d),
        gender: detail.gender,
        user_id: localStorage.getItem('user_id'),
      };

      axios
        .post(`${BASE_URL}/updateProfile`, user)
        .then((res) => {
          console.log(res);
          setOpen(false)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {

      setCommonerr("All feilds are require")
      setTimeout(() => {

        setCommonerr("")
      }, 4000);
    }

    // Remove errors after 5 seconds
    setTimeout(() => {
      setErrors({});
    }, 5000);
  }


  const getUSerData = async () => {

    const user_id = localStorage.getItem('user_id')

    const response = await axios.post(`${BASE_URL}/getProfileData`, { user_id })

    const userData = response.data[0];
    console.log(userData)

    const birthYear = userData.created_date;
    const birthDate = new Date(birthYear);

    setDetails(prevState => ({
      ...prevState,
      firstname: userData.firstname,
      lastname: userData.lastname,
      designation: userData.designation,
      // date:birthDate,
      address: userData.address,
      gender: userData.gender,

    }))

    console.log(response.data[0]);
  }

  useEffect(() => {
    getUSerData();
  }, [])


  const handleImageLoad = () => {
    console.log('Image loaded successfully!');
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.error('Error loading image.');
    setIsLoading(false);
  };
  
  const onhandleChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function formatDateToCustomString(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }

  // Example usage:
  const inputDate = "2024-03-13";
  const formattedDate = formatDateToCustomString(inputDate);
  console.log(formattedDate); // Output: "Thu Mar 14 2024 00:00:00 GMT+0530"

  return (

    <div className='page-container'>
      {
        prodata.map((item, index) => {
          return (
            <div className='tab-content' key={index}>
              <div className='tab-pane active'>
               
                <div className='myprofile-holder'>
                  <div className='myprofile-img'>
                    <div className='img-frame'>
                      <div className='profile-pic'>
                        {/* {isLoading && <div style={{position :"absolute", left:"50px"}}>Loading...</div>} */}
                        {isLoading && <div><img src={loader} alt='' /></div>}

                        <img src={values.image !== '' ? values.image : `https://thetalentclub.co.in/upload/profile/${item.profile_image}`} a id='output' width='200' alt='profile' onLoad={handleImageLoad} onError={handleImageError} />
                      </div>
                    </div>
                    {progress ? <LinearProgress sx={{ color: "red" }} /> : null}
                    <form onSubmit={handleSubmit} method='POST'>
                      <input id='pro-pic' type='file' name='post' accept='image/*' onChange={handleImageUpload} />
                      {hide ? <button type='submit' className='btn-upload' style={{ marginTop: '5px' }}>
                        Upload
                      </button> : null}
                    </form>
                  </div>
                  <div className='myprofile-des' style={{ position: 'relative' }}>
                    <div className='profiledetails'>
                      <h2 id='h1_username'>{item.firstname}</h2>
                      <h4 id='h1_designation'>{item.designation}</h4>
                      <h4 id='h1_designation'>{item.address}</h4>
                    </div>
                    <p className='edit-p mt-3 py-1'>Message</p>
                    <p className='edit'>
                      {' '}
                      <i className='ri-edit-fill' onClick={handleClickOpen}></i>
                    </p>
                  </div>

                  <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar sx={{ position: 'relative' }} style={{ background: '#E73758' }}>
                      <Toolbar>
                        <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                          <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                          Edit Profile
                        </Typography>
                        <Button type='submit' autoFocus color='inherit' onClick={onhandleSubmit}>
                          save
                        </Button>
                      </Toolbar>
                    </AppBar>
                    <Box component='form' autoComplete='off' style={{ padding: '10px 10px' }}>
                      <TextField id='standard-basic' fullWidth label='First Name' name="firstname" value={detail.firstname} onChange={onhandleChange} />
                      {error.firstname && <span className='text-danger'>{error.firstname}</span>}
                    </Box>
                    <Box component='form' autoComplete='off' style={{ padding: '5px 10px' }}>
                      <TextField id='standard-basic' fullWidth label='Last Name' name="lastname" value={detail.lastname} onChange={onhandleChange} />
                      {error.lastname && <span className='text-danger'>{error.lastname}</span>}
                    </Box>
                    <Box component='form' autoComplete='off' style={{ padding: '5px 10px' }}>
                      <TextField id='standard-basic' fullWidth select defaultValue='Select' name='designation' value={detail.designation} onChange={onhandleChange}>
                        {Designation.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      {error.designation && <span className='text-danger'>{error.designation}</span>}
                    </Box>
                    <Box component='form' autoComplete='off' style={{ padding: '5px 10px' }}>
                      <TextField id='standard-basic' fullWidth label='Location' name="address" value={detail.address} onChange={onhandleChange} />
                      {error.address && <span className='text-danger'>{error.address}</span>}
                    </Box>
                    {/* <Box component='form' autoComplete='off' style={{ padding: '5px 10px' }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DateTimePicker', 'TimePicker', 'DateRangePicker']}></DemoContainer>
                        <DemoItem label='BirthDate'>
                          <DatePicker  disableFuture views={['year', 'month', 'day']} name="date"  onChange={(newValue) => setDetails({ ...detail, date: newValue })} />
                        </DemoItem>
                      </LocalizationProvider>
                      {error.date && <span className='text-danger'>{error.date}</span>}
                    </Box> */}
                    <Box component='form' autoComplete='off' style={{ padding: '5px 10px' }}>
                      <FormControl>
                        <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
                        <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='gender' value={detail.gender} onChange={onhandleChange}>
                          {
                            gender.map((gender) => {
                              return (
                                <FormControlLabel value={gender.value} control={<Radio />} label={gender.label} />
                              )
                            })
                          }
                        </RadioGroup>
                      </FormControl>
                      {error.gender && <span className='text-danger'>{error.gender}</span>}
                    </Box>
                    <p className='text-danger text-center'>{commonerr}</p>
                  </Dialog>

                </div>
              </div>
            </div>
          )
        })
      }


      <div className='card'>
        <div className='followstatus row p-2'>
          {follower?.data?.map((item, index) => {
            return (
              <div className='text-center col-4' key={index}>
                <p>Followers</p>
                <span>{item.follower}</span>
              </div>
            );
          })}
          {getfollow?.data?.map((item, index) => {
            return (
              <div className='text-center col-4' key={index}>
                <p>Following</p>
                <span>{item.following === null ? 0 : item.following}</span>
              </div>
            );
          })}
          {posts?.data?.map((item, index) => {
            return (
              <div className='text-center col-4' key={index}>
                <p>Posts</p>
                <span>{item.post === null ? 0 : item.post}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
