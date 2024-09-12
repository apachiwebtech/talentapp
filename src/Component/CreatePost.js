import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from './BaseUrl';
import imageCompression from 'browser-image-compression';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [hide, setHide] = useState("")
  const [progress, setprogress] = useState(false)
  const [error , setError] = useState("")
  const [desc , setDesc] = useState("");

  const [values, setValues] = useState({
    title: '',
    discription: '',
    user_id: localStorage.getItem('user_id'),
  });

  const [image, setImage] = useState(null);



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


  const Navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();



    if (values.title !== "" && desc !== "" && image !== "") {
      
    setprogress(true)
    setHide("Please Wait...")

    const data = {
      title : values.title,
      discription : desc,
      user_id : values.user_id
    }

    
      axios.post(`${BASE_URL}/post_disc`, data).then((res) => {
        if (res.data.post_id) {
          localStorage.setItem('post_id', res.data.post_id);

        }
        const post_id = res.data.post_id;


        const formData = new FormData();
        formData.append('image', image);
        formData.append('post_id', post_id);

        setTimeout(() => {
          fetch(`${BASE_URL}/post_upload`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              Navigate('/dash')
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            })
            .finally(() => {
              setprogress(false)
              setHide("")
            })
        }, 3000);
      });
    }
    else{
     setError("Please fill the all feild")
     setTimeout(() => {
       
       setError("")
     }, 3000);
    }



  };








  const handleinput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleinput2 = (e) => {
    const inputValue = e.target.value;
    
  const sentences = inputValue.split('. '); // Split the input into sentences (assuming sentences end with a period and a space)

  // Add '#' to the beginning of each sentence
  const modifiedValue =  inputValue.split(/\s+/).map(word => `#${word}`).join('');
  console.log(modifiedValue)

  
    setDesc(modifiedValue);
  };

  return (
    <div className='container pt-5'>
      <div className='wrapper'>
        <section id='section0' className='post targetDiv'>
          <form onSubmit={handleSubmit} method='POST'>
            {progress ? <LinearProgress sx={{ color: "red" }} /> : null}
            <div>
              <input className='autosuggestion' type='text' name='title' id='title' placeholder='Title' style={{ backgroundColor: '#fff' }} onChange={handleinput} />
              <label htmlFor='title' className='errormesssage' id='title_err'></label>
            </div>
            
            <div data-emojiarea data-type='unicode' data-global-picker='false'>
              <textarea className='form-control textarea-control' name='discription'  id='discription' rows='2' onChange={handleinput2} placeholder='About Post or #tag' spellCheck='false'></textarea>
              <label htmlFor='description' className='errormesssage' id='description_err'></label>
            </div>

            <div className='drag-area'>
              <h5>
                <span>Add Photos/Videos</span>
              </h5>

              <div className='fileinput'>
                <input type='file' id='file_post' name='post' accept="image/*,video/*"   onChange={handleImageUpload} />
                {/* <input type='file' id='file_post' name='post' accept="image/*,video/*" capture="environment" onChange={handleImageUpload} />   */}

                

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
      </div>
    </div>
  );
};

export default CreatePost;
