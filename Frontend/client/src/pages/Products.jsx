import { useEffect,useState} from 'react';
import axiosClient from '../AxiosClient';
import { Table, Button, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';





export default function Products(){

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

    const EditProduct = (id,type)=>{

        if(type == 'Update'){
            const payload ={
                id: id
            }
            axiosClient.post('/updateProduct',payload)
            .then(({data})=>{
                console.log(data);
            })
        }else{
            const payload ={
                id: id
            }
            axiosClient.post('/removeProduct',payload)
            .then(({data})=>{
                console.log(data);
            })

        }
    }

    

    return(
        <div className="product-table">
            <Table striped responsive>
                <thead>
                <tr>
                    <th>No</th>
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
                    <td><Button type='button' variant="outline-warning" onClick={() => EditProduct(product.id,'Update')}  className='w-100'>Update</Button></td>
                    <td><Button variant="outline-danger" onClick={() => EditProduct(product.id,'Remove')}  className='w-100'>Remove</Button></td>
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



        </div>


    );
}