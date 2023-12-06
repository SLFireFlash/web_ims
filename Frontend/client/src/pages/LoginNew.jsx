import { Link } from "react-router-dom";

export default function LoginNew(){
    return(
        <div className="sign">
            <form>
                <h1>Log In</h1>
                <div className="mb-3">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"/>
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"/>
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <Link to="/Password_reset_request">password?</Link>
                </p>
                <p className="forgot-password text-right">
                    Dont Have An Account <Link to="/register_new">Register</Link>
                </p>
            </form>
        </div>


    );
}