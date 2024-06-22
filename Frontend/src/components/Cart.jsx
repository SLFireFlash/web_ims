import { useEffect, useState,useRef } from "react";
import { Button, Table, Modal, CloseButton } from "react-bootstrap";
import axiosClient from "../AxiosClient";
import { useStateContext } from "../context/ContextProvider";
import { ThreeDots } from  'react-loader-spinner'
import Swal from 'sweetalert2'
import { useReactToPrint } from 'react-to-print';
import ReactDOM from 'react-dom/client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  // const root = ReactDOM.createRoot(document.getElementById('root'));
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
   content: () => componentRef.current,
   documentTitle: 'Visitor Pass',
   onAfterPrint: () => console.log('Printed PDF successfully!'),
  })


  useEffect(()=>{
    setFulltot();
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
    // console.log(fees);
    // console.log(subtotal);
  }
  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };
  const cartClear = ()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Clear Cart"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.get('/clearcart')
        .then((Response)=>{
          if(Response.data.code == 201){
            Swal.fire({
              title: Response.data.message,
              icon: "success"
            });
            handleCartClose();
          }else{
            Swal.fire({
              title: 'something went wrong',
              icon: "success"
            });
          }
          console.log(Response.data);

        })
        .catch((err)=>{
          console.log(err);
          Swal.fire({
            title: 'something went wrong',
            icon: "success"
          });
        })
      }
    });

  }

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
        Swal.fire({
          title: "something went wrong while loading cart",
          icon: "warning"
        });
        console.log(err);
        handleCartClose();
      });
  }, []);

  const [show, setShow] = useState(true);

  let a = quantity;
  const add = () => {
    a++;
    setQuantity(a);
  };

  const exportPDF = () => {
    const input = document.getElementById('cart-outer');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
  
        // Get the dimensions of the canvas and the PDF
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
  
        // Calculate the aspect ratio of the image
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;
  
        // Calculate the position to center the image in the PDF
        const x = (pdfWidth - scaledWidth) / 2;
        const y = (pdfHeight - scaledHeight) / 2;
  
        // Add the image to the PDF with the calculated positions and scaled dimensions
        pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
        pdf.save('invoice.pdf');
      });
  };
  
  
  return (
    <>
      <Modal show={show} onHide={handleCartClose} >
        <div className="cart-outer"  id="cart-outer" ref={componentRef}>
          <div className="cart-left-side">
            <div className="cart-title-div">
              <h3>INVOICE</h3>
            </div>
            <div className="oder-items-cart">
              <Table hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="no-dis-mb">Vehicle</th>
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
                    const total = product.selling_price * product.O_quantity;
                    totalSum += total; 
                    
                    return (
                        <tr key={product.stock_id}>
                            <td>{product.product_name}</td>
                            <td  className="no-dis-mb">{product.vehicle_name}</td>
                            {/* <td>
                                <input 
                                    type="number" 
                                    max={product.quantity} 
                                    value={product.O_quantity} 
                                    onChange={(event) => handleQuantityChange(product.id, parseInt(event.target.value))} 
                                />
                            </td> */}
                            <td>{product.O_quantity}</td>
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
            <div className="Oder-Summary-info">
              <div className="Summary-cart">
                <p>Subtotal</p>
                <p>
                  <b >{totalSum}$</b>
                </p>
              </div>
              <div className="Summary-cart">
                <p>fees</p>
                <p>
                  <b><input type="number" className="osi" onChange={(ev)=>{setFees(ev.target.value)}} />$</b>
                </p>
              </div>
              <div className="Summary-cart">
                <p>disc.</p>
                <p>
                  <b><input type="number" className="osi"onChange={(ev)=>{setDiscounts(ev.target.value)}} />$</b>
                </p>
              </div>
              
            </div>
            <div className="checkout-cart">
              <div className="Summary-cart">
                <p>Total</p>
                <p>
                  <b>{fees === 0 && discounts === 0 ? totalSum : fulltot}$</b>
                  
                </p>
                
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-btn-div">
                <Button variant="secondary" onClick={handleCartClose}>Close Cart</Button>
                <Button variant="warning" onClick={cartClear}>Clear All</Button>
                <Button variant="primary" onClick={exportPDF}>Checkout</Button>
        </div>
      </Modal>
    </>
  );
}
