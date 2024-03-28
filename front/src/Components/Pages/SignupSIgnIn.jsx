import React, { useState } from 'react'
import mainimg from '../../images/signup/cm-main-img.png'
import talentLogo from '../../images/signup/talentlogo.png'
import classes from './SignUpSignIn.module.css'
const SignupSIgnIn = () => {
	const [singnIn, setSingnIn] = useState(true);
	const [signup, setSignup] = useState(false);

	const handleSignUpClick=()=>{
		setSignup(true);
		setSingnIn(false);
	}
	const handleSignInClick=()=>{
		setSignup(false);
		setSingnIn(true);
	}

	const [signInValues, setsignInValues] = useState({
		userName : '',
		password : '',
	})

	const [SignUpValues, setSignUpValues] = useState({
		organisationName : '',
		firstName : '', 
		lastName : '',
		email : '', 
		mobile : '', 
		password : '',
		cnfPassword : '',
	})

	const [signInErrors, setsignInErrors] = useState({
		username : '',
		password : '',
	})

	const [signUpErrors, setSignUpErrors] = useState({
		firstName : '', 
		lastName : '',
		email : '', 
		mobile : '', 
		password : '',
		cnfPassword : '',
	})
	const handleSignInChange = (event)=>{
		const {name , value} = event.target;
		setsignInValues(prevState => ({
			...prevState,
			[name]: value
		}));
	}

	const hadnleSignUpChange =(event)=>{
		const {name , value} = event.target;

		setSignUpValues(prevState =>({
			...prevState, 
			[name] : value
		}))
	}

	const validateSignIn = () => {
		let errors = { ...signInErrors }; 
	
		if (signInErrors.username.trim() === '') {
		  errors.username = 'Username is required';
		}
	
		if (signInErrors.password.trim() === '') {
		  errors.password = 'Password is required';
		}
	
		setsignInErrors(errors);
	
		return Object.keys(errors).every(key => errors[key] === '');
	};

	const validateSignUp = () => {
		let errors = {...signUpErrors};

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if(signUpErrors.firstName.trim() === ''){
			errors.firstName = 'First name is required';
		}
		
		if(signUpErrors.lastName.trim() === ''){
			errors.lastName = 'Last name is required';
		}
		if(signUpErrors.email.trim() === ''){
			errors.email = 'Email is required';
		}else if(!emailRegex.test(errors.email)){
			errors.email = 'Invalid email format';
		}
		if (errors.mobile.trim() === '') {
			errors.mobile = 'Mobile number is required';
		} else if (errors.mobile.trim().length !== 10) {
			errors.mobile = 'Mobile number must be 10 digits';
     	} else if (!/^\d+$/.test(errors.mobile)) {
			errors.mobile = 'Mobile number must contain only digits';
		  }

		if(signUpErrors.password.trim() === ''){
			errors.password = 'Password is required';
		}else if(signUpErrors.password.length < 6){
			errors.password = 'Password must be 6 characters long';
		}
		if(signUpErrors.cnfPassword.trim() === ''){
			errors.cnfPassword = 'confirm password is required';
		}else if(signUpErrors.cnfPassword.length < 6){
			errors.cnfPassword = 'confirm password must be 6 characters long';
		}

		if(signUpErrors.password.trim() !== signUpErrors.cnfPassword.trim()){
			errors.cnfPassword = 'Confirm password should be same as Password';
		}
		setSignUpErrors(errors);
		return Object.values(errors).every((error) => error === '');

	}
	const signInSubmit=(event)=>{
		event.preventDefault();

		const user = {
			username : signInValues.userName,
			password : signInValues.password,
		}

		if(validateSignIn()){

			console.log(user);
		}
		setTimeout(()=>{
			setsignInErrors({
				username : '',
				password : '',
			})
		}, 3000)
		setsignInValues({
			userName : '',
			password : '',
		})
	}

	const handleSignUpSubmit =(event)=>{
		event.preventDefault();
		console.log(SignUpValues.firstName, SignUpValues.email);
		const user ={
			orgName : SignUpValues.organisationName,
			firstName : SignUpValues.firstName,
			lastName : SignUpValues.lastName,
			email : SignUpValues.email,
			mobile : SignUpValues.mobile,
			password : SignUpValues.password,
			cnfPassword : SignUpValues.cnfPassword,
		}

		if(validateSignUp()){

			console.log(user);
		}

		setTimeout(()=>{
			setSignUpErrors({
				firstName : '', 
				lastName : '',
				email : '', 
				mobile : '', 
				password : '',
				cnfPassword : '',
			})
		}, 3000)
		setSignUpValues({
			organisationName : '',
			firstName : '', 
			lastName : '',
			email : '', 
			mobile : '', 
			password : '',
			cnfPassword : '',
		})
	}
  return (
<div className="wrapper">		

		<div className="sign-in-page">
			<div className="signin-popup">
				<div className="signin-pop">
					<div className="row">
						<div className="col-lg-6">
							<div className="cmp-info">
								<div className="cm-logo">
									<img src={talentLogo} alt=""/>
									<p>Workwise,  is a global freelancing platform and social networking where businesses and independent professionals connect and collaborate remotely</p>
								</div>	
								<img src={mainimg} alt=""/>			
							</div>
						</div>
						<div className="col-lg-6">
							<div className="login-sec">
								<ul className="sign-control">
									<li onClick={handleSignInClick} data-tab="tab-1" className={`${singnIn ? 'current' : ''} animated fadeIn`}><span>Sign in</span></li>				
									<li onClick={handleSignUpClick} data-tab="tab-2" className={`${signup ? 'current' : ''} animated fadeIn`}><span>Sign up</span></li>				
								</ul>			
								<div className={`${singnIn ? 'current' : ''} sign_in_sec`} id="tab-1">
									
									{singnIn &&  <>
									
										<h3>Sign in</h3>
									<form id='signInForm' onSubmit={signInSubmit}>
										<div className="row">
											<div className="col-lg-12 no-pdd">
												<div className="sn-field">
													<input type="text" name="userName" placeholder="Username" value={signInValues.userName} onChange={handleSignInChange}/>
													<i className="la la-user"></i>
													{signInErrors.username && <p className={classes.error}>{signInErrors.username}</p>}
												</div>
											</div>
											<div className="col-lg-12 no-pdd">
												<div className="sn-field">
													<input type="password" name="password" placeholder="Password" value={signInValues.password} onChange={handleSignInChange}/>
													<i className="la la-lock"></i>
													{signInErrors.password && <p className={classes.error}>{signInErrors.password}</p>}
												</div>
											</div>
											<div className="col-lg-12 no-pdd">
												<div className="checky-sec">
													<div className="fgt-sec">
														<input type="checkbox" name="cc" id="c1"/>
														<label for="c1">
															<span></span>
														</label>
														<small>Remember me</small>
													</div>
													<a href="google" title="">Forgot Password?</a>
												</div>
											</div>
											<div className="col-lg-12 no-pdd">
												<button type="submit" value="submit" form='signInForm'>Sign in</button>
											</div>
										</div>
									</form>
									</>}
								</div>
								{signup && <div className={`${signup ? 'current' : ''} sign_in_sec`} id="tab-2">
									<div className="dff-tab current" id="tab-3">
									<h3>Sign up</h3>

										<form onSubmit={handleSignUpSubmit}>
											<div className="row">
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="organisationName" placeholder="Organisation Name" value={SignUpValues.organisationName} onChange={hadnleSignUpChange}/>
														<i className="la la-user"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="firstName" placeholder="First Name" value={SignUpValues.firstName} onChange={hadnleSignUpChange}/>
														<i className="la la-user"></i>
														{signUpErrors.firstName && <p className={classes.error}>{signUpErrors.firstName}</p>}
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="lastName" placeholder="Last Name" value={SignUpValues.lastName} onChange={hadnleSignUpChange}/>
														<i className="la la-user"></i>
														{signUpErrors.lastName && <p className={classes.error}>{signUpErrors.lastName}</p>}
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="email" name="email" placeholder="Email" value={SignUpValues.email} onChange={hadnleSignUpChange}/>
														<i className="la la-user"></i>
														{signUpErrors.email && <p className={classes.error}>{signUpErrors.email}</p>}
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="mobile" placeholder="Mobile" value={SignUpValues.mobile} onChange={hadnleSignUpChange}/>
														<i className="la la-user"></i>
														{signUpErrors.mobile && <p className={classes.error}>{signUpErrors.mobile}</p>}
													</div>
												</div>
												
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="password" placeholder="Password" value={SignUpValues.password} onChange={hadnleSignUpChange}/>
														<i className="la la-lock"></i>
														{signUpErrors.password && <p className={classes.error}>{signUpErrors.password}</p>}
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="cnfPassword" placeholder="Repeat Password" value={SignUpValues.cnfPassword} onChange={hadnleSignUpChange}/>
														<i className="la la-lock"></i>
														{signUpErrors.cnfPassword && <p className={classes.error}>{signUpErrors.cnfPassword}</p>}
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="checky-sec st2">
														<div className="fgt-sec">
															<input type="checkbox" name="cc" id="c2"/>
															<label for="c2">
																<span></span>
															</label>
															<small>Yes, I understand and agree to the workwise Terms & Conditions.</small>
														</div>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<button type="submit" value="submit">Get Started</button>
												</div>
											</div>
										</form>
									</div>
								</div>	}	
							</div>
						</div>
					</div>		
				</div>
			</div>
			<div className="footy-sec">
				<div className="container">
					<ul>
						<li><a href="help-center.html" title="">Help Center</a></li>
						<li><a href="about.html" title="">About</a></li>
						<li><a href="#" title="">Privacy Policy</a></li>
						<li><a href="#" title="">Community Guidelines</a></li>
						<li><a href="#" title="">Cookies Policy</a></li>
						<li><a href="#" title="">Career</a></li>
						<li><a href="forum.html" title="">Forum</a></li>
						<li><a href="#" title="">Language</a></li>
						<li><a href="#" title="">Copyright Policy</a></li>
					</ul>
					<p><img src="images/copy-icon.png" alt=""/>Copyright 2019</p>
				</div>
			</div>
		</div>
    </div>
  )
}

export default SignupSIgnIn