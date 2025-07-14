import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Map from './components/Map';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
