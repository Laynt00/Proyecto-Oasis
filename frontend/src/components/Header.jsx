import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from '../assets/userIcon.png';
import PopUpLogin from './PopUpLogin';

export default function Header(){
    const navigate = useNavigate();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    return (
            <div className="web-header">
                <div className="web-title" onClick={() => navigate("/")}>Oasis</div>
                <div className="user-wrapper">
                    <img
                    src={userIcon}
                    className="user-icon"
                    alt="Usuario"
                    onClick={() => setShowLoginPopup(!showLoginPopup)}
                    />
                </div>
                {showLoginPopup && (
                    <PopUpLogin onClose={() => setShowLoginPopup(false)} />
                )}
            </div>
    )
}