import { useEffect, useState,useRef } from "react";
import { Button, Table, Modal, CloseButton } from "react-bootstrap";
import axiosClient from "../AxiosClient";
import { useStateContext } from "../context/ContextProvider";
import { ThreeDots } from  'react-loader-spinner'
import Swal from 'sweetalert2'
import { useReactToPrint } from 'react-to-print';
import ReactDOM from 'react-dom/client';

export default function Cart({ handleCartClose }) {
  const [quantity, setQuantity] = useState(0);
  const { user } = useStateContext();
  const [CartProducts, setCartProdcuts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [visible,setvisible] =useState(true);
  const [fees,setFees] = useState(0);
  const [discounts,setDiscounts] = useState(0)
  const [subtotal,setSubtotal] =useState(0);
  const [fulltot,setFulltot]=useState(0);
  let totalSum =0

  const root = ReactDOM.createRoot(document.getElementById('root'));
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
   content: () => componentRef.current,
   documentTitle: 'Visitor Pass',
   onAfterPrint: () => console.log('Printed PDF successfully!'),
  })


  useEffect(()=>{
    setFulltot(0);
    const fs = parseInt(totalSum) + parseInt(fees) - parseInt(discounts);
    setFulltot(fs); 
  },[fees,discounts,quantities])

  const checkout =()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Make order"
    }).then((result) => {
      if (result.isConfirmed) {
        handlePrint()
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Bill exported!",
        //   icon: "success"
        // });
      }
    });
    console.log(fees);
    console.log(subtotal);
  }
  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  useEffect(() => {
    const payload = {
      userid: user.id,
    };
    axiosClient
      .post("/loadcart", payload)
      .then(({ data }) => {
        setCartProdcuts(data.data);
        setvisible(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //car model controll
  const [show, setShow] = useState(true);

  let a = quantity;
  const add = () => {
    a++;
    setQuantity(a);
  };

  return (
    <>
      <Modal show={show} onHide={handleCartClose} >
        <div className="cart-outer" ref={componentRef}>
          <div className="cart-left-side">
            <div className="cart-title-div">
              <h3>Current Oder</h3>
            </div>
            <div className="oder-items-cart">
              <Table hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Vehicle</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                      <ThreeDots
                            visible={visible}
                            height="100"
                            width="100"
                            ariaLabel="ThreeDots-loading"
                            wrapperStyle={{}}
                            wrapperClass="ThreeDots-wrapper"
                            glassColor = '#c0efff'
                            color = '#e15b64'
                            />
                    
                {CartProducts.map((product) => {
                    const total = product.selling_price * (quantities[product.id] || 0);
                    totalSum += total; 
                    
                    return (
                        <tr key={product.stock_id}>
                            <td>{product.product_name}</td>
                            <td>{product.vehicle_name}</td>
                            <td>
                                <input 
                                    type="number" 
                                    max={product.quantity} 
                                    value={quantities[product.id] || '1'} 
                                    onChange={(event) => handleQuantityChange(product.id, parseInt(event.target.value))} 
                                />
                            </td>
                            <td>{product.selling_price}</td>
                            <td>{total}</td>
                        </tr>
                    );
                })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="cart-right-side">
            {/* <div className="closebutton">
              
            </div> */}
            <div className="cart-title-div">
                <h3>Oder Summary</h3>
                <div className="tac">
                    
                    <CloseButton variant="black" onClick={handleCartClose}></CloseButton>
                </div>
            </div>
            <div className="Oder-Summary-info">
              <div className="Summary-cart">
                <p>Subtotal</p>
                <p>
                  <b><input type="number" className="osi"value={totalSum} onChange={(ev)=>{setSubtotal(ev.target.value)}} />$</b>
                </p>
              </div>
              <div className="Summary-cart">
                <p>fees</p>
                <p>
                  <b><input type="number" className="osi" onChange={(ev)=>{setFees(ev.target.value)}} />$</b>
                </p>
              </div>
              <div className="Summary-cart">
                <p>Discounts</p>
                <p>
                  <b><input type="number" className="osi"onChange={(ev)=>{setDiscounts(ev.target.value)}} />$</b>
                </p>
              </div>
              
            </div>
            <div className="checkout-cart">
              <div className="Summary-cart">
                <p>Total</p>
                <p>
                  <b>{fulltot}$</b>
                </p>
              </div>
              <div className="checkout-btn-div">
                <Button variant="primary" onClick={checkout}>Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
