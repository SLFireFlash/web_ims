import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";


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
                <h1>welcome Friend</h1>
                <Outlet />
            </div>
            </>

        )
    }


}