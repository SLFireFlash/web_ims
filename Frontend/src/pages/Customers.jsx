import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Customers(){

    return(
        <div className="Customer-table">
        <Table striped responsive>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-primary" className='w-100'>Edit</Button></td>
            </tr>
        </tbody>
  </Table>

    </div>

    );
}