import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useRef,useState} from 'react';
import axiosClient from '../AxiosClient';
import { Table, Button, Form,Modal } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Swal from 'sweetalert2'





export default function Products(){
    const [Id,setId]  = useState(0);
    const [Quantity,setQuantity]  = useState(0);
    const [buyingPrice,setbuying_price]  = useState(0);
    const [productBrand,setproduct_brand]  = useState('No Brand');
    const [productName,setproduct_name]  = useState('No Name');
    const [sellingPrice,setselling_price]  = useState(0);
    const [vehicleName,setvehicle_name]  = useState('No Name');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState([]);
    const [allproducts,setAllproducts]=useState(1);
    const [perPage,serPerPage] =useState(1);
    const [page,setPage] = useState(1) ;     
    useEffect(() => {
        fetchData();
    }, [page]);
      
    const fetchData = async () => {
        try {
            const response = await axiosClient.get(`/allproducts?page=${page}`);
                setProducts(response.data.All_Products.data);
                setAllproducts(response.data.All_Products.total);
                serPerPage(response.data.All_Products.per_page);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const loadProductData =(product,type)=>{
        setId(product.id);
        setQuantity(product.Quantity);
        setbuying_price(product.buying_price);
        setproduct_brand(product.product_brand);
        setproduct_name(product.product_name);
        setselling_price(product.selling_price);
        setvehicle_name(product.vehicle_name);
        handleShow()
    }
    const updateProduct = ()=>{
            const payload ={
                Quantity: Quantity,
                buying_price: buyingPrice,
                id: Id,
                product_brand: productBrand,
                product_name: productName,
                selling_price: sellingPrice,
                vehicle_name: vehicleName
            }
            axiosClient.post('/updateProduct',payload)
            .then(({data})=>{
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product Updated Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                fetchData()
                handleClose()
            })
            .catch(err=>{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed! try Again",
                    showConfirmButton: false,
                    timer: 1500
                  });
                console.log(err); 
                handleClose();
            })
    }

    const EditProduct = (product)=>{
        const payload ={
            id: product.id
        }
        axiosClient.post('/removeProduct',payload)
        .then(()=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Product Removed Successful",
                showConfirmButton: false,
                timer: 1500
              });
            fetchData()
        })
        .catch(err=>{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed! try Again",
                showConfirmButton: false,
                timer: 1500
              });
            console.log(err);
        })
    }
    return(
        <div className="product-table">
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
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.vehicle_name}</td>
                    <td>{product.product_name}</td>
                    <td>{product.product_brand}</td>
                    <td>{product.Quantity}</td>
                    <td>{product.buying_price}</td>
                    <td>{product.selling_price}</td>
                    <td><Button type='button' variant="outline-warning" onClick={() => loadProductData(product)}  className='w-100'>Edit</Button></td>
                    <td><Button variant="outline-danger" onClick={() => EditProduct(product)}  className='w-100'>Remove</Button></td>
                    </tr>
                ))}                  
            </tbody>
      </Table>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>id <small>(you cant change id)</small></Form.Label>
              <Form.Control type="number" value={Id} onChange={ev=>setId(ev.target.value)} disabled placeholder="id" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>vehicle name</Form.Label>
              <Form.Control type="text" onChange={ev=>setvehicle_name(ev.target.value)} value={vehicleName} placeholder="vehicle name" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>product name</Form.Label>
              <Form.Control type="text" onChange={ev=>setproduct_name(ev.target.value)} value={productName} placeholder="product name" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>product brand</Form.Label>
              <Form.Control type="text" onChange={ev=>setproduct_brand(ev.target.value)} value={productBrand} placeholder="product brand" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" onChange={ev=>setQuantity(ev.target.value)} value={Quantity} placeholder="Quantity" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>buy price</Form.Label>
              <Form.Control type="number" onChange={ev=>setbuying_price(ev.target.value)} value={buyingPrice} placeholder="buying price" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>sell price</Form.Label>
              <Form.Control type="number" onChange={ev=>setselling_price(ev.target.value)} value={sellingPrice} placeholder="selling price" autoFocus/>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateProduct}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>



        </div>


    );
}