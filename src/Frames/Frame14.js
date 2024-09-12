import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import { BASE_URL } from '../Component/BaseUrl';
import { Link } from 'react-router-dom';
import $ from 'jquery'

const Frame14 = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);
    const [preview, setPreview] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [position1, setPosition1] = useState({ x: 0, y: 0 });
    const [id, setId] = useState({});

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const updatedFiles = [...selectedFiles];
                updatedFiles[index] = {
                    file,
                    previewURL: reader.result,

                };
                setSelectedFiles(updatedFiles);
            };

            reader.readAsDataURL(file);
        }
    };
    const handleFileChange2 = (event, index) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const updatedFiles = [...selectedFiles2];
                updatedFiles[index] = {
                    file,
                    previewURL: reader.result,

                };
                setSelectedFiles2(updatedFiles);
            };

            reader.readAsDataURL(file);
        }
    };



    const previewRef = useRef(null);

    const handleScreenshot = () => {
        const timeoutId = setTimeout(() => {
            if (previewRef.current) {
                html2canvas(previewRef.current).then((canvas) => {
                    const screenshotDataUrl = canvas.toDataURL();
                    const screenshotImage = new Image();
                    screenshotImage.src = screenshotDataUrl;
                    screenshotImage.alt = 'Screenshot';
                    screenshotImage.id = 'sshot';
                    screenshotImage.style.maxWidth = '100%';
                    screenshotImage.classList.add('blob');
                    // screenshotImage.style.maxHeight = '400px';
                    document.body.appendChild(screenshotImage);
                    const screenshotBlob = canvas.toBlob((blob) => {
                        const formData = new FormData();
                        formData.append('image', blob, 'screenshot.jpg');
                        formData.append('user_id', localStorage.getItem('user_id'));
                        formData.append('tempid', 14);
                        uploadImageToBackend(formData);
                    }, 'image/jpeg');
                });
                setPreview(true);
            }
        }, 3000);
        return () => clearTimeout(timeoutId);
    };

    const uploadImageToBackend = (formData) => {

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

    };

    function hidediv() {
        $('.blob').hide()
    }

    return (
        <div className='text-center' style={{ position: 'relative', paddingTop: "70px" }}>
            {preview ? null : (
                <div ref={previewRef} className='d-flex justify-content-center'>
                    <div >
                        <div className='' style={{ overflow: 'hidden', background: "#FFC0CB", width: "400px", height: "200px", }}>
                            {selectedFiles.map((file, index) => (
                                <Draggable
                                    key={index}
                                    position={position}
                                    onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
                                >
                                    <div className="frame-prev" style={{ position: 'relative' }}>
                                        <img
                                            src={file.previewURL}
                                            alt={`Preview ${index + 1}`}
                                            width={file.width}
                                            height={file.height}
                                            className={` ${file.width > 400 ? 'height200' : 'width200'} ${file.height > 400 ? 'width200' : 'height200'}`}
                                        />
                                    </div>
                                </Draggable>
                            ))}
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 0)}
                                accept="image/*"
                                className=''
                                style={{ width: "400px", height: "200px" }}
                            />
                        </div>
                        <div className='input2' style={{ overflow: 'hidden', width: "400px", height: "200px", background: "#DDA0DD" }}>
                            {selectedFiles2.map((file, index) => (
                                <Draggable
                                    key={index}
                                    position={position1}
                                    onStop={(e, data) => setPosition1({ x: data.x, y: data.y })}
                                >
                                    <div className="frame-prev" style={{ position: 'relative' }}>
                                        <img
                                            src={file.previewURL}
                                            alt={`Preview ${index + 1}`}
                                            width={file.width}
                                            height={file.height}
                                            className={` ${file.width > 400 ? 'height200' : 'width200'} ${file.height > 400 ? 'width200' : 'height200'}`}
                                        />
                                    </div>
                                </Draggable>
                            ))}
                            <input
                                type="file"
                                onChange={(e) => handleFileChange2(e, 0)}
                                accept="image/*"
                                className='input2'
                                style={{ width: "400px", height: "200px" }}
                            />
                        </div>


                    </div>



                </div>
            )}

            {preview ? null : <button className='btn btn-primary my-2' onClick={handleScreenshot}>Preview</button>}
            {preview ? <Link to={`/generatecard/${id}`} onClick={hidediv}><button className='btn btn-primary g-button '  >Generate Card</button></Link> : null}
        </div>
    );
};

export default Frame14;
