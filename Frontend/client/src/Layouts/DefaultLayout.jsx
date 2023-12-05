import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";


export default function DefaultLayout(){
    const {token}= useStateContext();
    if(!token){
        return(
            <Navigate to="/login" />
        )     
    }else{
        return(

            <>
                <h1>default Layout</h1>
                <Outlet />
            </>
        )
    }


}