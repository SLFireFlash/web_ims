import React from 'react';
import { Link } from 'react-router-dom';


export default function ResetPassword(){
    return(
      <div className="sign">
        <form>
          <h1>Reset Password</h1>
          <div className="mb-3">
              <label>New Password</label>
              <input type="password" className="form-control" placeholder="New password"/>
          </div>
          <div className="mb-3">
              <label>Comform Password</label>
              <input type="password" className="form-control" placeholder="Comform Password" />
          </div>
          <div className="d-grid">
              <button type="submit" className="btn btn-primary">Reset Password</button>
          </div>
          <p className="forgot-password text-right">
              Go Back To Login <Link to="/login_new">login?</Link>
          </p>
        </form>

      </div>

    );
}