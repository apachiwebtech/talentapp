import { Outlet, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SignupSIgnIn from './Components/Pages/SignupSIgnIn';
import Dash from './Components/Pages/Dash';
import Header from './Components/Layout/Header'
import Profile from './Components/Pages/Profile';
import MyClub from './Components/Pages/MyClub';
import ProfileDetail from './Components/Pages/ProfileDetailPage';
import SearchPage from './Components/Pages/SearchPage';
import Offer from './Components/Pages/Offer';
import { useEffect } from 'react';
import ClubDetailPage from './Components/Pages/ClubDetailPage';




const Routing = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/dash',
        element: <Dash />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/myclub',
        element: <MyClub />
      },
      {
        path: '/profiledetail/:userid',
        element: <ProfileDetail />
      },
      {
        path: '/clubdetailpage/:groupid',
        element: <ClubDetailPage />
      },
      {
        path: '/searchpage/:desc',
        element:  <SearchPage />

      },
      {
        path: '/offer',
        element:  <Offer />
        
        
      },
    ]
  },

])

function App() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
}

export default Routing;
