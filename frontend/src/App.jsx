import './App.css'
import './components/PopUpLogin'
import PopUpLogin from './components/PopUpLogin'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import { useState } from "react";

function App() {
  const [view, setView] = useState("popup");

  return (
    <>
      {view === "popup" && (
        <PopUpLogin onLogin={() => setView("login")} onRegister={() => setView("register")} />
      )}
      {view === "login" && <LoginPage />}
      {view === "register" && <RegisterPage />}
    </>
  )
}

export default App
