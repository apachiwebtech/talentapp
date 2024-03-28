import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupSIgnIn from './Components/Pages/SignupSIgnIn';

function App() {
  return (
    <>
    
      <Routes>
        <Route element={<SignupSIgnIn/>} path='/'></Route>
      </Routes>
    </>
  );
}

export default App;
