import { Navigate, Outlet ,Link} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../AxiosClient";
import Swal from 'sweetalert2'
import SideMenu from "../components/SideMenu";
import {Button,Table,Modal,CloseButton } from 'react-bootstrap';

import Cart from '../components/Cart';


import dashboardI from '../assets/svg/dashboard.svg';
import accountI from '../assets/svg/account.svg';
import customersI from '../assets/svg/customers.svg';
import logoutI from '../assets/svg/logout.svg';
import invoiceI from '../assets/svg/invoice.svg';
import productsI from '../assets/svg/products.svg';
import suplyerI from '../assets/svg/suplyer.svg';
import homeI from '../assets/svg/Home.svg';
import notificationsI from '../assets/svg/notifications.svg';
import contact_supportI from '../assets/svg/contact_support.svg';
import analyticI from '../assets/svg/analytics.svg';





export default function DefaultLayout(){
    const PageRef = useRef(false);
    const[PageSt,setPageSt] =useState(false);
    const {setUser,setToken,token,user}= useStateContext();
    
    const[CartShow,setCartShow] =useState(false);
    const handleCartClose = () => setCartShow(false);
    const handleCartShow = () => setCartShow(true);

    
    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data})=>{
            setUser(data)
        })
    },[])
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
    if(!token){
        return(
            <Navigate to="/login" />
        )     
    }else{

        return(
            
            <>
            <div className="defult-layout ">
               
                {/* <aside>
                    <div className="main-buttons ms-2">
                        <img src={analyticI} alt="side hero" />
                        <Link to={'/dashboard'}> <img src={dashboardI} alt="dashboard" className="me-2" />Dashboard</Link>
                        <Link to={'/products'}> <img src={productsI}className="me-2" alt="Products" />Products</Link>
                        <Link to={'/invoice'}> <img src={invoiceI}className="me-2" alt="Invoice" />Invoice</Link>
                        <Link to={'/customers'}> <img src={customersI}className="me-2" alt="Customers" />Customers</Link>
                        <Link to={'/suplyers'}> <img src={suplyerI}className="me-2" alt="Suplyer" />Suplyer</Link>

                    </div>
                    <div className="other-buttons ms-2">
                        <Link to={'/account'}  className="acconut-cls"> <img src={accountI}className="me-2" alt="Account" />Account</Link>
                        <Link onClick={Logout} className="logout-cls" to={'/login'} > <img src={logoutI}className="me-2" alt="Logout" />Logout</Link>

                    </div>

                </aside> */}
                <div className="default-content">
                    <div className="default-header">
                        
                        <div className="d-flex mb-3">
                            <SideMenu />
                        </div>
                        <div>
                        <h3>Welcome back {user.user_name}</h3>
                        <div className="cart">
                        {CartShow ? <Cart handleCartClose ={handleCartClose}/> : null}
                        </div>
                        </div>
                        <div className="nav_icons">
                            <button onClick={handleCartShow}><img src={invoiceI} alt="cart" className="me-2 w-100" /></button>
                            {/* <Link to='/'><img src={accountI} alt="account" className="me-2 w-100" /></Link> */}
                        </div>
                        

                        {/* <Link to='/'><h2>Home</h2></Link>
                        <h3>Hi,{user.name}</h3> */}
                    </div>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
                
            </>

        )
    }


}