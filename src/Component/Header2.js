import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery'
const Header2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getPageName = () => {
    switch (location.pathname) {
      case '/offer':
        return 'Offer';
      case '/createpost':
        return 'CreatePost';
      case '/bucketlist':
        return 'Mybucketlist'
      case '/myclub':
        return 'Myclub'
      case '/profile':
        return 'Profile'
      case '/setting':
        return 'Setting'
      case '/group':
        return'Mygroup'  
      case '/reg':
        return'Register'
      case '/mypost' :
        return 'Mypost'
      case  '/faq' :
        return 'Faq'
      case '/feed':
        return 'Feedback'
      case '/postlistingpage' :
        return 'Post'
      case '/sharecard' :
        return 'Sharecard'                  
      case '/policy' :
        return 'Policy'                  
      case '/terms' :
        return 'Terms & Conditions'                  
      default:
        return '';
    }
  };
  return (
    <div>
      <div className='header2 d-flex justify-content-between align-items-center'>
        <span className='header-menw btn-menu'>
        <i className="ri-arrow-left-circle-line text-light" style={{fontSize : "36px"}} onClick={() => {
          navigate(-1)
          $('.blob').hide()
          }}></i>
        </span>
        <h2 className='px-2'>{getPageName()}</h2>


      </div>
    </div>
  )
}

export default Header2