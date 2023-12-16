import { Link } from "react-router-dom"

export default function(){
    return(
        <div className="invoice">
            <div className="Search-product">
                <div className="search-info">
                    <input type="text" name='ProductName' placeholder='Product Name' onChange={ev=>setProductNmae(ev.target.value)} />
                    <input type="text" name='VehicleName' placeholder='Vehicle Name' onChange={ev=>setVehicleName(ev.target.value)} />
                    <input type="text" name='Brand' placeholder='Product Brand' onChange={ev=>setBrand(ev.target.value)}/>
                </div>
                <div className="search-btn">
                    <button type="button" className='btn btn-primary btn-sm'>Search Product</button>
                </div>
            </div>
            <div className="bill-table">
                
            </div>

            <div className="bill-btns">
                {/* <div className="d-grid">
                    <p className="text-light">Add New product ? <Link to={'/add_product'}>Add Product</Link></p>
                </div> */}
                <div className="button-row-update">
                    <Link to={'/invoice'} > Bill </Link>
                    <Link to={'/add_product'} >Add Product</Link>
                    <Link to={'/products'}>All products</Link>
                </div>
            </div>
        </div>
    )
}