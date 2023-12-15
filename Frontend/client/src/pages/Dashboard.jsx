import { Link } from "react-router-dom"
import StatusCard from "../components/StatusCard"

export default function Dashboard(){
    return(
        <>

                <div className="dashboard">
                <div className="dashboard-welcome">
                    <h1>Never Worry About </h1>
                    <h1>Your Inventory Again</h1>
                </div>
                <div className="dashboard-status">
                    <StatusCard />
                    <StatusCard />
                    <StatusCard />

                </div>

                <div className="dashboard-buttons">
                    <div className="button-row">
                        <Link to={'/new_bill'} > Create New Bill </Link>
                        <Link to={'/add_product'} >Add New Product</Link>
                        <Link to={'/all_products'}>View All products</Link>
                    </div>
                    <div className="button-row">
                        <Link to={'update_product'} >Update Products</Link>
                        <Link to={''} >Remove Product</Link>
                        <Link to={'/account'} >Account Info</Link>
                    </div>
                    <div className="button-row-mobi">
                        <Link to={'/products'} >View All products</Link>
                        <Link to={'/invoice'} >Make New Bill</Link>
                        <Link to={'/add_product'}>Add/Update Products</Link>
                    </div>
                    <div className="button-row-mobi">
                        <Link to={'/suplyers'} >Suplyers</Link>
                        <Link to={'/customers'} >Customers</Link>
                        <Link to={'/account'} >Account</Link>
                    </div>
                </div>
            </div>
            <div className="dashboard-loading dashboard-loading-off">
                <div class="ring">Loading
                    <span></span>
                </div>
            </div>
        </>
    )
}