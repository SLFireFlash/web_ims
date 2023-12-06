import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Customers(){

    return(
        <div className="Customer-table">
        <Table striped responsive>
            <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Phone Number</th>
                <th>Location</th>
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
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>@fat</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
                <td><Button variant="outline-danger " className='w-100'>Remove</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
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