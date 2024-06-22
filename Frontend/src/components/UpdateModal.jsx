import {react,useState} from 'react'
import {Button, Form,Modal } from 'react-bootstrap';

export default function UpdateModal({children}){
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

    return(
      <>
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
      {children}
    </>
    );
}