import { useState } from "react";
import { Link } from "react-router-dom";

 export default function Register(){
    const [token,setToken]=useState('');
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassowrd]=useState('');

    const setUser =()=>{
        console.log('Token: ' + token)
        console.log('Email: '+email);
        console.log('username: '+username);
        console.log('password: '+password);
    
    }
    return(
        <div className="login-background">
        <div className="login-form-title">
            <h2>Register</h2>
        </div>

        <div className="login-inputs">
            <input type="text" name="username" placeholder="Token" onChange={ev=>setToken(ev.target.value)} />
            <input type="text" name="username" placeholder="Email" onChange={ev=>setEmail(ev.target.value)}/>
            <input type="text" name="username" placeholder="username" onChange={ev=>setUsername(ev.target.value)} />
            <input type="password" name="password" placeholder="password" onChange={ev=>setPassowrd(ev.target.value)} />
        </div>

        <div className="submit-btn">
            <button type="button" onClick={setUser} className="btn">Register</button>
        </div>
        <div className="new-user">
            <h3>Already have an account?</h3>
            <Link to="/login">Login</Link>
        </div>


    </div>
    )
 }