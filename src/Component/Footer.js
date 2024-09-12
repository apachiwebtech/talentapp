import React from 'react'
import home from '../images/home-grey.png'
import footermenu2 from '../images/footer-menu-2.png';
import footermenu3 from '../images/footer-menu-3.png';
import footermenu4 from '../images/footer-menu-4.png';
import footermenu5 from '../images/footer-menu-5.png';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {

  const Navigate = useNavigate()

  const handleClick = () => {
    Navigate('/dash')
    
  }


  return (
    <div>

      <div className='footer-menu'>
        <Link to="/dash" onClick={handleClick}>
          <img src={home} alt='home' />
        </Link>
        <Link to='/myclub'>
          <img src={footermenu2} alt='m2' />
        </Link>
        <Link to='/createpost'>
          <img src={footermenu3} alt='m3' />
        </Link>
        <Link to='/offer'>
          <img src={footermenu4} alt='m4' />
        </Link>
        <Link to='/bucketlist'>
          <img src={footermenu5} alt='m5' />
        </Link>
      </div>
    </div>
  )
}

export default Footer