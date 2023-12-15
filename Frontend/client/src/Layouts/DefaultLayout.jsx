import { Navigate, Outlet ,Link} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../AxiosClient";

//alerts
import Swal from 'sweetalert2'


export default function DefaultLayout(){
    const PageRef = useRef(false);
    const[PageSt,setPageSt] =useState(false);
    const {setUser,setToken,token,user}= useStateContext();

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

                <aside>
                    <div className="main-buttons">
                        <Link to={'/dashboard'}>Dashboard</Link>
                        <Link to={'/products'}>Products</Link>
                        <Link to={'/invoice'}>Invoice</Link>
                        <Link to={'/customers'}>Customers</Link>
                        <Link to={'/suplyers'}>Suplyer</Link>

                    </div>
                    <div className="other-buttons">
                        <Link to={'/account'} className="acconut-cls">Account</Link>
                        <Link onClick={Logout} className="logout-cls" to={'/login'} >Logout</Link>

                    </div>

                </aside>
                <div className="default-content">
                    <div className="default-header">
                        <Link to='/'><h2>Home</h2></Link>
                        <h3>Hi,{user.name}</h3>
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