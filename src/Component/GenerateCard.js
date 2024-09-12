import React, { useEffect, useMemo, useState } from 'react'
import logo from '../images/logo.png'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from './BaseUrl'
import loader from '../images/loader.gif';
import { Helmet } from 'react-helmet';

const GenerateCard = () => {
    const [image, setimage] = useState({})
    const [loading, setLoading] = useState(true)
    const [cancelToken, setCancelToken] = useState(null);
    const params = useParams();

    const { shareid } = params;

    async function getimage() {
        if (cancelToken) {
            cancelToken.cancel('Request canceled due to new search');
        }

        const newCancelToken = axios.CancelToken.source();
        setCancelToken(newCancelToken);
        const data = {
            shareid: shareid
        }
        if (shareid !== "") {
            axios.post(`${BASE_URL}/sharedetail`, data, {
                cancelToken: newCancelToken.token,
            })
                .then((res) => {
                    setimage(res)
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        // Request was canceled, ignore
                    } else {
                        console.log(err);
                    }
                })
        }
    }

    useEffect(() => {
        getimage()
    }, [shareid])

    const memoizedImage = useMemo(() => image?.data?.map((item) => item.finalcard), [image]);

    const handleShareOnFacebook = () => {
        const messageToShare = encodeURIComponent("This is the default message");
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://thetalentclub.co.in/upload/sharecard/${image?.data?.map((item) => item.finalcard)}`)}&quote=${messageToShare}`;
        window.open(facebookShareUrl, '_blank')
    };

    const handleShareOnInstagram = () => {
        const messageToShare = encodeURIComponent("This is the default message"); // Replace with the message you want to pre-fill

        // Construct the Instagram share URL
        const instagramShareUrl = `https://www.instagram.com/shareArticle/?mini=true&url=${`https://thetalentclub.co.in/upload/sharecard/${image?.data?.map((item) => item.finalcard)}`}&title=${messageToShare}`;

        // Attempt to open the Instagram app
        window.open(instagramShareUrl, '_blank');
    };

    const handleShareOnTwitter = () => {
        const tweetText = encodeURIComponent(`Check out this post: TalentShareCard - ${`https://thetalentclub.co.in/upload/sharecard/${image?.data?.map((item) => item.finalcard)}`}`);
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
        window.open(twitterShareUrl, '_blank');
    };
    const handleShareOnLinkedIn = () => {
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://thetalentclub.co.in/upload/sharecard/${image?.data?.map((item) => item.finalcard)}`)}`;
        window.open(linkedInShareUrl, '_blank');
    };
    const handleShareOnWhatsApp = () => {
        const messageToShare = encodeURIComponent(`Check out this post: TalentShareCard ${`https://thetalentclub.co.in/upload/sharecard/${image?.data?.map((item) => item.finalcard)}`}`);

        const whatsappShareUrl = `https://wa.me/?text=${messageToShare}`;
        window.open(whatsappShareUrl, '_blank');
    };

    const handleLoad = () => {
        setLoading(false)
    }


    return (
        <div className='pt70'>
            <Helmet>
                <meta property="og:title" content="Your Page Title" />
                <meta property="og:description" content="Nice" />
                <meta property="og:image" content='https://thetalentclub.co.in/ecomuploads/productimg/image1-1709810809565.jpg' />
                <meta property="og:image:width" content="800" />
                <meta property="og:image:height" content="600" />
            </Helmet>

            
            <div style={{ height: "400px" }}>
                {loading && <div><img src={loader} style={{ width: "70px", position: 'absolute', left: "50%", transform: "translateX(-50%)" }} alt='' /></div>}
                <img width="100%" src={`https://thetalentclub.co.in/upload/sharecard/${memoizedImage}`} alt='gpo' onLoad={handleLoad} />

            </div>
            <div style={{ padding: "0px 50px" }}>
                <img width="100%" src={logo} alt='' />
            </div>
            <div className='icon-box d-flex align-items-center justify-content-evenly'>
                <i class="ri-facebook-circle-line bg-primary" style={{ background: '#0866FF' }} onClick={handleShareOnFacebook}></i>
                <i class="ri-instagram-line" style={{ background: '#FF0882' }} onClick={handleShareOnInstagram}></i>
                <i class="ri-twitter-line" style={{ background: '#1D9BF0' }} onClick={handleShareOnTwitter}></i>
                <i class="ri-linkedin-box-line" style={{ background: '#0077B5' }} onClick={handleShareOnLinkedIn}></i>
                <i class="ri-whatsapp-line" style={{ background: '#11BA17' }} onClick={handleShareOnWhatsApp}></i>
            </div>

            <div className='text-center py-2'><Link to="/dash">Back to home</Link></div>

        </div>
    )
}

export default GenerateCard