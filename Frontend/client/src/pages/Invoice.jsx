import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function Invoice(){
    const [ProductName,setProductNmae] =useState();
    const [VehicleName,setVehicleName]=useState();
    const [Brand,setBrand]=useState();

    const searchData =()=>{
        console.log('Product Name: '+ ProductName);
        console.log('Vehicle Name: '+VehicleName);
        console.log('Brand: '+Brand);
    }

    return(
        <div className="invoice">
            <div className="Search-product">
                <div className="search-info">
                    <input type="text" name='ProductName' placeholder='Product Name' onChange={ev=>setProductNmae(ev.target.value)} />
                    <input type="text" name='VehicleName' placeholder='Vehicle Name' onChange={ev=>setVehicleName(ev.target.value)} />
                    <input type="text" name='Brand' placeholder='Product Brand' onChange={ev=>setBrand(ev.target.value)}/>
                </div>
                <div className="search-btn">
                    <button type="button" className='btn btn-primary btn-sm' onClick={searchData}>Search Product</button>
                </div>
            </div>
            <div className="bill-table">
                
            </div>

            <div className="bill-btns">
            </div>
        </div>

    );
}