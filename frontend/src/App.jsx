import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Map from './components/Map';
import { useLocation } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import CheckEmail from './components/CheckEmail';



function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
      </Routes>
    </>
    
  );
}

export default App;
