//InBuuild
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

//Custom Build
import StatusCard from "../components/StatusCard"
import axiosClient from "../AxiosClient";
import StatusBar from "../components/StatusBar";
import DashboardChart from "../components/DashboardChart";
import DashboardButton from "../components/DashboardButton";

//MUI
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//images
import inventoryI from '../assets/svg/inventory.svg';
import inventory_2I from '../assets/svg/inventory_2.svg';
import phone3I from '../assets/svg/phone3.svg';
import phone2I from '../assets/svg/phone2.svg';
import phoneI from '../assets/svg/phone.svg';
import vanI from '../assets/svg/van.svg';
import totalsalesI from '../assets/svg/total_sales.svg';
import totalsales2I from '../assets/svg/total_sales_2.svg';





export default function Dashboard(){
    const [productCount,setProductCount] =useState('');
    const [maxCount,setmaxCount] =useState('');
    const [minCount,setminCount] =useState('');
    const [visible,setvisible] =useState(false);
    const buttons = [
        <Button key="one">One</Button>,
        <Button key="two">Two</Button>,
        <Button key="three">Three</Button>,
      ];

        useEffect(()=>{
            setvisible(true);
            axiosClient.get('/productcount')
            .then(({data})=>{
                setProductCount(data.productCount);
                setmaxCount(data.maxValue['quantity']);
                setminCount(data.minValue['quantity']);
                setvisible(false);
            })
            .catch(err=>{
                console.log(err);
            })
        }, []);

    return(
        <>
                <div className="dashboard">
                    <div className="dashboard-welcome">
                        <StatusBar visible={visible} Mdata={maxCount} Tdata={'Total sales'} Mimg={totalsalesI} TImg={totalsales2I} />
                        <StatusBar visible={visible} Mdata={productCount} Tdata={'Total Products'} Mimg={inventoryI} TImg={inventory_2I} color={'#0dde94'}/>
                        <StatusBar visible={visible} Mdata={productCount} Tdata={'Total Customers'} Mimg={phone3I} TImg={phone2I} color={'#ff7a8b'}/>
                        <StatusBar visible={visible} Mdata={minCount} Tdata={'Total Suplyers'} Mimg={phoneI} TImg={vanI} color={'#05c4c9'} />
                    </div>
                    <div className="dashboard-status">
                        <DashboardChart />
                        <DashboardButton />
                        {/* <StatusCard CardName='Number of products' visible={visible} content={productCount} />
                        <StatusCard CardName='Lowest Stock products' visible={visible} content={minCount}/>
                        <StatusCard CardName='highest Stock products' visible={visible}  content={maxCount}/> */}

                    </div>

                    <div className="dashboard-buttons">
                        <ButtonGroup  size="large" aria-label="large button group">
                            <Link to={'/invoice'} ><Button key="one">New Bill</Button></Link>,
                            <Link to={'/add_product'} ><Button key="two">New Product</Button></Link>,
                            <Link to={'/products'}><Button key="three">All products</Button></Link>,
                            <Link to={'/update_product'} ><Button key="one">Update Products</Button></Link>,
                            <Link to={''} ><Button key="two">Remove Product</Button></Link>,
                            <Link to={'/account'} ><Button key="three">Account Info</Button></Link>,
                        </ButtonGroup>

                        {/* <div className="button-row">
                            <Link to={'/invoice'} > Create New Bill </Link>
                            <Link to={'/add_product'} >Add New Product</Link>
                            <Link to={'/products'}>View All products</Link>
                        </div>
                        <div className="button-row">
                            <Link to={'/update_product'} >Update Products</Link>
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
                        </div> */}
                    </div>
            </div>
            <div className="dashboard-loading dashboard-loading-off">
                <div className="ring">Loading
                    <span></span>
                </div>
            </div>
        </>
    )
}