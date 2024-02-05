import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../AxiosClient";

//alerts
import Swal from 'sweetalert2'



export default function AddProduct(){
    const VehicleName =useRef();
    const ProductName =useRef();
    const ProductBrand =useRef();
    const Quantity =useRef();
    const BuyingPrice =useRef();
    const SellingPrice =useRef();

    const NewProduct =()=>{
        const payload ={
            vehicle_name:VehicleName.current.value,
            product_name:ProductName.current.value,
            product_brand:ProductBrand.current.value,
            quantity:Quantity.current.value,
            buying_price:BuyingPrice.current.value,
            selling_price:SellingPrice.current.value,
        }
        console.log(payload);
        axiosClient.post('/newproduct',payload)

        .then(({data})=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 2500
              });
        })
        .catch(err =>{
            console.log(err);
        })

    }


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
                        <button type="button" onClick={NewProduct}  className="btn btn-primary">Add Product</button>
                    </div>
                    <div className="d-grid">
                       <p>Update Exsisting product ? <Link to={'/update_product'}>Update Product</Link></p>
                    </div>
                </form>
                
            </div>

        </>
    )
}