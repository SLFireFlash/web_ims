import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import axiosClient from '../AxiosClient';





export default function Products(){
    useEffect(()=>{
        axiosClient.get('/allproducts')
        .then((data)=>{
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
        })
    })

    return(
        <div className="product-table">
            <Table striped responsive>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>buy Price</th>
                    <th>Sell Price</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                    <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                    <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                    <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                    <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                    <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                    <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                    <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                    <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                    <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                    <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                    <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                    <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
                </tr>
            </tbody>
      </Table>

        </div>


    );
}