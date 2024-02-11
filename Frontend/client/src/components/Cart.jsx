import { useEffect, useState } from "react";
import { Button, Table, Modal, CloseButton } from "react-bootstrap";
import axiosClient from "../AxiosClient";
import { useStateContext } from "../context/ContextProvider";
import { ThreeDots } from  'react-loader-spinner'

export default function Cart({ handleCartClose }) {
  const [quantity, setQuantity] = useState(0);
  const { user } = useStateContext();
  const [CartProducts, setCartProdcuts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totSum,setTotsum] = useState(0);
  const [visible,setvisible] =useState(true);
  let totalSum =0


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
      <Modal show={show} onHide={handleCartClose}>
        <div className="cart-outer">
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
                                    value={quantities[product.id] || '0'} 
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
                  <b><input type="number" className="osi"value={totalSum} />$</b>
                </p>
              </div>
              <div className="Summary-cart">
                <p>fees</p>
                <p>
                  <b><input type="number" className="osi" />$</b>
                </p>
              </div>
              <div className="Summary-cart">
                <p>Discounts</p>
                <p>
                  <b><input type="number" className="osi" />$</b>
                </p>
              </div>
              
            </div>
            <div className="checkout-cart">
              <div className="Summary-cart">
                <p>Total</p>
                <p>
                  <b>1250$</b>
                </p>
              </div>
              <div className="checkout-btn-div">
                <Button variant="primary">Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
