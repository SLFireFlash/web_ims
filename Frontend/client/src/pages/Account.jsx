import React from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/avatar7.png'

export default function Account(){

    return(
        <>
            <div className="user-profile">
                <div className="profile-logo m-2 d-flex">
                    <img src={profilePic} alt="profile image" />
                </div>
                <div className="user-info m-2 d-flex">
                    <div className="user-title">
                        <h1>Welcome</h1>
                        <h2>Lahiru Prasanna</h2>
                    </div>
                    <div className="user-data">
                        <p>Position : Developer</p>
                        <p>Email : Hiruprasa@gmail.com</p>
                        <p>Phone : 071234567</p>
                        <p>Permission  level : developer</p>
                    </div>
                </div>
            </div>
  
        <div className="btns-for-profile m-2">
            <Link to={'/updateAccount'} > Update Info </Link>
            <Link to={'/add_product'} >Logout</Link>
            <Link to={'/all_products'}>Remove Account</Link>
        </div>
        
        </>

  

    );
}