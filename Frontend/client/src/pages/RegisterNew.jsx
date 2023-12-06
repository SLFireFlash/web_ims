import React from 'react';
import { Link } from 'react-router-dom';


export default function RegisterNew(){
    return(
      <div className="sign">
        <form>
          <h1>Register</h1>
          <div className="mb-3">
              <label>user name</label>
              <input type="text" className="form-control" placeholder="username"/>
          </div>
          <div className="mb-3">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password"/>
          </div>
          <div className="mb-3">
              <label>Token</label>
              <input type="password" className="form-control" placeholder="Token" />
          </div>
          <div className="d-grid">
              <button type="submit" className="btn btn-primary">Sign Up </button>
          </div>
          <p className="forgot-password text-right">
              Already registered <Link to="/login_new">login?</Link>
          </p>
        </form>

      </div>

    );
}