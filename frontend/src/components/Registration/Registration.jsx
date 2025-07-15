import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import { app } from "../../assets/firebase";
import { getAuth } from "firebase/auth";


function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const auth = getAuth(app);
    const HandleSignUp = async(e)=>{
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado exitosamente.");    
        }catch(error){
            console.log(error);
        }
    }

    const HandleLogin = async(e)=>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Sesión iniciada");
        }catch(error){
            console.log(error.code);
        }
    }
    

    return(
        <div>
            <form>
                <input 
                type="text" 
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Introduce tu email"
                />
                <input 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={()=>HandleLogin}>Iniciar sesión</button>
            </form>
            <button onClick={()=>HandleSignUp}>Crear usuario</button>
        </div>
    )
}

export default Registration;