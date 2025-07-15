import { useNavigate } from "react-router-dom";
import nameIcon from "../assets/nameIcon.png"
import emailIcon from "../assets/emailIcon.png"
import passwordIcon from "../assets/passwordIcon.png"

import {useState} from "react";
import {app} from "../assets/firebase";
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth";
import { getAuth } from "firebase/auth";


import {useState} from "react";
import {app} from "../assets/firebase";
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth";
import { getAuth } from "firebase/auth";


export default function RegisterPage(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const auth = getAuth(app);
    const HandleSignUp = async(e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado exitosamente.");    
        }catch(error){
            console.log(error);
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const auth = getAuth(app);
    const HandleSignUp = async(e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado exitosamente.");    
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="register-page-div">
            <button className="back-to-map" onClick={() => navigate("/map")}>Volver al mapa</button>
            <div className="div-register-form">
                <p>Registrarse</p>
                <form className="form-register">
                    <div className="input-wrapper">
                        <img src={nameIcon} className="form-icon" />
                        <input type="text" placeholder="Nombre" />
                    </div>
                    <div className="input-wrapper">
                        <img src={emailIcon} className="form-icon" />
                        <input type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Correo electrónico" />
                    </div>
                    <div className="input-wrapper">
                        <img src={passwordIcon} className="form-icon" />
                        <input type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña" />
                        <input type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña" />
                    </div>
                    <div className="input-wrapper">
                        <img src={passwordIcon} className="form-icon" />
                        <input type="password" placeholder="Repetir contraseña" />
                    </div>
                    <button className="button-register-form" onClick={()=>HandleSignUp}>Registrarse</button>
                </form>
            </div>
            <div className="div-login">
                <p>¡Bienvenido, nuevo usuario!</p>
                <p><u>Ingresa tus datos para crear una cuenta nueva</u>. Si ya tienes una cuenta, pulsa el siguiente botón para ir a la página de <b>Inicio de Sesión</b> .</p>
                <button className="button-login" onClick={() => navigate("/login")}>Iniciar Sesión</button>
            </div>
        </div>
    )
}