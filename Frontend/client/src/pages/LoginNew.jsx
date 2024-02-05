import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../AxiosClient";
import { useStateContext } from "../context/ContextProvider";
//alerts
import Swal from 'sweetalert2'

export default function LoginNew(){
    const NameRef = useRef();
    const PasswordRef = useRef();
    const {setToken,setUser}=useStateContext();

    const OnLogin = (ev)=>{
        ev.preventDefault();
        const LoginData={
            user_name:NameRef.current.value,
            password:PasswordRef.current.value,
        }
        axiosClient.post('/login',LoginData)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token);
            Swal.fire({
                icon: "success",
                title: "Welcome Back " + data.user ,
                showConfirmButton: false,
                timer: 1500
              });

        })
        .catch(err=>{
            const response = err.response;
            console.log(response);
            Swal.fire({
                icon: "error",
                title: 'Login failed',
                text: response.data.message,
                showConfirmButton: true,
              });

        })
        
    }

    return(
        <div className="sign">
            <form>
                <h1>Log In</h1>
                <div className="mb-3">
                    <label>User name</label>
                    <input ref={NameRef} type="email" className="form-control" placeholder="Enter Username"/>
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input ref={PasswordRef} type="password" className="form-control" placeholder="Enter password"/>
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" onClick={OnLogin} className="btn btn-primary">Submit</button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <Link to="/Password_reset_request">password?</Link>
                </p>
                <p className="forgot-password text-right">
                    Dont Have An Account <Link to="/register">Register</Link>
                </p>
            </form>
        </div>


    );
}