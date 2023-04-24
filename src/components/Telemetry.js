import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";



export default function Telemetry() {

    const [devices, setDevices] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const [selectAll, setSelectAll] = useState(false);
    const handleSelectAll = () => {
      setSelectAll(!selectAll);
    };

  return (
    <div className='container my-3 '>
            <div className=" main-card py-3 px-3">
                <h5 className="fw-bold"><FontAwesomeIcon icon={faSearch} className='me-2' />Telemetry Data</h5>
                <div className='widget-card table-responsive shadow-lg' style={{"minHeight":"50vh"}}>

              

<div className='d-flex mb-3'>

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

<div className="table-responsive">
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
                    <th>Created Time</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                    </table>
                    </div>
                </div>

                </div>

                </div>
            
  )
}
