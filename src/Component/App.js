import { Outlet, createBrowserRouter } from 'react-router-dom';

import CreatePost from './CreatePost';
// import Dash from './Dash';
import { App } from '@capacitor/app';
import Faq from './Faq';
import Feedback from './Feedback';
import Footer from './Footer';
// import GroupPost from './GroupPost';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../Frames/Frame';
import Frame10 from '../Frames/Frame10';
import Frame11 from '../Frames/Frame11';
import Frame12 from '../Frames/Frame12';
import Frame13 from '../Frames/Frame13';
import Frame14 from '../Frames/Frame14';
import Frame15 from '../Frames/Frame15';
import Frame16 from '../Frames/Frame16';
import Frame2 from '../Frames/Frame2';
import Frame3 from '../Frames/Frame3';
import Frame4 from '../Frames/Frame4';
import Frame5 from '../Frames/Frame5';
import Frame6 from '../Frames/Frame6';
import Frame7 from '../Frames/Frame7';
import Frame8 from '../Frames/Frame8';
import Frame9 from '../Frames/Frame9';
import Header from './Header';
import Login from './Login';
import MyBucketList from './MyBucketList';
import MyGroup from './MyGroup';
import { Mypost } from './Mypost';
import Profile from './Profile';
import QuestionCategoriesList from './QuestionCategoriesList';
import Questionaire from './Questionaire';
import Register from './Register';
import Setting from './Setting';
import TodaysOffer from './TodaysOffer';
// import GenerateCard from './GenerateCard';
import ShareCard from './ShareCard';
// import MyClub from './MyClub';
import useOnline from '../Utils/UseOnLine';
import Header2 from './Header2';
import Loader from './Loader';
import Policy from './Policy';
import Terms from './Terms';
// import ProfileDetailPage from './ProfileDetailPage';
// import PostlistingPage from './PostlistingPage';
import { ScreenOrientation, OrientationType } from '@capawesome/capacitor-screen-orientation';
const Dash = lazy(() => import('./Dash'));
const MyClub = lazy(() => import('./MyClub'));
const GroupPost = lazy(() => import('./GroupPost'));
const ProfileDetailPage = lazy(() => import('./ProfileDetailPage'));
const PostlistingPage = lazy(() => import('./PostlistingPage'));
// const MyPost = lazy(() => import('./MyPost'));
const GenerateCard = lazy(() => import('./GenerateCard'));

const Routing = createBrowserRouter([

  {
    path: '/generatecard/:shareid',
    element: (
      <Suspense fallback={<Loader />}>
        <GenerateCard />
      </Suspense>
    )
  },
  {
    path: '/',
    element: <MobApp />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/dash',
        element: (
          <Suspense fallback={<Loader />}>
            <Dash />
          </Suspense>
        ),
      },
      {
        path: '/grouppost/:groupid',
        element: (
          <Suspense fallback={<Loader />}>
            <GroupPost />
          </Suspense>
        ),
      },
      {
        path: '/offer',
        element: <TodaysOffer />,
      },
      {
        path: '/createpost',
        element: <CreatePost />,
      },
      {
        path: '/bucketlist',
        element: <MyBucketList />,
      },
      {
        path: '/myclub',
        element: (
          <Suspense fallback={<Loader />}>
            <MyClub />
          </Suspense>
        ),
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/profiledetailpage/:profileid',
        element: (
          <Suspense fallback={<Loader />}>
            <ProfileDetailPage />
          </Suspense>
        ),
      },

      {
        path: '/setting',
        element: <Setting />,
      },
      {
        path: '/group',
        element: <MyGroup />,
      },
      {
        path: '/reg',
        element: <Register />,
      },
      {
        path: '/mypost',
        element: (
          <Suspense fallback={<Loader />}>
            <Mypost />
          </Suspense>
        ),
      },
      {
        path: '/faq',
        element: <Faq />,
      },
      {
        path: '/feed',
        element: <Feedback />,
      },
      {
        path: '/questionaire/:id',
        element: <QuestionCategoriesList />
      },
      {
        path: '/questionaire/:id/:cid',
        element: <Questionaire />
      },
      {
        path: '/sharecard',
        element: <ShareCard />
      },
      {
        path: '/policy',
        element: <Policy />
      },
      {
        path: '/terms',
        element: <Terms />
      },
      {
        path: '/postlistingpage/:desc',
        element: (
          <Suspense fallback={<Loader />}>
            <PostlistingPage />
          </Suspense>
        )
      },
      {
        path: '/frame',
        element: <Frame />
      },
      {
        path: '/frame2',
        element: <Frame2 />
      },
      {
        path: '/frame3',
        element: <Frame3 />
      },
      {
        path: '/frame4',
        element: <Frame4 />
      },
      {
        path: '/frame5',
        element: <Frame5 />
      },
      {
        path: '/frame6',
        element: <Frame6 />
      },
      {
        path: '/frame7',
        element: <Frame7 />
      },
      {
        path: '/frame8',
        element: <Frame8 />
      },
      {
        path: '/frame9',
        element: <Frame9 />
      },
      {
        path: '/frame10',
        element: <Frame10 />
      },
      {
        path: '/frame11',
        element: <Frame11 />
      },
      {
        path: '/frame12',
        element: <Frame12 />
      },
      {
        path: '/frame13',
        element: <Frame13 />
      },
      {
        path: '/frame14',
        element: <Frame14 />
      },
      {
        path: '/frame15',
        element: <Frame15 />
      },
      {
        path: '/frame16',
        element: <Frame16 />
      },

    ],
  },
]);

// function checkLocalStorageAndRedirect(navigate) {
//   const id = localStorage.getItem('user_loggedin');
//   if (id == 'true') {
//     navigate('/dash');
//   }
// }


const portrait = async () => {
  await ScreenOrientation.lock({ type: OrientationType.PORTRAIT });
};

function MobApp() {
const [loader , setLoader] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {

    portrait()

    // const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // if (!isMobileDevice) {
    //   // Redirect to the Play Store URL for mobile users
    //   window.location.href = 'https://play.google.com/store/apps/details?id=com.tclub.app';
    // }

    const id = localStorage.getItem('user_loggedin');
    if (id === 'true') {
      navigate('/dash');
    }

    App.addListener('backButton', data => {
      console.log('Restored state:', data);

      if (window.location.pathname === '/dash') {
        console.log('dont go back')
      }
      else if (window.location.pathname === '/') {
        console.log('dont go back')
      }
      else {
        navigate(-1)
      }


    });
    
   
  


  }, [navigate]);

  setTimeout(() => {
    setLoader(false)
  }, 1000);


  const isOnline = useOnline();

  if (isOnline != true) {
    return <div className='error'>
      <div class="error-container">
        <h1 className='h1-404'> Offline </h1>
        <p className='p-404'>
          Oops! Your are offline Now.
        </p>
        <span>Pls Turn On Internet</span>
      </div>
    </div>;
  }


  return (


    <>
    {loader && <Loader/>}
      {window.location.pathname === '/dash' ? <Header /> : window.location.pathname !== '/' && <Header2 />}
      <Outlet />
      {window.location.pathname !== '/' && window.location.pathname !== '/reg' && window.location.pathname !== '/postlistingpage' && <Footer />}
    </>
  );
}

export default Routing;
