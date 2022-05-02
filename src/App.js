

import './App.css';
import Home from './pages/Home';
import Register from './pages/register/Register';
import SignedOut from './pages/SignedOut/SignedOut'
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { isAuthenticatedSelector } from './redux/user/userSlice';


function App() {
  const isAuthenticated = useSelector(isAuthenticatedSelector);


  return (
    <>

      <Routes>
        <Route path="/" element={<SignedOut />} />v
        <Route path="/home" element={isAuthenticated ? <Home /> : <SignedOut />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>

    </>
  );
}

export default App;
