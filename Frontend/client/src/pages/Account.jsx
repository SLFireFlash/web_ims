import React from 'react';
import { Link } from 'react-router-dom';

//pages
import { useStateContext } from "../context/ContextProvider";
import axiosClient from '../AxiosClient';

//assets
import profilePic from '../assets/avatar7.png'
//alerts
import Swal from 'sweetalert2'

export default function Account(){
    const {setUser,setToken,user} =useStateContext();
    const Logout =()=>{

    console.log('logout request');
    Swal.fire({
        title: "Are you sure?",
        text: "You About to Logout!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout it!"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "Good Bye!",
            text: "See You Around",
            icon: "success"
            });
          axiosClient.get('/logout')
          .then(()=>{
            setUser({});
            setToken(null);              
          })
          .catch(err=>{
            console.log(err);
          })
        }
        });
        
    }
    return(
        <>
            <div className="user-profile">
                <div className="profile-logo m-2 d-flex">
                    <img src={profilePic} alt="profile image" />
                </div>
                <div className="user-info m-2 d-flex">
                    <div className="user-title">
                        <h1>Welcome</h1>
                        <h2>{user.name}</h2>
                    </div>
                    <div className="user-data">
                        <p>Position : Developer</p>
                        <p>Email : {user.email}</p>
                        <p>Phone : 071234567</p>
                        <p>Permission  level : developer</p>
                    </div>
                </div>
            </div>
  
        <div className="btns-for-profile m-2">
            <Link to={'/updateAccount'} > Update Info </Link>
            <Link onClick={Logout} to={'/login'} >Logout</Link>
            <Link  to={'/all_products'}>Remove Account</Link>
        </div>
        
        </>

  

    );
}