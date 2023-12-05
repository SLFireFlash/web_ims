import { useState } from "react"
import { Link } from "react-router-dom"


export default function LoginHelp(){
    const[email,setEmail] =useState('');

    const resetpw =()=>{
        console.log('reset email: ' + email)
    }

    return(
        <div className="login-background">
            <div className="login-form-title">
                <h2>Reset Password</h2>
            </div>

            <div className="login-inputs">
                <input type="text" name="username" placeholder="Email" onChange={ev=>setEmail(ev.target.value)} />
            </div>

            <div className="submit-btn">
                <button type="button" onClick={resetpw} className="btn">Reset Password</button>
            </div>
            <div className="login-help">
                <p>
                    check your emails and spam forder for the password reset 
                    Email
                </p>
            </div>

            <div className="new-user">
                <h3>Already have an account?</h3>
                <Link to="/login">Login</Link>
            </div>


        </div>
    )
}