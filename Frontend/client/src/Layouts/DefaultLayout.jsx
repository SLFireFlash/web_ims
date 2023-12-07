import { Navigate, Outlet ,Link} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";


export default function DefaultLayout(){
    const {token}= useStateContext();
    const logout =()=>{
        localStorage.removeItem('ACCESS_TOKEN');
        console.log('logout')
    }
    if(!token){
        return(
            <Navigate to="/login_new" />
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
                        <Link to={'/logout'} onClick={logout} className="logout-cls">Logout</Link>
                    </div>

                </aside>
                <div className="default-content">
                    <div className="default-header">
                        <Link to='/'><h2>Home</h2></Link>
                        <h3>user info</h3>
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