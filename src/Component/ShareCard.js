import React from 'react'
import framed from '../images/frame-img/frame-default.png'
import frame1 from '../images/frame-img/frame1.png'
import frame2 from '../images/frame-img/frame2.png'
import frame3 from '../images/frame-img/frame3.png'
import frame4 from '../images/frame-img/frame4.png'
import frame5 from '../images/frame-img/frame5.png'
import frame6 from '../images/frame-img/frame6.png'
import frame7 from '../images/frame-img/frame7.png'
import frame8 from '../images/frame-img/frame8.png'
import frame9 from '../images/frame-img/frame9.png'
import frame10 from '../images/frame-img/frame10.png'
import frame11 from '../images/frame-img/frame11.png'
import frame12 from '../images/frame-img/frame12.png'
import frame13 from '../images/frame-img/frame13.png'
import frame14 from '../images/frame-img/frame14.png'
import frame15 from '../images/frame-img/frame15.png'
import { Link } from 'react-router-dom'

const ShareCard = () => {
    return (
        <div className='px-3' style={{ paddingTop: "70px", paddingBottom: "50px" }}>
            <div className="">
                <div className="headerTemp">
                    Select a Collage Template
                </div>

                <div class="row">
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame"> <img width="100%" src={framed} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame2"><img width="100%" src={frame1} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame3"><img width="100%" src={frame2} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame4"><img width="100%" src={frame3} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame5"><img width="100%" src={frame4} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame6"><img width="100%" src={frame5} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame7"><img width="100%" src={frame6} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame8"><img width="100%" src={frame7} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame9"><img width="100%" src={frame8} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame10"><img width="100%" src={frame9} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame11"><img width="100%" src={frame10} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame12"><img width="100%" src={frame11} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame13"><img width="100%" src={frame12} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame14"><img width="100%" src={frame13} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame15"><img width="100%" src={frame14} alt='' /></Link></div>
                    <div className='col-lg-3 col-6 mb-2'><Link to="/frame16"><img width="100%" src={frame15} alt='' /></Link></div>
                </div>

            </div>
        </div>
    )
}

export default ShareCard