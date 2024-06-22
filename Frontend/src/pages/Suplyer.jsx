import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Suplyer(){

    return(
        <div className="suplyer-table">
        <Table striped responsive>
            <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Update</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                
                <td>Mark</td>
                <td>Otto</td>
                <td><Button variant="outline-warning" className='w-100'>Update</Button></td>
            </tr>
        </tbody>
  </Table>

    </div>

    );
}