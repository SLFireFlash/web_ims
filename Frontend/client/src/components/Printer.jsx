import React, { useRef,useEffect,useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button, Table, CloseButton } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../AxiosClient";
import ReactDOM from 'react-dom/client';

export default function Printer(){
    const{user} = useStateContext();
    const componentRef = useRef();
    const [CartProducts, setCartProdcuts] = useState([]);
    const [quantities, setQuantities] = useState({});
    let totalSum =0
    

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Visitor Pass',
        onAfterPrint: () => console.log('Printed PDF successfully!'),
    })
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

        const handleQuantityChange = (productId, quantity) => {
            setQuantities({ ...quantities, [productId]: quantity });
          };

    return(
        <>
        <div className="invoice-wrapper">
            <div className="invoice-navbar">
                <div className="inhead">
                    <div className="invoice-titile">INVOICE</div>
                    <div className="invoice-time-date">
                        Invoice Date: 2024-3-5<br />
                        Invoice Time: 10:14 AM
                    </div>
                </div>
                <div className="outhead">
                    <div className="address">
                        Lahiru Prasanna<br />
                        No 49,<br />
                        Mawalgama,<br />
                        Waga.<br />
                    </div>
                    <div className="billto">
                        Customer Name<br />
                        No 10,<br />
                        Hanwella,<br />
                        Waga.<br />
                    </div>
                </div>
            </div>
            <div className="invoice-data">
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
            <div className="invoice-footer">
                <div className="tt">
                    <div>

                    </div>
                    <div> 
                    </div>
                    <div>
                        
                        
                        <p>SubTotal</p>
                        <p>fees</p>
                        <p>Discounts</p>
                        <h4>Total</h4>
                    </div>
                    <div className='invoice-prices'>
                        <p>560.00</p>
                        <p>56120.00</p>
                        <p>56120.00</p>
                        <h4>56120.00</h4>
                    </div>

                </div>
                <div className="invoice-end">
                    <h3>Thank You</h3>
                    <p>Powered By TeamHiru</p>
                </div>
            </div>

        </div>
        </>  
    )
}