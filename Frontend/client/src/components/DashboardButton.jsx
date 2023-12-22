import { useEffect, useState } from "react"

export default function DashboardButton (allproducts){
    const [Products,setProductNames] = useState([]);

    
    useEffect(()=>{
        setProductNames(allproducts);
    },[allproducts]);
    return(
        <>  

            <div className="dashboardButton">
                <div className="top-sales">
                    <p>Total completed orders and earnings</p>
                </div>
                <div className="graph ms-2">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Sales</th>
                                <th scope="col">Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr scope="row">
                                <td>prodcut 01</td>
                                <td>120</td>
                                <td>340</td>
                            </tr>
                            <tr scope="row">
                                <td>prodcut 01</td>
                                <td>120</td>
                                <td>340</td>
                            </tr>
                            <tr scope="row">
                                <td>prodcut 01</td>
                                <td>120</td>
                                <td>340</td>
                            </tr>
                            <tr scope="row">
                                <td>prodcut 01</td>
                                <td>120</td>
                                <td>340</td>
                            </tr>
                            {/* {Products.map((product) => (
                                <tr key={product.id}>
                                <td>{product.product_name}</td>
                                <td>{product.Quantity}</td>
                                <td>{product.selling_price}</td>
                                <td><Button type='button' variant="outline-warning" onClick={() => loadProductData(product)}  className='w-100'>Edit</Button></td>
                                <td><Button variant="outline-danger" onClick={() => RemoveProduct(product)}  className='w-100'>Remove</Button></td>
                                </tr>
                            ))}                   */}
                        </tbody>

                    </table>
                </div>

                {/* <p>Total completed orders and earnings</p>
                    <div className="graph-info-sub-head">
                        <div className="graph-info-sub">
                            <p>completed orders</p><br />
                            <h4>175</h4>
                        </div>
                        <div className="graph-info-sub">
                            <p>Total Earnings</p><br />
                            <h4>1600$</h4>
                        </div>
                    </div> */}

            </div>
                {/* <div>
                    <div className="main-btn">button</div>
                    <div className="main-btn">button</div>
                    <div className="main-btn">button</div>
                </div>
                <div>
                    <div className="main-btn">button</div>
                    <div className="main-btn">button</div>
                    <div className="main-btn">button</div>
                </div>
                {/* <button type="button"> button 01</button>
                <button type="button"> button 02</button>
                <button type="button"> button 03</button>
                <button type="button"> button 04</button>
                <button type="button"> button 05</button>
                <button type="button"> button 06</button> */}
        </>
    )
}