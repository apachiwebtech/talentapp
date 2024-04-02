import axios from 'axios';
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../../Utils/BaseUrl';
import logo from '../../../images/talentlogo.png';

const PostSection = ({ hide, setHide }) => {
	const [hide2, setHide2] = useState("")
	const [progress, setprogress] = useState(false)
	const [error, setError] = useState("")
	const [desc, setDesc] = useState("");

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
			setHide2("Please Wait...")

			const data = {
				title: values.title,
				discription: desc,
				user_id: values.user_id
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
							setHide2("")
						})
				}, 3000);
			});
		}
		else {
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

	// Split the input into sentences (assuming sentences end with a period and a space)

		// Add '#' to the beginning of each sentence
		const modifiedValue = inputValue.split(/\s+/).map(word => `#${word}`).join('');
		console.log(modifiedValue)


		setDesc(modifiedValue);
	};


	return (
		<div>
			<div class="post-topbar">
				<div class="user-picy">
					<img src={logo} alt="" />
				</div>
				<div class="post-st">
					<ul>
						{/* <li><Link class="post_project" title="">Post Your Talent</Link></li> */}
						<li><Link class="post-jb active" onClick={() => setHide(true)} title="">Post Your Talent</Link></li>
					</ul>
				</div>
			</div>


			<div class={hide ? "post-popup pst-pj active" : "post-popup pst-pj d-none"}>

				<div class="post-project">
					<h3>Post Your Talent</h3>
					{progress ? <LinearProgress sx={{ color: "red" }} /> : null}
					<div class="post-project-fields">
						<form onSubmit={handleSubmit}>
							<div class="row">
								<div class="col-lg-12">
									<input type="text" name="title" placeholder="Title" onChange={handleinput} />
								</div>
								<div class="col-lg-12">
									<input type='file' id='file_post' name='post' accept="image/*,video/*" onChange={handleImageUpload} />
								</div>

								<div class="col-lg-12">
									<textarea name='discription' placeholder="Description" onChange={handleinput2} ></textarea>
								</div>

								<div class="col-lg-12">
									<ul>
										<li><button class="active" type="submit" value="post">Post</button></li>
										<li><Link onClick={() => setHide(false)} href="#" title="">Cancel</Link></li>
									</ul>
								</div>
							</div>
						</form>
					</div>
					<a href="#" title=""><i class="la la-times-circle-o" onClick={() => setHide(false)}></i></a>
				</div>
			</div>
		</div>
	)
}

export default PostSection