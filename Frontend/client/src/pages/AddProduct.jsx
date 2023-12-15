import { useRef } from "react";
import { Link } from "react-router-dom";



export default function AddProduct(){
    const VehicleName =useRef();
    const ProductName =useRef();
    const ProductBrand =useRef();
    const Quantity =useRef();
    const BuyingPrice =useRef();
    const SellingPrice =useRef();


    return(
        <>
            <div className="NewProduct">
                <form>
                    <h1>Add New Product</h1>
                    <div className="mb-3">
                        <label>Vehicle Name</label>
                        <input type="text" ref={VehicleName} className="form-control" placeholder="Vehicle Name"/>
                    </div>
                    <div className="mb-3">
                        <label>Product Name</label>
                        <input type="text" ref={ProductName} className="form-control" placeholder="Product Name" />
                    </div>
                    <div className="mb-3">
                        <label>Product Brand</label>
                        <input type="text" ref={ProductBrand} className="form-control" placeholder="Product Brand"/>
                    </div>
                    <div className="mb-3">
                        <label>Quantity</label>
                        <input type="number" ref={Quantity} className="form-control" placeholder="Quantity" />
                    </div>
                    <div className="mb-3">
                        <label>Buying Price</label>
                        <input type="number" ref={BuyingPrice} className="form-control" placeholder="Buying Price"/>
                    </div>
                    <div className="mb-3">
                        <label>Selling Price</label>
                        <input type="number" ref={SellingPrice} className="form-control" placeholder="Selling Price" />
                    </div>

                    <div className="d-grid">
                        <button type="button"  className="btn btn-primary">Add Product</button>
                    </div>
                    <div className="d-grid">
                       <p>Update Exsisting product ? <Link to={'/update_product'}>Update Product</Link></p>
                    </div>
                </form>
                
            </div>

        </>
    )
}