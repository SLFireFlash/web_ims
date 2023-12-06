import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function PwResetCheck(){
    return(
        <div className="sign">
        <form>
            <h1>Password Reset</h1>
            <div className="mb-3">
                <label>Email address</label>
                <input type="text" onChange={ev=>setResetToken(ev.target.value)} className="form-control" placeholder="Enter Token"/>
            </div>
            <Link to='/reset_password'>
                <div className="d-grid">
                        <button type="button" className="btn btn-primary">Go To Reset</button>
                </div>
            </Link>
            <p className="forgot-password text-right">
                Already Have An Account? <Link to="/login_new">Login</Link>
            </p>
        </form>
    </div>
    );

}
