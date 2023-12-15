import React, { useEffect, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axiosClient from '../AxiosClient';
import { useStateContext } from "../context/ContextProvider";

//alerts
import Swal from 'sweetalert2'

export default function RegisterNew(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passowrdRef = useRef();
    const confirm_password = useRef();
    const accountToken = useRef();

    const {setToken,setUser}=useStateContext();

    const OnSingUp =(ev)=>{
        ev.preventDefault();
        if(passowrdRef.current.value == confirm_password.current.value){
            const payload ={
                name:nameRef.current.value,
                email:emailRef.current.value,
                password:passowrdRef.current.value,
                passowrd_confimation:confirm_password.current.value,
                account_token:accountToken.current.value,
            }

            axiosClient.post('/signup', payload)
                .then(({data}) => {
                    Swal.fire({
                        icon: "success",
                        title: "Hi " + data.user +" Your account has been created!",
                        showConfirmButton: false,
                        timer:2500
                      })
                    setUser(data.user)
                    setToken(data.token);
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Signup Failed!",
                        text: err.response.data.message,
                        showConfirmButton: true,

                      });
                })

        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password Missmatch Try Again",
              });
            const playload={
                password:passowrdRef.current.value,
                passowrd_confimation:confirm_password.current.value,
                status:'password missmatch'
            }
            passowrdRef.current.value =null;
            confirm_password.current.value =null;
            console.log(playload);

        }


    }

    return(
      <div className="sign">
        <form>
          <h1>Register</h1>
          <div className="mb-3">
              <label>user name</label>
              <input ref={nameRef} type="text" className="form-control" placeholder="username"/>
          </div>
          <div className="mb-3">
              <label>Email address</label>
              <input ref={emailRef} type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
              <label>Password</label>
              <input ref={passowrdRef} type="password" className="form-control" placeholder="Enter password"/>
          </div>
          <div className="mb-3">
              <label>confirm password</label>
              <input ref={confirm_password} type="password" className="form-control" placeholder="confirm password"/>
          </div>
          <div className="mb-3">
              <label>Token</label>
              <input ref={accountToken} type="password" className="form-control" placeholder="Token" />
          </div>
          <div className="d-grid">
              <button type="button" onClick={OnSingUp} className="btn btn-primary">Sign Up </button>
          </div>
          <p className="forgot-password text-right">
              Already registered <Link to="/login">login?</Link>
          </p>
        </form>

      </div>

    );
}