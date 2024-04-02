import React from 'react'
import { useState } from 'react';
import { BASE_URL } from '../../Utils/BaseUrl';
import { useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProfiledata } from '../../../Store/ProdataAction';
import imageCompression from 'browser-image-compression';
import loader from '../../../images/loader.gif';

const UserProfile = () => {
    const dispatch = useDispatch()
    const [getfollow, setFollow] = useState([]);
    const [follower, setFollower] = useState([]);
    const prodata = useSelector((state) => state.ProData.profiledata);
    const [image, setImage] = useState(null);
    const [hide, setHide] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        image: '',
        user_id: localStorage.getItem('user_id'),
    });


    async function getfollowing() {
        const data = {
            user_id: localStorage.getItem('user_id'),
        };
        axios
            .post(`${BASE_URL}/following`, data)
            .then((res) => {
                setFollow(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }



    async function getfollower() {
        const data = {
            user_id: localStorage.getItem('user_id'),
        };

        axios
            .post(`${BASE_URL}/follower`, data)
            .then((res) => {
                setFollower(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {
        getfollower();
        getfollowing();
        dispatch(getProfiledata())
    }, [])



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



    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
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
                setIsLoading(false)

            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            })
      
    };

    function handleclick(){
        alert("new")
    }


    return (
        <>
            {prodata.map((item) => {
                return (
                    <div class="user-data full-width">
                        <div class="user_profile">
                            <div class="user-pro-img" style={{ position: "relative" }}>
                                <img src={values.image !== '' ? values.image : `https://thetalentclub.co.in/upload/profile/${item.profile_image}`} alt='profile' />
                                <div class="profile-input" >
                                    <input type="file" className='' id="file"  onChange={handleImageUpload} />
                                </div>

                            </div>
                            <form onSubmit={handleSubmit} className='py-2' method='POST'>
                                {hide ? <button type='submit' className='btn btn-primary' >
                                    Upload
                                </button> : null}
                            </form>
                            {isLoading && <div><img style={{width :"50px",marginLeft:"52%",transform:"translateX(-50%)"}} src={loader} alt='' /></div>}
                            <div class="user_pro_status">
                                <ul class="flw-status">
                                    <li>
                                        <span>Following</span>
                                        <b>{getfollow.following}</b>
                                    </li>
                                    <li>
                                        <span>Followers</span>
                                        <b>{follower.follower}</b>
                                    </li>
                                </ul>
                            </div>


                        </div>

                    </div>
                )
            })}
        </>
    )
}

export default UserProfile;