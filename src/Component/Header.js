import React, { useEffect } from 'react';
import hedermenu from '../images/header-menw.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(true);

  const onHandlelogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('post_id');
    localStorage.removeItem('email');
    localStorage.removeItem('profile_pic');
    localStorage.removeItem('Lastname');
    localStorage.removeItem('userName');
    localStorage.removeItem('user_loggedin');
    
    navigate('/');
  };


  return (
    <div style={{ zIndex: "1" }}>
      <div className='header d-flex justify-content-between'>
        <span className='header-menw btn-menu'>
          <img src={hedermenu} alt='headermenu' onClick={() => setClick(!click)} />
        </span>
            <h2>Dashboard</h2>
          <Link to='/postlistingpage/:id'><i class="ri-search-2-line post-icon"></i></Link>
       
      </div>


      
      <div className={click ? 'silde-none' : 'silde-overlay'} onClick={() => setClick(!click)}></div>
      <nav className={click ? 'sidebar' : 'sidebar show'}>
        <ul>
          <li className='active' onClick={() => setClick(!click)}>
            <Link to='/dash'>
              <i className='ri-home-4-line'></i> Dashboard
            </Link>
          </li>
          <li onClick={() => setClick(!click)}>
            <Link to='/myclub'>
              <i className='ri-award-line'></i> My Clubs
            </Link>
          </li>
          <li onClick={() => setClick(!click)}>
            <Link to='/createpost'>
              <i className='ri-calendar-check-line'></i> Add Post
            </Link>
          </li>
          <li onClick={() => setClick(!click)}>
            <Link to='/offer'>
              <i className='ri-run-fill'></i> Todays Offer
            </Link>
          </li>
          <li onClick={() => setClick(!click)}>
            <Link to='/bucketlist'>
              <i className='ri-contacts-book-line'></i> My Bucket List
            </Link>
          </li>
          <li onClick={() => setClick(!click)}>
            <Link to='/profile'>
              <i className='ri-contacts-book-line'></i> My Profile
            </Link>
          </li>
          <li onClick={() => setClick(!click)}>
            <Link to='/mypost'>
              <i className='ri-contacts-book-line'></i> My Talent Post
            </Link>
          </li>
          <li onClick={() => setClick(!click)}>
            <Link to='/sharecard'>
              <i className='ri-contacts-book-line'></i> Talent Share Card
            </Link>
          </li>
          <li onClick={() => setClick(!click)}>
            <Link to='/group'>
              <i className='ri-contacts-book-line'></i> My Groups
            </Link>
          </li>
        </ul>
        <div className='bottom-bar'>
          <ul>
            <li onClick={() => setClick(!click)}>
              <Link to='/setting'>
                <i className='ri-settings-5-line'></i> Settings
              </Link>
            </li>
            <li onClick={() => setClick(!click)}>
              <Link to='/feed'>
                <i className='ri-question-line'></i> Feedback
              </Link>
            </li>
            <li onClick={() => setClick(!click)}>
              <Link to='/faq'>
                <i className='ri-question-line'></i> FAQ
              </Link>
            </li>
            <li onClick={onHandlelogout} className='logout' style={{ textAlign: "center", boxShadow: 'inset lightgray 0px 11px 10px', paddingLeft: '0px' }}>
              <i className='ri-logout-box-r-line'></i> Logout
            </li>
          </ul>
          <div className='static-content'>
            <Link to='/policy'>Privacy policy</Link> | <Link to="/terms" >Terms of Service</Link>{' '}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
