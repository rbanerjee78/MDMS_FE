import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";



export default function TenantDevices() {

     const [devices, setDevices] = useState([])
     const [itemsPerPage, setItemsPerPage] = useState(10);


    useEffect(() => {
        const fetchData = async () => {
          const authToken = localStorage.getItem('authToken');
          const headers = {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${authToken}`,
            'Accept': '*/*',
          };
          const response = await axios.get('https://localhost:1100/api/tenant/devices?pageSize=5&page=0', { headers });
          const data = response.data.data;
          setDevices(response.data.data)
          console.log(data); // do something with the data
        };
        fetchData();
      }, []); // The empty dependency array ensures that this effect runs only once, after the initial render.
    
      const [selectAll, setSelectAll] = useState(false);
      const handleSelectAll = () => {
        setSelectAll(!selectAll);
      };

  return (
    <div className='container my-3 '>
            <div className=" main-card py-3 px-3">
                <h5 className="fw-bold"><FontAwesomeIcon icon={faSearch} className='me-2' />Tenant Devices</h5>
                <div className='widget-card table-responsive shadow-lg' style={{"minHeight":"50vh"}}>

                <div className='d-flex'>

<FontAwesomeIcon icon={faSearch} size="1x" className='me-3 pt-2'></FontAwesomeIcon>
<div className='form-group me-3'>
  <input className='form-control form-control-sm'></input>
</div>
<Dropdown className='me-3' >

  <Dropdown.Toggle variant="light" size='sm' id="dropdown-basic"  >
    Group All
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>




{ /*right div*/}
<div className='d-flex ms-auto'>
  <Link className='btn btn-primary btn-sm me-3' ><FontAwesomeIcon icon={faPlus}/>Create New</Link>
  <Button variant='light' className='me-3' size='sm'><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></Button>
  <Dropdown className='me-3'>
    <Dropdown.Toggle variant="light" size='sm' id="dropdown-basic">
      Actions(5)
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <DropdownButton id="items-per-page-dropdown" size='sm' title={`Items per page: ${itemsPerPage}`} variant="light">
    <Dropdown.Item onClick={() => setItemsPerPage(5)}>5</Dropdown.Item>
    <Dropdown.Item onClick={() => setItemsPerPage(10)}>10</Dropdown.Item>
    <Dropdown.Item onClick={() => setItemsPerPage(20)}>20</Dropdown.Item>
    <Dropdown.Item onClick={() => setItemsPerPage(50)}>50</Dropdown.Item>
  </DropdownButton>


</div>
</div>



                <table className="table table-striped table-hover position-relative">
            <thead>
              <tr>
              <th> <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                /></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Crreated Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {devices.map((device) => (
          <tr key={device.id.id}>
            <td><input type="checkbox"
                    className='checkbox'
                    checked={selectAll}
                    onChange={() => { }} /></td>
            <td>{device.name}</td>
            <td>{device.additionalInfo.description}</td>
            <td>{new Date(device.createdTime).toLocaleString()}</td>
          </tr>
        ))}
                    </tbody>
                    </table>
                    </div></div></div>
  )
}
