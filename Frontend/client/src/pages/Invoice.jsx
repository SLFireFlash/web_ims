import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axiosClient from '../AxiosClient';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import DropDown from '../components/DropDown';






export default function Invoice(){
    const [ProductName,setProductNmae] =useState();
    const [VehicleName,setVehicleName]=useState();
    const [Brand,setBrand]=useState();

    const [products, setProducts] = useState([]);
    const [allproducts,setAllproducts]=useState(1);
    const [perPage,serPerPage] =useState(1);
    const [page,setPage] = useState(1) ; 

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
    const sportsData = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];
    const abc = '<Dropdown.Item as="button">{childern}</Dropdown.Item>'
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
            <DropDown>{abc}</DropDown>
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
                        <td>{product.product_brand}</td>
                        <td>{product.Quantity}</td>
                        <td>{product.buying_price}</td>
                        <td>{product.selling_price}</td>
                        <td><Button type='button' variant="outline-primary" o className='w-100 btn-sm'>add</Button></td>
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
        </div>

    );
}