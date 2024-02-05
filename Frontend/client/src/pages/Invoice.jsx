import {Button,Modal,Table,Form }from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axiosClient from '../AxiosClient';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useStateContext } from "../context/ContextProvider";
import Swal from 'sweetalert2'






export default function Invoice(){
    const [ProductName,setProductNmae] =useState();
    const [VehicleName,setVehicleName]=useState();
    const [Brand,setBrand]=useState();
    const [products, setProducts] = useState([]);
    const [allproducts,setAllproducts]=useState(1);
    const [perPage,serPerPage] =useState(1);
    const [page,setPage] = useState(1) ; 
    //get user info
    const {user}= useStateContext();
    console.log(user);
    //model show hide
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //cart form
    const [Id,setId]  = useState(0);
    const [Quantity,setQuantity]  = useState(0);
    const [buyingPrice,setbuying_price]  = useState(0);
    const [productBrand,setproduct_brand]  = useState('No Brand');
    const [productName,setproduct_name]  = useState('No Name');
    const [sellingPrice,setselling_price]  = useState(0);
    const [vehicleName,setvehicle_name]  = useState('No Name');

    const loadProductData =(product,type)=>{
        setId(product.id);
        //setQuantity(product.quantity);
        setbuying_price(product.buying_price);
        setproduct_brand(product.brand_name);
        setproduct_name(product.product_name);
        setselling_price(product.selling_price);
        setvehicle_name(product.vehicle_name);
        handleShow()
    }
    const fetchData = async () => {
        try {
            let payload ={
                ProductName:ProductName,
                VehicleName:VehicleName,
                Brand:Brand
            }
            const response = await axiosClient.post(`/search?page=${page}`,payload);
                setProducts(response.data.SearchResult.data);
                setAllproducts(response.data.SearchResult.total);
                serPerPage(response.data.SearchResult.per_page);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
         fetchData();
     }, [page]);

    // useEffect(()=>{
    //     let payload ={
    //         ProductName:ProductName,
    //         VehicleName:VehicleName,
    //         Brand:Brand
    //     }
    //     axiosClient.post('/search',payload)
    //     .then(({data})=>{
    //         setProducts(data.SearchResult);
    //     })
    //     //console.log(payload);

    // },[ProductName,VehicleName,Brand])


    const searchData =()=>{
        setPage(1)
        fetchData()
        console.log('Product Name: '+ ProductName);
        console.log('Vehicle Name: '+VehicleName);
        console.log('Brand: '+Brand);
    }
    const addToCart = ()=>{
        const payload ={
            id: Id,
            quantity: parseInt(Quantity),
            vehicle_name: vehicleName,
            product_name: productName,
            brand_name: productBrand,
            buying_price: parseFloat(buyingPrice),
            selling_price: parseFloat(sellingPrice),
            user_id: user.id,

        }
        axiosClient.post('/AddToCart',payload)
        .then(({data})=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Product Successfuly Added",
                showConfirmButton: false,
                timer: 1000
              });
            handleClose()
        })
        .catch(err=>{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed! try Again",
                showConfirmButton: false,
                timer: 1000
              });
            console.log(err); 
            handleClose();
        })
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
                <Table striped responsive>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>vehicle name</th>
                        <th>product name</th>
                        <th>product brand</th>
                        <th>Quantity</th>
                        <th>buy Price</th>
                        <th>Sell Price</th>
                        <th>Add To Cart</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.vehicle_name}</td>
                        <td>{product.product_name}</td>
                        <td>{product.brand_name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.buying_price}</td>
                        <td>{product.selling_price}</td>
                        <td><Button type='button' variant="outline-primary" onClick={() => loadProductData(product)} className='w-100 btn-sm'>add to cart</Button></td>
                        </tr>
                        
                    ))}  
          
                </tbody>
                </Table>
            </div>

            <div className="bill-btns">
            {/* pagination stat */}
              <PaginationControl
                page={page}
                between={6}
                total={allproducts}
                limit={perPage}
                changePage={(page) => {
                setPage(page)
                }}
                ellipsis={1}
            />
            {/* pagination end */}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add to cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    {/* <Form.Group className="mb-3">
                        <Form.Label>id <small>(you cant change id)</small></Form.Label>
                        <Form.Control type="number" value={Id} onChange={ev=>setId(ev.target.value)} disabled placeholder="id" autoFocus/>
                    </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>vehicle name</Form.Label>
                        <Form.Control type="text" onChange={ev=>setvehicle_name(ev.target.value)} value={vehicleName} placeholder="vehicle name" autoFocus/>
                    </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>product name</Form.Label>
                        <Form.Control type="text" onChange={ev=>setproduct_name(ev.target.value)} value={productName} placeholder="product name" autoFocus/>
                    </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>product brand</Form.Label>
                        <Form.Control type="text" onChange={ev=>setproduct_brand(ev.target.value)} value={productBrand} placeholder="product brand" autoFocus/>
                    </Form.Group> */}
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" onChange={ev=>setQuantity(ev.target.value)} value={Quantity} placeholder="Quantity" autoFocus/>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                        <Form.Label>buy price</Form.Label>
                        <Form.Control type="number" onChange={ev=>setbuying_price(ev.target.value)} disabled value={buyingPrice} placeholder="buying price" autoFocus/>
                    </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>sell price</Form.Label>
                        <Form.Control type="number" onChange={ev=>setselling_price(ev.target.value)} value={sellingPrice} placeholder="selling price" autoFocus/>
                    </Form.Group> */}
                    
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={addToCart}>
                    Add Item
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}