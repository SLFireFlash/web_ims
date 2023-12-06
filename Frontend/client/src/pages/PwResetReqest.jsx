import { Link, Navigate } from "react-router-dom";
export default function ResetPassword(){
    const passwordReset =()=>{
        
    }
    return(
        <div className="sign">
        <form>
            <h1>Password Reset</h1>
            <div className="mb-3">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email"/>
            </div>
            <Link to='/password_token_check'>
                <div className="d-grid">
                        <button type="button" onClick={passwordReset} className="btn btn-primary">Reset Password</button>
                </div>
            </Link>
            <p className="forgot-password text-right">
                Already Have An Account? <Link to="/login_new">Login</Link>
            </p>
        </form>
    </div>
    );
}