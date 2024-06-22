import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import hero from '../assets/hero.png';


export default function GuestLayout(){
    const name = 'user name';
    const placeholder = 'enter username'
    const {token}= useStateContext();
    if(token){
        return(
            <Navigate to={'/dashboard'} />
        )
    }
    else{
        return(
            <>
            <div className="guest-layout">
                <div className="hero-side">
                    <img src={hero} alt="hero" />
                </div>
                <div className="outlet-side">
                    <Outlet />
                </div>

            </div>
            </>

        )
    }
        // <div className="hero-img container">
        //     <img src={hero} alt="hero" />
        // </div>
        // <div className="signup-page">
        //     <Outlet />
        // </div>

}