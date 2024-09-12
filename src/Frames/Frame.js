import React, { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import { BASE_URL } from '../Component/BaseUrl';
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
const Frame = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(false);
    const [id, setId] = useState({});


    const handleFileChange = (event) => {
        const file = event.target.files[0];


        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setSelectedFile({
                    file,
                    previewURL: reader.result,
                });
            };

            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
        }
    };


    const previewRef = useRef(null);

    const handleScreenshot = () => {
        const timeoutId = setTimeout(() => {
        if (previewRef.current) {
            html2canvas(previewRef.current).then((canvas) => {
                const screenshotDataUrl = canvas.toDataURL('image/jpeg');
                const screenshotImage = new Image();
                screenshotImage.src = screenshotDataUrl;
                screenshotImage.alt = 'Screenshot';
                screenshotImage.id = 'sshot';
                screenshotImage.style.maxWidth = '100%';
                // screenshotImage.style.maxHeight = '400px';
                document.body.appendChild(screenshotImage);
                screenshotImage.classList.add('blob');

                const screenshotBlob = canvas.toBlob((blob) => {
                    const formData = new FormData();
                    formData.append('image', blob, 'screenshot.jpg');
                    formData.append('user_id', localStorage.getItem('user_id'));
                    formData.append('tempid', 1);

                    uploadImageToBackend(formData);
                }, 'image/jpeg');

            });
         
                setPreview(true);
                
                // Cleanup the timeout on component unmount
            }
        }, 3000);
        return () => clearTimeout(timeoutId);
    };

    const uploadImageToBackend = (formData) => {

        if (selectedFile) {

            fetch(`${BASE_URL}/sharecard`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    setId(data.insertId)



                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                });
        }
    };

    const navigate = useNavigate()

    function hidediv() {

        $('.blob').hide()


        setTimeout(() => {
            // Redirect to the specified route
            navigate(`/generatecard/${id}`);
        }, 2000);
    }



    return (
        <div className='text-center' style={{ position: "relative", paddingTop: "70px" }}>
            {
                preview ? null : (
                    <div ref={previewRef} style={{ background: "#FFC7D1", width: "100%" }}>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className='frame'
                            name="preview1"
                            style={{ width: "100%" }}

                        />

                        {selectedFile && (
                            <div className="frame-diff">
                                <img
                                    id='framediv'
                                    className={` ${selectedFile.width > 400 ? 'height400' : 'width400'} ${selectedFile.height > 400 ? 'width400' : 'height400'}`}
                                    src={selectedFile.previewURL}
                                    alt="jnjn"

                                />
                            </div>

                        )}
                    </div>
                )
            }

            {preview ? null : <button className='btn btn-primary my-2' onClick={handleScreenshot}>Preview</button>}
            {preview ? <Link to={`/generatecard/${id}`} onClick={hidediv}><button onClick={hidediv} className='btn btn-primary g-button'>Generate Card</button></Link> : null}



        </div>
    )
}

export default Frame