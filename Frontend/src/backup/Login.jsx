import { useState } from "react";
import { Link } from "react-router-dom";


export default function Login(){
    const [username,setUsername] =useState('');
    const [password,setPassword]=useState('');

    const login =()=>{
        console.log('username: '+ username);
        console.log('password: '+ password);

    }

    return(
        <div className="login-background">
            <div className="login-form-title">
                <h2>Login</h2>
            </div>

            <div className="login-inputs">
                <input type="text" name="username" placeholder="user name" onChange={ev=>setUsername(ev.target.value)} />
                <input type="password" name="password" placeholder="password" onChange={ev=>setPassword(ev.target.value)} />
            </div>

            <div className="submit-btn">
                <button type="button" onClick={login} className="btn">Login</button>
            </div>
            <div className="login-help">
                <div className="rem-me">
                    <input type="checkbox" name="rememberMe" />
                    <label htmlFor="checkbox">Remember me</label>
                </div>
                <Link to='/login_help'>Need help?</Link>
            </div>
            <div className="new-user">
                <h3>Dont have an account?</h3>
                {/* <Link to="/register">Register</Link> */}
                <Link to="/registernew">Register</Link>
            </div>


        </div>
    )
}