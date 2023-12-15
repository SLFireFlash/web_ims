import { Link } from "react-router-dom"
import StatusCard from "../components/StatusCard"
import { useEffect, useState } from "react"
import axiosClient from "../AxiosClient";
import StatusBar from "../components/StatusBar";

export default function Dashboard(){
    let [productCount,setProductCount] =useState('');
    let [maxCount,setmaxCount] =useState('');
    let [minCount,setminCount] =useState('');


    useEffect(()=>{
        axiosClient.get('/productcount')
        .then(({data})=>{
            setProductCount(data.productCount);
            setmaxCount(data.maxValue);
            setminCount(data.minValue);
        })
    });



    return(
        <>

                <div className="dashboard">
                    <div className="dashboard-welcome">
                        <StatusBar />
                    </div>
                    <div className="dashboard-status">
                        <StatusCard CardName='Number of products' content={productCount} />
                        <StatusCard CardName='Lowest Stock products' content={minCount}/>
                        <StatusCard CardName='highest Stock products' content={maxCount}/>

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